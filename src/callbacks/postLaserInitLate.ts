import { saveDataManager } from "../features/saveDataManager/exports";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postLaserInitLateFire,
  postLaserInitLateHasSubscriptions,
} from "./subscriptions/postLaserInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postLaserInitLateCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postLaserInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_LASER_UPDATE, postLaserUpdate); // 35
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
}

function hasSubscriptions() {
  return postLaserInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_LASER_UPDATE (48)
function postLaserUpdate(laser: EntityLaser) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(laser);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postLaserInitLateFire(laser);
  }
}

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.firedSet.clear();
}
