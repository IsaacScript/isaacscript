import { saveDataManager } from "../features/saveDataManager/main";
import * as postPickupInitLate from "./subscriptions/postPickupInitLate";

const v = {
  room: {
    pickupFiredMap: new Map<PtrHash, boolean>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postPickupInitLate", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PICKUP_UPDATE, postPickupUpdate); // 35
}

function hasSubscriptions() {
  return postPickupInitLate.hasSubscriptions();
}

// ModCallbacks.MC_POST_PICKUP_UPDATE (35)
function postPickupUpdate(pickup: EntityPickup) {
  if (!hasSubscriptions()) {
    return;
  }

  const index = GetPtrHash(pickup);
  const fired = v.room.pickupFiredMap.get(index);
  if (fired === undefined) {
    v.room.pickupFiredMap.set(index, true);
    postPickupInitLate.fire(pickup);
  }
}
