import {
  EntityType,
  ModCallback,
  RoomType,
} from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { ModUpgraded } from "../classes/ModUpgraded";
import { game } from "../core/cachedClasses";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { errorIfFeaturesNotInitialized } from "../featuresInitialized";
import { getEntityID } from "../functions/entities";
import { getPickups } from "../functions/entitiesSpecific";
import { getRoomListIndex } from "../functions/roomData";
import { onAscent } from "../functions/stage";
import { vectorEquals } from "../functions/vector";
import { PickupIndex } from "../types/PickupIndex";
import { getLatestRoomDescription, isLeavingRoom } from "./roomHistory";
import { saveDataManager } from "./saveDataManager/exports";

interface PickupDescription {
  position: Vector;
  initSeed: Seed;
}

const FEATURE_NAME = "pickupIndex";

const v = {
  run: {
    pickupCounter: 0 as PickupIndex,

    pickupDataTreasureRooms: new Map<PickupIndex, PickupDescription>(),
    pickupDataBossRooms: new Map<PickupIndex, PickupDescription>(),
  },

  level: {
    /** Indexed by room list index. */
    pickupData: new DefaultMap<int, Map<PickupIndex, PickupDescription>>(
      () => new Map(),
    ),
  },

  room: {
    pickupIndexes: new Map<PtrHash, PickupIndex>(),
  },
};

export function pickupIndexInit(mod: ModUpgraded): void {
  saveDataManager(FEATURE_NAME, v);

  mod.AddCallback(ModCallback.POST_PICKUP_INIT, postPickupInit); // 34
  mod.AddCallback(
    ModCallback.POST_ENTITY_REMOVE,
    postEntityRemovePickup,
    EntityType.PICKUP,
  ); // 67
  mod.AddCallbackCustom(
    ModCallbackCustom.POST_NEW_ROOM_REORDERED,
    postNewRoomReordered,
  );
}

// ModCallback.POST_PICKUP_INIT (34)
function postPickupInit(pickup: EntityPickup) {
  const ptrHash = GetPtrHash(pickup);

  // In certain situations, pickups can be morphed, and this should not incur a new pickup counter.
  // (For example, the collectible rotation with Tainted Isaac.)
  if (v.room.pickupIndexes.has(ptrHash)) {
    return;
  }

  // If we are re-entering a room that previously had a pickup, then we don't need to make a new
  // index, because we will re-use the existing one.
  const room = game.GetRoom();
  const isFirstVisit = room.IsFirstVisit();
  const roomFrameCount = room.GetFrameCount();
  if (!isFirstVisit && roomFrameCount <= 0) {
    return;
  }

  v.run.pickupCounter++;
  v.room.pickupIndexes.set(ptrHash, v.run.pickupCounter);
}

// ModCallback.POST_ENTITY_REMOVE (67)
// EntityType.PICKUP (5)
function postEntityRemovePickup(entity: Entity) {
  checkDespawningFromPlayerLeavingRoom(entity);
}

function checkDespawningFromPlayerLeavingRoom(entity: Entity) {
  const ptrHash = GetPtrHash(entity);
  const pickupIndex = v.room.pickupIndexes.get(ptrHash);
  if (pickupIndex === undefined) {
    return;
  }

  if (!isLeavingRoom()) {
    return;
  }

  trackDespawningPickupMetadata(entity, pickupIndex);
}

/**
 * This is a pickup that is despawning because the player is in the process of leaving the room.
 * Keep track of the metadata for later.
 */
function trackDespawningPickupMetadata(
  entity: Entity,
  pickupIndex: PickupIndex,
) {
  // The "latest" room description is really the previous room, because the `POST_NEW_ROOM` callback
  // was not fired yet.
  const previousRoomDescription = getLatestRoomDescription();
  const previousRoomListIndex = previousRoomDescription.roomListIndex;
  const pickupDescriptions = v.level.pickupData.getAndSetDefault(
    previousRoomListIndex,
  );

  const pickupDescription: PickupDescription = {
    position: entity.Position,
    initSeed: entity.InitSeed,
  };
  pickupDescriptions.set(pickupIndex, pickupDescription);

  // If the despawning pickup was in a Treasure Room or Boss Room, then it is possible that the
  // pickup could re-appear during The Ascent. If this is the case, we store the metadata on a
  // separate map to reference later.
  if (onAscent()) {
    return;
  }

  const room = game.GetRoom();
  const roomType = room.GetType();

  switch (roomType) {
    case RoomType.TREASURE: {
      v.run.pickupDataTreasureRooms.set(pickupIndex, pickupDescription);
      break;
    }

    case RoomType.BOSS: {
      v.run.pickupDataBossRooms.set(pickupIndex, pickupDescription);
      break;
    }

    default: {
      break;
    }
  }
}

// ModCallbackCustom.POST_NEW_ROOM_REORDERED
function postNewRoomReordered() {
  const room = game.GetRoom();
  const isFirstVisit = room.IsFirstVisit();

  if (isFirstVisit) {
    return;
  }

  const roomListIndex = getRoomListIndex();
  const pickupDescriptions = v.level.pickupData.getAndSetDefault(roomListIndex);

  for (const pickup of getPickups()) {
    let pickupIndex = getStoredPickupIndex(pickup, pickupDescriptions);
    if (pickupIndex === undefined) {
      pickupIndex = getPostAscentPickupIndex(pickup);
    }

    if (pickupIndex === undefined) {
      // At this point, if we do not already have an existing pickup index, we need to create a new
      // one in order to cover the cases where mods spawn items in the `POST_NEW_ROOM` callback.
      v.run.pickupCounter++;
      pickupIndex = v.run.pickupCounter;
    }

    const ptrHash = GetPtrHash(pickup);
    v.room.pickupIndexes.set(ptrHash, pickupIndex);
  }
}

function getStoredPickupIndex(
  pickup: Entity,
  pickupDescriptions: Map<PickupIndex, PickupDescription>,
): PickupIndex | undefined {
  for (const [pickupIndex, pickupDescription] of pickupDescriptions.entries()) {
    if (
      vectorEquals(pickupDescription.position, pickup.Position) &&
      pickupDescription.initSeed === pickup.InitSeed
    ) {
      return pickupIndex;
    }
  }

  return undefined;
}

function getPostAscentPickupIndex(pickup: EntityPickup) {
  // If we have not found the pickup index yet, we might be re-entering a post-Ascent Treasure Room
  // or Boss Room.
  if (!onAscent()) {
    return undefined;
  }

  const room = game.GetRoom();
  const roomType = room.GetType();

  switch (roomType) {
    case RoomType.TREASURE: {
      return getStoredPickupIndex(pickup, v.run.pickupDataTreasureRooms);
    }

    case RoomType.BOSS: {
      return getStoredPickupIndex(pickup, v.run.pickupDataBossRooms);
    }

    default: {
      return undefined;
    }
  }
}

/**
 * Mods often have to track variables relating to a pickups. Finding an index for these kinds of
 * data structures is difficult, since pickups are respawned every time a player re-enters a room,
 * so the `PtrHash` will change.
 *
 * Use this function to get a unique index for a pickup to use in these data structures.
 *
 * Specifically, `PickupIndex` is a number that represents the spawn order of the pickup on the
 * current run. For example, the first pickup spawned will have an index of 1, the second one will
 * have an index of 2, and so on.
 *
 * Tracking pickups requires stateful tracking, so using pickup indexes requires an upgraded mod.
 */
export function getPickupIndex(pickup: EntityPickup): PickupIndex {
  errorIfFeaturesNotInitialized(FEATURE_NAME);

  const ptrHash = GetPtrHash(pickup);
  const pickupIndex = v.room.pickupIndexes.get(ptrHash);
  if (pickupIndex === undefined) {
    const entityID = getEntityID(pickup);
    error(
      `Failed to get a pickup index for entity ${entityID} with hash: ${ptrHash}`,
    );
  }

  return pickupIndex;
}
