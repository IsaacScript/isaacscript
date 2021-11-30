import { saveDataManager } from "../features/saveDataManager/exports";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postEffectInitLateFire,
  postEffectInitLateHasSubscriptions,
} from "./subscriptions/postEffectInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postEffectInitLateCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postEffectInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_EFFECT_UPDATE, postEffectUpdate); // 55
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
}

function hasSubscriptions() {
  return postEffectInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_EFFECT_UPDATE (55)
function postEffectUpdate(effect: EntityEffect) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(effect);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postEffectInitLateFire(effect);
  }
}

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.firedSet.clear();
}
