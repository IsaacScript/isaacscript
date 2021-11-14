import { saveDataManager } from "../features/saveDataManager/main";
import * as postEffectInitLate from "./subscriptions/postEffectInitLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postEffectInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_EFFECT_UPDATE, postEffectUpdate); // 55
}

function hasSubscriptions() {
  return postEffectInitLate.hasSubscriptions();
}

// ModCallbacks.MC_POST_EFFECT_UPDATE (55)
function postEffectUpdate(effect: EntityEffect) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(effect);
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postEffectInitLate.fire(effect);
  }
}
