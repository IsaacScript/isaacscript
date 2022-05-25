import { ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postPickupInitLateFire,
  postPickupInitLateHasSubscriptions,
} from "./subscriptions/postPickupInitLate";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

/** @internal */
export function postPickupInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postPickupInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_PICKUP_UPDATE, postPickupUpdate); // 35
}

function hasSubscriptions() {
  return postPickupInitLateHasSubscriptions();
}

// ModCallback.POST_PICKUP_UPDATE (35)
function postPickupUpdate(pickup: EntityPickup) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(pickup);
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);
    postPickupInitLateFire(pickup);
  }
}
