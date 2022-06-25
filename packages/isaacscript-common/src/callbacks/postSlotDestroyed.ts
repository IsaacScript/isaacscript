// Normally, when a slot is destroyed, the grid collision class changes to
// `EntityGridCollisionClass.GROUND` and sticks around in the room. Thus, checking for this case is
// simple.

// The special case is when a slot pays out with a collectible item. In this case, it will not stay
// in the room. Instead, it will play the "Prize" animation for 3 game frames, and then despawn (to
// be replaced by a collectible entity). Subsequently, we handle this case by assuming that if the
// slot disappeared 3 frames after it changed to a prize animation, it was a destruction pay-out.

import {
  EntityGridCollisionClass,
  EntityType,
  ModCallback,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { ModUpgraded } from "../classes/ModUpgraded";
import { ModCallbackCustom } from "../enums/ModCallbackCustom";
import { SlotDestructionType } from "../enums/SlotDestructionType";
import { saveDataManager } from "../features/saveDataManager/exports";
import {
  postSlotDestroyedFire,
  postSlotDestroyedHasSubscriptions,
} from "./subscriptions/postSlotDestroyed";

const PRIZE_GAME_FRAME_DELAY_UNTIL_REMOVAL = 3;

const v = {
  room: {
    brokenSlots: new Set<PtrHash>(),
    slotPrizeAnimationGameFrame: new Map<PtrHash, int>(),
  },
};

/** @internal */
export function postSlotDestroyedInit(mod: ModUpgraded): void {
  saveDataManager("postSlotDestroyed", v, hasSubscriptions);

  mod.AddCallback(
    ModCallback.POST_ENTITY_REMOVE,
    postEntityRemove,
    EntityType.SLOT,
  ); // 67

  mod.AddCallbackCustom(
    ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED,
    postSlotAnimationChanged,
  );
}

function hasSubscriptions() {
  return postSlotDestroyedHasSubscriptions();
}

// ModCallback.POST_ENTITY_REMOVE (67)
function postEntityRemove(entity: Entity) {
  const slot = entity as EntitySlot;
  const ptrHash = GetPtrHash(slot);
  const gameFrameCount = game.GetFrameCount();

  const prizeFrame = v.room.slotPrizeAnimationGameFrame.get(ptrHash);
  if (prizeFrame === undefined) {
    return;
  }

  if (prizeFrame + PRIZE_GAME_FRAME_DELAY_UNTIL_REMOVAL === gameFrameCount) {
    postSlotDestroyedFire(slot, SlotDestructionType.COLLECTIBLE_PAYOUT);
  }
}

// ModCallbackCustom.POST_SLOT_ANIMATION_CHANGED
function postSlotAnimationChanged(slot: EntitySlot) {
  const ptrHash = GetPtrHash(slot);
  const gameFrameCount = game.GetFrameCount();

  const alreadyBroken = v.room.brokenSlots.has(ptrHash);
  if (alreadyBroken) {
    return;
  }

  if (slot.GridCollisionClass === EntityGridCollisionClass.GROUND) {
    v.room.brokenSlots.add(ptrHash);
    postSlotDestroyedFire(slot, SlotDestructionType.NORMAL);
  }

  const sprite = slot.GetSprite();
  const animation = sprite.GetAnimation();
  if (animation === "Prize") {
    v.room.slotPrizeAnimationGameFrame.set(ptrHash, gameFrameCount);
  } else {
    v.room.slotPrizeAnimationGameFrame.delete(ptrHash);
  }
}
