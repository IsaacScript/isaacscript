import { saveDataManager } from "../features/saveDataManager/main";
import * as postLaserInitLate from "./subscriptions/postLaserInitLate";

const v = {
  room: {
    firedMap: new Map<PtrHash, boolean>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postLaserInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_LASER_UPDATE, postLaserUpdate); // 35
}

function hasSubscriptions() {
  return postLaserInitLate.hasSubscriptions();
}

// ModCallbacks.MC_POST_LASER_UPDATE (48)
function postLaserUpdate(laser: EntityLaser) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(laser);
  const fired = v.room.firedMap.get(index);
  if (fired === undefined) {
    v.room.firedMap.set(index, true);
    postLaserInitLate.fire(laser);
  }
}
