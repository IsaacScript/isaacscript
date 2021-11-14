import { saveDataManager } from "../features/saveDataManager/main";
import { getRoomIndex, getRoomVisitedCount } from "../functions/rooms";
import * as postProjectileInitLate from "./subscriptions/postProjectileInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
    currentRoomIndex: null as int | null,
    currentRoomVisitedCount: null as int | null,
  },
};

export function init(mod: Mod): void {
  saveDataManager("postProjectileInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PROJECTILE_UPDATE, postProjectileUpdate); // 44
}

function hasSubscriptions() {
  return postProjectileInitLate.hasSubscriptions();
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
    postProjectileInitLate.fire(projectile);
  }
}
