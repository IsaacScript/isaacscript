import { saveDataManager } from "../features/saveDataManager/main";
import * as postFamiliarInitLate from "./subscriptions/postFamiliarInitLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postFamiliarInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_FAMILIAR_UPDATE, postFamiliarUpdate); // 6
}

function hasSubscriptions() {
  return postFamiliarInitLate.hasSubscriptions();
}

// ModCallbacks.MC_FAMILIAR_UPDATE (6)
function postFamiliarUpdate(familiar: EntityFamiliar) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(familiar);
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postFamiliarInitLate.fire(familiar);
  }
}
