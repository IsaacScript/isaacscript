import { saveDataManager } from "../features/saveDataManager/exports";
import { ModCallbacksCustom } from "../types/ModCallbacksCustom";
import { ModUpgraded } from "../types/ModUpgraded";
import {
  postPickupInitLateFire,
  postPickupInitLateHasSubscriptions,
} from "./subscriptions/postPickupInitLate";

const v = {
  run: {
    firedSet: new Set<PtrHash>(),
  },
};

export function postPickupInitLateCallbackInit(mod: ModUpgraded): void {
  saveDataManager("postPickupInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PICKUP_UPDATE, postPickupUpdate); // 35
  mod.AddCallbackCustom(
    ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY,
    postNewRoomEarly,
  );
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
  if (!v.run.firedSet.has(index)) {
    v.run.firedSet.add(index);
    postPickupInitLateFire(pickup);
  }
}

// ModCallbacksCustom.MC_POST_NEW_ROOM_EARLY
function postNewRoomEarly() {
  if (!hasSubscriptions()) {
    return;
  }

  v.run.firedSet.clear();
}
