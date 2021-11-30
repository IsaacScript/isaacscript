import { saveDataManager } from "../features/saveDataManager/exports";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postProjectileInitLateFire,
  postProjectileInitLateHasSubscriptions,
} from "./subscriptions/postProjectileInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postProjectileInitLateCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postProjectileInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PROJECTILE_UPDATE, postProjectileUpdate); // 44
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
}

function hasSubscriptions() {
  return postProjectileInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_PROJECTILE_UPDATE (44)
function postProjectileUpdate(projectile: EntityProjectile) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(projectile);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postProjectileInitLateFire(projectile);
  }
}

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.firedSet.clear();
}
