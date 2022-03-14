// This provides the logic for the following callbacks:
// - PostSlotRender
// - PostSlotAnimationChanged
// - PostSlotBroken

import { saveDataManager } from "../features/saveDataManager/exports";
import { getSlots } from "../functions/entitySpecific";
import { DefaultMap } from "../types/DefaultMap";
import {
  postSlotAnimationChangedFire,
  postSlotAnimationChangedHasSubscriptions,
} from "./subscriptions/postSlotAnimationChanged";
import {
  postSlotDestroyedFire,
  postSlotDestroyedHasSubscriptions,
} from "./subscriptions/postSlotDestroyed";
import {
  postSlotRenderFire,
  postSlotRenderHasSubscriptions,
} from "./subscriptions/postSlotRender";

const BROKEN_ANIMATIONS: ReadonlySet<string> = new Set([
  "Broken", // Normal machines
  "Death", // Restock machines
]);

const v = {
  room: {
    slotAnimations: new DefaultMap<PtrHash, string, [slot: Entity]>(
      (_key: PtrHash, slot: Entity) => {
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

  mod.AddCallback(ModCallbacks.MC_POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return (
    postSlotRenderHasSubscriptions() ||
    postSlotDestroyedHasSubscriptions() ||
    postSlotAnimationChangedHasSubscriptions()
  );
}

// ModCallbacks.MC_POST_UPDATE (1)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const slot of getSlots()) {
    postSlotRenderFire(slot);
    checkSlotAnimationChanged(slot);
    checkSlotBroken(slot);
  }
}

function checkSlotAnimationChanged(slot: Entity) {
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

function checkSlotBroken(slot: Entity) {
  const ptrHash = GetPtrHash(slot);
  const alreadyBroken = v.room.brokenSlots.has(ptrHash);
  if (alreadyBroken) {
    return;
  }

  const sprite = slot.GetSprite();
  const animation = sprite.GetAnimation();
  if (BROKEN_ANIMATIONS.has(animation)) {
    v.room.brokenSlots.add(ptrHash);
    postSlotDestroyedFire(slot);
  }
}
