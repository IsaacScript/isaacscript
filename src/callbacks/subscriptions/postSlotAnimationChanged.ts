export type PostSlotAnimationChangedCallbackType = (
  slot: Entity,
  previousAnimation: string,
  currentAnimation: string,
) => void;

const subscriptions: Array<
  [PostSlotAnimationChangedCallbackType, SlotVariant | undefined]
> = [];

/** @internal */
export function postSlotAnimationChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSlotAnimationChangedRegister(
  callback: PostSlotAnimationChangedCallbackType,
  slotVariant?: SlotVariant,
): void {
  subscriptions.push([callback, slotVariant]);
}

/** @internal */
export function postSlotAnimationChangedFire(
  slot: Entity,
  previousAnimation: string,
  currentAnimation: string,
): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot, previousAnimation, currentAnimation);
  }
}
