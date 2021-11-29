import { saveDataManager } from "../features/saveDataManager/exports";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import {
  postLaserInitLateFire,
  postLaserInitLateHasSubscriptions,
} from "./subscriptions/postLaserInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null as int | null,
    currentRoomVisitedCount: null as int | null,
  },
};

export function postLaserInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postLaserInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_LASER_UPDATE, postLaserUpdate); // 35
}

function hasSubscriptions() {
  return postLaserInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_LASER_UPDATE (48)
function postLaserUpdate(laser: EntityLaser) {
  if (!hasSubscriptions()) {
    return;
  }

  const roomIndex = getRoomIndex();
  const roomVisitedCount = getRoomVisitedCount();
  if (
    roomIndex !== v.run.currentRoomIndex ||
    roomVisitedCount !== v.run.currentRoomVisitedCount
  ) {
    v.run.currentRoomIndex = roomIndex;
    v.run.currentRoomVisitedCount = roomVisitedCount;
    v.run.firedSet.clear();
  }

  const index = GetPtrHash(laser);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postLaserInitLateFire(laser);
  }
}
