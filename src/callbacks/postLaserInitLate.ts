import { saveDataManager } from "../features/saveDataManager/main";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import * as postLaserInitLate from "./subscriptions/postLaserInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null,
    currentRoomVisitedCount: null,
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

  const roomIndex = getRoomIndex();
  const visitedCount = getRoomVisitedCount();
  if (
    roomIndex !== v.run.currentRoomIndex ||
    visitedCount !== v.run.currentRoomVisitedCount
  ) {
    v.run.firedSet.clear();
  }

  const index = GetPtrHash(laser);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postLaserInitLate.fire(laser);
  }
}
