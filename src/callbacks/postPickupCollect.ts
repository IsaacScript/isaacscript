import { saveDataManager } from "../features/saveDataManager/exports";
import { getClosestPlayer } from "../functions/player";
import * as postPickupCollect from "./subscriptions/postPickupCollect";

// Some pickup properties cannot be retrieved properly in the PostPickupInit callback and must be
// checked in the PostPickupUpdate callback
// This fires on the first update frame

const v = {
  room: {
    firedSet: new Set<PtrHash>(),
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
  if (!v.room.firedSet.has(index)) {
    v.room.firedSet.add(index);

    const player = getClosestPlayer(pickup.Position);
    postPickupCollect.fire(pickup, player);
  }
}
