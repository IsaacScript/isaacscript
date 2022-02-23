// This provides the logic for the PostSlotRender and PostSlotBroken callbacks
// (the PostSlotInit and PostSlotUpdate callbacks are handled in a different file)

import { saveDataManager } from "../features/saveDataManager/exports";
import { getSlots } from "../functions/entity";
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
    brokenSlots: new Set<PtrHash>(),
  },
};

/** @internal */
export function postSlotRenderBrokenCallbacksInit(mod: Mod): void {
  saveDataManager("postSlotRenderBroken", v, hasSubscriptions);

  mod.AddCallback(ModCallbacks.MC_POST_RENDER, postRender); // 2
}

function hasSubscriptions() {
  return (
    postSlotRenderHasSubscriptions() || postSlotDestroyedHasSubscriptions()
  );
}

// ModCallbacks.MC_POST_UPDATE (1)
function postRender() {
  if (!hasSubscriptions()) {
    return;
  }

  for (const slot of getSlots()) {
    postSlotRenderFire(slot);
    checkSlotBroken(slot);
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
