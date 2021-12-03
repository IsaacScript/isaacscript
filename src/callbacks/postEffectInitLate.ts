import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postEffectInitLateFire,
  postEffectInitLateHasSubscriptions,
} from "./subscriptions/postEffectInitLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

/** @internal */
export function postEffectInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postEffectInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_EFFECT_UPDATE, postEffectUpdate); // 55
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
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postEffectInitLateFire(effect);
  }
}
