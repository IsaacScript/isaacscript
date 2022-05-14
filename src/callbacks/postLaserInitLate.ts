import { ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postLaserInitLateFire,
  postLaserInitLateHasSubscriptions,
} from "./subscriptions/postLaserInitLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

/** @internal */
export function postLaserInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postLaserInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_LASER_UPDATE, postLaserUpdate); // 35
}

function hasSubscriptions() {
  return postLaserInitLateHasSubscriptions();
}

// ModCallback.POST_LASER_UPDATE (48)
function postLaserUpdate(laser: EntityLaser) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(laser);
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postLaserInitLateFire(laser);
  }
}
