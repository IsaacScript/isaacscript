import {
  EntityType,
  ModCallback,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../../../core/cachedClasses";
import { Exported } from "../../../decorators";
import { ISCFeature } from "../../../enums/ISCFeature";
import { getEntityID } from "../../../functions/entities";
import { getRoomListIndex } from "../../../functions/roomData";
import { onAscent } from "../../../functions/stage";
import { vectorEquals } from "../../../functions/vector";
import { PickupIndex } from "../../../types/PickupIndex";
import { DefaultMap } from "../../DefaultMap";
import { Feature } from "../../private/Feature";
import { RoomHistory } from "./RoomHistory";
import { SaveDataManager } from "./SaveDataManager";

interface PickupDescription {
  position: Vector;
  initSeed: Seed;
}

export class PickupIndexCreation extends Feature {
  /** @internal */
  public override v = {
    run: {
      /** Is incremented before assignment. Thus, the first pickup will have an index of 1. */
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

  private roomHistory: RoomHistory;
  private saveDataManager: SaveDataManager;

  /** @internal */
  constructor(roomHistory: RoomHistory, saveDataManager: SaveDataManager) {
    super();

    this.featuresUsed = [ISCFeature.ROOM_HISTORY, ISCFeature.SAVE_DATA_MANAGER];

    this.callbacksUsed = [
      // 34
      [ModCallback.POST_PICKUP_INIT, this.postPickupInit],

      // 67
      [
        ModCallback.POST_ENTITY_REMOVE,
        this.postEntityRemovePickup,
        [EntityType.PICKUP],
      ],
    ];

    this.roomHistory = roomHistory;
    this.saveDataManager = saveDataManager;
  }

  // ModCallback.POST_PICKUP_INIT (34)
  private postPickupInit = (pickup: EntityPickup) => {
    this.setPickupIndex(pickup);
  };

  private setPickupIndex(pickup: EntityPickup): void {
    const ptrHash = GetPtrHash(pickup);

    // In certain situations, pickups can be morphed, which will trigger the `POST_PICKUP_INIT`
    // callback but should not incur a new pickup counter. (For example, the collectible rotation
    // with Tainted Isaac.) For these situations, we will already be tracking an index for this
    // pointer hash.
    if (this.v.room.pickupIndexes.has(ptrHash)) {
      return;
    }

    // First, handle the special case of re-entering a room with a previously tracked pickup. If we
    // find a match in the level pickup data, we will use the pickup index from the match.
    const pickupIndexFromLevelData =
      this.getPickupIndexFromPreviousData(pickup);
    const room = game.GetRoom();
    const isFirstVisit = room.IsFirstVisit();
    const roomFrameCount = room.GetFrameCount();
    if (
      pickupIndexFromLevelData !== undefined &&
      !isFirstVisit &&
      roomFrameCount <= 0
    ) {
      this.v.room.pickupIndexes.set(ptrHash, pickupIndexFromLevelData);
      return;
    }

    // This is a brand new pickup that we have not previously seen on this run.
    this.v.run.pickupCounter++;
    this.v.room.pickupIndexes.set(ptrHash, this.v.run.pickupCounter);
  }

  private getPickupIndexFromPreviousData(
    pickup: EntityPickup,
  ): PickupIndex | undefined {
    const roomListIndex = getRoomListIndex();
    const pickupDescriptions =
      this.v.level.pickupData.getAndSetDefault(roomListIndex);

    let pickupIndex = getStoredPickupIndex(pickup, pickupDescriptions);
    if (pickupIndex === undefined) {
      pickupIndex = this.getPostAscentPickupIndex(pickup);
    }

    return pickupIndex;
  }

  // ModCallback.POST_ENTITY_REMOVE (67)
  // EntityType.PICKUP (5)
  private postEntityRemovePickup = (entity: Entity) => {
    this.checkDespawningFromPlayerLeavingRoom(entity);
  };

  private checkDespawningFromPlayerLeavingRoom(entity: Entity) {
    const ptrHash = GetPtrHash(entity);
    const pickupIndex = this.v.room.pickupIndexes.get(ptrHash);
    if (pickupIndex === undefined) {
      return;
    }

    if (!this.roomHistory.isLeavingRoom()) {
      return;
    }

    this.trackDespawningPickupMetadata(entity, pickupIndex);
  }

  /**
   * This is a pickup that is despawning because the player is in the process of leaving the room.
   * Keep track of the metadata for later.
   */
  private trackDespawningPickupMetadata(
    entity: Entity,
    pickupIndex: PickupIndex,
  ) {
    // The "latest" room description is really the previous room, because the `POST_NEW_ROOM`
    // callback has not fired yet.
    const previousRoomDescription = this.roomHistory.getLatestRoomDescription();
    if (previousRoomDescription === undefined) {
      return;
    }

    const previousRoomListIndex = previousRoomDescription.roomListIndex;
    const pickupDescriptions = this.v.level.pickupData.getAndSetDefault(
      previousRoomListIndex,
    );

    const pickupDescription: PickupDescription = {
      position: entity.Position,
      initSeed: entity.InitSeed,
    };
    pickupDescriptions.set(pickupIndex, pickupDescription);

    const pickupDataMapForCurrentRoom = this.getPickupDataMapForCurrentRoom();
    if (pickupDataMapForCurrentRoom !== undefined) {
      pickupDataMapForCurrentRoom.set(pickupIndex, pickupDescription);
    }

    // Since the `POST_ENTITY_REMOVE` callback fires after the `PRE_GAME_EXIT` callback, we need to
    // explicitly save data again if the player is in the process of saving and quitting the run.
    if (this.saveDataManager.saveDataManagerInMenu()) {
      this.saveDataManager.saveDataManagerSave();
    }
  }

  /**
   * If the despawning pickup was in a Treasure Room or Boss Room, then it is possible that the
   * pickup could re-appear during The Ascent. If this is the case, we store the metadata on a
   * separate map to reference later.
   */
  private getPickupDataMapForCurrentRoom():
    | Map<PickupIndex, PickupDescription>
    | undefined {
    if (onAscent()) {
      return undefined;
    }

    const room = game.GetRoom();
    const roomType = room.GetType();

    switch (roomType) {
      case RoomType.TREASURE: {
        return this.v.run.pickupDataTreasureRooms;
      }

      case RoomType.BOSS: {
        return this.v.run.pickupDataBossRooms;
      }

      default: {
        return undefined;
      }
    }
  }

  private getPostAscentPickupIndex(
    pickup: EntityPickup,
  ): PickupIndex | undefined {
    // If we have not found the pickup index yet, we might be re-entering a post-Ascent Treasure
    // Room or Boss Room.
    if (!onAscent()) {
      return undefined;
    }

    const room = game.GetRoom();
    const roomType = room.GetType();

    switch (roomType) {
      case RoomType.TREASURE: {
        return getStoredPickupIndex(pickup, this.v.run.pickupDataTreasureRooms);
      }

      case RoomType.BOSS: {
        return getStoredPickupIndex(pickup, this.v.run.pickupDataBossRooms);
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
   *
   * In order to use this function, you must upgrade your mod with
   * `ISCFeature.PICKUP_INDEX_CREATION`.
   */
  @Exported
  public getPickupIndex(pickup: EntityPickup): PickupIndex {
    const ptrHash = GetPtrHash(pickup);
    const pickupIndexInitial = this.v.room.pickupIndexes.get(ptrHash);
    if (pickupIndexInitial !== undefined) {
      return pickupIndexInitial;
    }

    this.setPickupIndex(pickup);
    const pickupIndex = this.v.room.pickupIndexes.get(ptrHash);
    if (pickupIndex !== undefined) {
      return pickupIndex;
    }

    const entityID = getEntityID(pickup);
    error(`Failed to generate a new pickup index for pickup: ${entityID}`);
  }
}

function getStoredPickupIndex(
  pickup: Entity,
  pickupDescriptions: Map<PickupIndex, PickupDescription>,
): PickupIndex | undefined {
  for (const [pickupIndex, pickupDescription] of pickupDescriptions) {
    if (
      vectorEquals(pickupDescription.position, pickup.Position) &&
      pickupDescription.initSeed === pickup.InitSeed
    ) {
      return pickupIndex;
    }
  }

  return undefined;
}
