// Some pickup properties cannot be retrieved properly in the PostPickupInit callback and must be
// checked in the PostPickupUpdate callback
// This fires on the first update frame

import { saveDataManager } from "../features/saveDataManager/main";
import * as postPickupCollect from "./subscriptions/postPickupCollect";

const v = {
  room: {
    firedMap: new Map<PtrHash, boolean>(),
  },
};

export function init(mod: Mod): void {
  saveDataManager("postPickupCollect", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_PICKUP_RENDER, postPickupRender); // 36
}

function hasSubscriptions() {
  return postPickupCollect.hasSubscriptions();
}

// ModCallbacks.MC_POST_PICKUP_RENDER (36)
function postPickupRender(pickup: EntityPickup) {
  if (!hasSubscriptions()) {
    return;
  }

  const sprite = pickup.GetSprite();
  const animation = sprite.GetAnimation();
  if (animation !== "Collect") {
    return;
  }

  const index = GetPtrHash(pickup);
  const fired = v.room.firedMap.get(index);
  if (fired === undefined) {
    v.room.firedMap.set(index, true);
    postPickupCollect.fire(pickup);
  }
}
