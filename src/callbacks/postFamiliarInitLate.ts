import { saveDataManager } from "../features/saveDataManager/exports";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postFamiliarInitLateFire,
  postFamiliarInitLateHasSubscriptions,
} from "./subscriptions/postFamiliarInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postFamiliarInitLateCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postFamiliarInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_FAMILIAR_UPDATE, postFamiliarUpdate); // 6
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
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

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.firedSet.clear();
}
