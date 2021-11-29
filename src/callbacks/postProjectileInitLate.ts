import { saveDataManager } from "../features/saveDataManager/exports";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import {
  postProjectileInitLateFire,
  postProjectileInitLateHasSubscriptions,
} from "./subscriptions/postProjectileInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null as int | null,
    currentRoomVisitedCount: null as int | null,
  },
};

export function postProjectileInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postProjectileInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PROJECTILE_UPDATE, postProjectileUpdate); // 44
}

function hasSubscriptions() {
  return postProjectileInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_PROJECTILE_UPDATE (44)
function postProjectileUpdate(projectile: EntityProjectile) {
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

  const index = GetPtrHash(projectile);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postProjectileInitLateFire(projectile);
  }
}
