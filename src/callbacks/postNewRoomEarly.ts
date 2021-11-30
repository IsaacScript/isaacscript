import {
  getTopLeftWallGridIndex,
  spawnGridEntity,
} from "../functions/gridEntity";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postNewRoomEarlyFire,
  postNewRoomEarlyHasSubscriptions,
} from "./subscriptions/postNewRoomEarly";

let currentRoomTopLeftWallPtrHash: PtrHash | null = null;

export function postNewRoomEarlyCallbackInit(mod: ModUpgraded): void {
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
  const game = Game();
  const room = game.GetRoom();
  const topLeftWallGridIndex = getTopLeftWallGridIndex();
  let topLeftWall = room.GetGridEntity(topLeftWallGridIndex);

  // Sometimes, the PreEntitySpawn callback can fire before any grid entities in the room have
  // spawned, which means that the top-left wall will not exist
  // If ths is the case, then simply spawn the top-left wall early
  if (topLeftWall === undefined) {
    topLeftWall = spawnGridEntity(
      GridEntityType.GRID_WALL,
      topLeftWallGridIndex,
    );
  }

  const topLeftWallPtrHash = GetPtrHash(topLeftWall);
  if (topLeftWallPtrHash !== currentRoomTopLeftWallPtrHash) {
    currentRoomTopLeftWallPtrHash = topLeftWallPtrHash;
    postNewRoomEarlyFire();
  }
}
