import { saveDataManager } from "../features/saveDataManager/main";
import * as postLaserInitLate from "./subscriptions/postLaserInitLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
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
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postLaserInitLate.fire(laser);
  }
}
