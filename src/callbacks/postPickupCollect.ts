// Some pickup properties cannot be retrieved properly in the PostPickupInit callback and must be
// checked in the PostPickupUpdate callback. This fires on the first update frame.

import { ModCallback } from "isaac-typescript-definitions";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getClosestPlayer } from "../functions/player";
import {
  postPickupCollectFire,
  postPickupCollectHasSubscriptions,
} from "./subscriptions/postPickupCollect";

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
  },
};

/** @internal */
export function postPickupCollectCallbackInit(mod: Mod): void {
  saveDataManager("postPickupCollect", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_PICKUP_RENDER, postPickupRender); // 36
}

function hasSubscriptions() {
  return postPickupCollectHasSubscriptions();
}

// ModCallback.POST_PICKUP_RENDER (36)
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
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);

    const player = getClosestPlayer(pickup.Position);
    postPickupCollectFire(pickup, player);
  }
}
