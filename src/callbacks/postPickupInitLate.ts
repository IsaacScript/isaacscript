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

export function postPickupInitLateCallbackInit(mod: Mod): void {
  saveDataManager("postPickupInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PICKUP_UPDATE, postPickupUpdate); // 35
}

function hasSubscriptions() {
  return postPickupInitLateHasSubscriptions();
}

// ModCallbacks.MC_POST_PICKUP_UPDATE (35)
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
