import {
  EntityType,
  GridEntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import {
  getTopLeftWallGridIndex,
  spawnGridEntity,
} from "../functions/gridEntities";
import { logError } from "../functions/log";
import {
  postNewRoomEarlyFire,
  postNewRoomEarlyHasSubscriptions,
} from "./subscriptions/postNewRoomEarly";

let currentRoomTopLeftWallPtrHash: PtrHash | null = null;

/**
 * The wall entity directly to the right of the top-left wall. We use this as a test to see if it
 * improves the consistency of the callback firing.
 */
let currentRoomTopLeftWallPtrHash2: PtrHash | null = null;

export function postNewRoomEarlyCallbackInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_ROOM, postNewRoom); // 19
  mod.AddCallback(ModCallback.PRE_ENTITY_SPAWN, preEntitySpawn); // 24
}

function hasSubscriptions() {
  return postNewRoomEarlyHasSubscriptions();
}

// ModCallback.POST_NEW_ROOM (19)
function postNewRoom() {
  if (!hasSubscriptions()) {
    return;
  }

  checkRoomChanged();
}

// ModCallback.PRE_ENTITY_SPAWN (24)
function preEntitySpawn(): [EntityType, int, int, int] | undefined {
  if (!hasSubscriptions()) {
    return undefined;
  }

  checkRoomChanged();

  return undefined;
}

function checkRoomChanged() {
  const room = game.GetRoom();
  const topLeftWallGridIndex = getTopLeftWallGridIndex();
  const rightOfTopWallGridIndex = topLeftWallGridIndex + 1;

  let topLeftWall = room.GetGridEntity(topLeftWallGridIndex);
  let topLeftWall2 = room.GetGridEntity(rightOfTopWallGridIndex);

  // Sometimes, the PreEntitySpawn callback can fire before any grid entities in the room have
  // spawned, which means that the top-left wall will not exist. If ths is the case, then simply
  // spawn the top-left wall early.
  if (topLeftWall === undefined) {
    topLeftWall = spawnGridEntity(GridEntityType.WALL, topLeftWallGridIndex);
    if (topLeftWall === undefined) {
      logError(
        "Failed to spawn a new wall (1) for the POST_NEW_ROOM_EARLY callback.",
      );
      return;
    }
  }

  // For some reason, the above check will rarely fail. We duplicate the check with another wall
  // segment to go from 99% to 100% reliability.
  if (topLeftWall2 === undefined) {
    topLeftWall2 = spawnGridEntity(
      GridEntityType.WALL,
      rightOfTopWallGridIndex,
    );
    if (topLeftWall2 === undefined) {
      logError(
        "Failed to spawn a new wall (2) for the POST_NEW_ROOM_EARLY callback.",
      );
      return;
    }
  }

  const topLeftWallPtrHash = GetPtrHash(topLeftWall);
  const topLeftWallPtrHash2 = GetPtrHash(topLeftWall2);
  if (
    topLeftWallPtrHash !== currentRoomTopLeftWallPtrHash ||
    topLeftWallPtrHash2 !== currentRoomTopLeftWallPtrHash2
  ) {
    currentRoomTopLeftWallPtrHash = topLeftWallPtrHash;
    currentRoomTopLeftWallPtrHash2 = topLeftWallPtrHash2;

    postNewRoomEarlyFire();
  }
}
