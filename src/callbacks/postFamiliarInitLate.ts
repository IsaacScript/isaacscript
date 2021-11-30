import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postFamiliarInitLateFire,
  postFamiliarInitLateHasSubscriptions,
} from "./subscriptions/postFamiliarInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postFamiliarInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postFamiliarInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_FAMILIAR_UPDATE, postFamiliarUpdate); // 6
}

function hasSubscriptions() {
  return postFamiliarInitLateHasSubscriptions();
}

// ModCallbacks.MC_FAMILIAR_UPDATE (6)
function postFamiliarUpdate(familiar: EntityFamiliar) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(familiar);
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postFamiliarInitLateFire(familiar);
  }
}
