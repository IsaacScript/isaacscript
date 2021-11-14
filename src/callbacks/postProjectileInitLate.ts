import { saveDataManager } from "../features/saveDataManager/main";
import * as postProjectileInitLate from "./subscriptions/postProjectileInitLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
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

  const index = GetPtrHash(projectile);
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postProjectileInitLate.fire(projectile);
  }
}
