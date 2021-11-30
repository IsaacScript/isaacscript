import { getTopLeftWall } from "..";
import { saveDataManager } from "../features/saveDataManager/exports";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postNewRoomEarlyFire,
  postNewRoomEarlyHasSubscriptions,
} from "./subscriptions/postNewRoomEarly";

const v = {
  run: {
    topLeftWallPtrHash: null as PtrHash | null,
  },
};

export function postNewRoomEarlyCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postNewRoomEarlyCallback", v, hasSubscriptions);

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
  const topLeftWall = getTopLeftWall();
  const topLeftWallPtrHash =
    topLeftWall === undefined ? null : GetPtrHash(topLeftWall);
  if (topLeftWallPtrHash !== v.run.topLeftWallPtrHash) {
    v.run.topLeftWallPtrHash = topLeftWallPtrHash;
    postNewRoomEarlyFire();
  }
}
