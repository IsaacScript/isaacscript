// This provides the logic for the following callbacks:
// - PostSlotRender
// - PostSlotAnimationChanged

import { ModCallback } from "isaac-typescript-definitions";
import { DefaultMap } from "../classes/DefaultMap";
import { saveDataManager } from "../features/saveDataManager/exports";
import { getSlots } from "../functions/entitiesSpecific";
import {
  postSlotAnimationChangedFire,
  postSlotAnimationChangedHasSubscriptions,
} from "./subscriptions/postSlotAnimationChanged";
import {
  postSlotRenderFire,
  postSlotRenderHasSubscriptions,
} from "./subscriptions/postSlotRender";

const v = {
  room: {
    slotAnimations: new DefaultMap<PtrHash, string, [slot: Entity]>(
      (slot: Entity) => {
        const sprite = slot.GetSprite();
        return sprite.GetAnimation();
      },
    ),
    brokenSlots: new Set<PtrHash>(),
  },
};

/** @internal */
export function postSlotRenderCallbacksInit(mod: Mod): void {
  saveDataManager("postSlotRender", v, hasSubscriptions);

  mod.AddCallback(ModCallback.POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return (
    postSlotRenderHasSubscriptions() ||
    postSlotAnimationChangedHasSubscriptions()
  );
}

// ModCallback.POST_UPDATE (1)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const slot of getSlots()) {
    postSlotRenderFire(slot);
    checkSlotAnimationChanged(slot);
  }
}

function checkSlotAnimationChanged(slot: EntitySlot) {
  const sprite = slot.GetSprite();
  const currentAnimation = sprite.GetAnimation();
  const ptrHash = GetPtrHash(slot);
  const previousAnimation = v.room.slotAnimations.getAndSetDefault(
    ptrHash,
    slot,
  );
  v.room.slotAnimations.set(ptrHash, currentAnimation);

  if (currentAnimation !== previousAnimation) {
    postSlotAnimationChangedFire(slot, previousAnimation, currentAnimation);
  }
}
