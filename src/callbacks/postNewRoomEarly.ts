import { game } from "../cachedClasses";
import {
  getTopLeftWallGridIndex,
  spawnGridEntity,
} from "../functions/gridEntity";
import { log } from "../functions/log";
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

/** @internal */
export function postNewRoomEarlyCallbackInit(mod: Mod): void {
  mod.AddCallback(ModCallbacks.MC_POST_NEW_ROOM, postNewRoom); // 19
  mod.AddCallback(ModCallbacks.MC_PRE_ENTITY_SPAWN, preEntitySpawn); // 24
}

function hasSubscriptions() {
  return postNewRoomEarlyHasSubscriptions();
}

// ModCallbacks.MC_POST_NEW_ROOM (19)
function postNewRoom() {
  if (!hasSubscriptions()) {
    return;
  }

  checkRoomChanged();
}

// ModCallbacks.MC_PRE_ENTITY_SPAWN (24)
function preEntitySpawn() {
  if (!hasSubscriptions()) {
    return;
  }

  checkRoomChanged();
}

function checkRoomChanged() {
  const room = game.GetRoom();
  const topLeftWallGridIndex = getTopLeftWallGridIndex();
  const rightOfTopWallGridIndex = topLeftWallGridIndex + 1;

  let topLeftWall = room.GetGridEntity(topLeftWallGridIndex);
  let topLeftWall2 = room.GetGridEntity(rightOfTopWallGridIndex);

  // Sometimes, the PreEntitySpawn callback can fire before any grid entities in the room have
  // spawned, which means that the top-left wall will not exist
  // If ths is the case, then simply spawn the top-left wall early
  if (topLeftWall === undefined) {
    topLeftWall = spawnGridEntity(
      GridEntityType.GRID_WALL,
      topLeftWallGridIndex,
    );
    if (topLeftWall === undefined) {
      log(
        "Error: Failed to spawn a new wall (1) for the PostNewRoomEarly callback.",
      );
      return;
    }
    log("Spawned a new wall (1) for the PostNewRoomEarly callback.");
  }

  // Duplicated code
  if (topLeftWall2 === undefined) {
    topLeftWall2 = spawnGridEntity(
      GridEntityType.GRID_WALL,
      rightOfTopWallGridIndex,
    );
    if (topLeftWall2 === undefined) {
      log(
        "Error: Failed to spawn a new wall (2) for the PostNewRoomEarly callback.",
      );
      return;
    }
    log("Spawned a new wall (2) for the PostNewRoomEarly callback.");
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
