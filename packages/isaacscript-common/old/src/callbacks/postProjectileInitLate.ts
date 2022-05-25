import { ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postProjectileInitLateFire,
  postProjectileInitLateHasSubscriptions,
} from "./subscriptions/postProjectileInitLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

/** @internal */
export function postProjectileInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postProjectileInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_PROJECTILE_UPDATE, postProjectileUpdate); // 44
}

function hasSubscriptions() {
  return postProjectileInitLateHasSubscriptions();
}

// ModCallback.POST_PROJECTILE_UPDATE (44)
function postProjectileUpdate(projectile: EntityProjectile) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(projectile);
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postProjectileInitLateFire(projectile);
  }
}
