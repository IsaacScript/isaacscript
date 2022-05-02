export type PostSlotAnimationChangedRegisterParameters = [
  callback: (
    slot: Entity,
    previousAnimation: string,
    currentAnimation: string,
  ) => void,
  slotVariant?: SlotVariant,
];

const subscriptions: PostSlotAnimationChangedRegisterParameters[] = [];

/** @internal */
export function postSlotAnimationChangedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSlotAnimationChangedRegister(
  ...args: PostSlotAnimationChangedRegisterParameters
): void {
  subscriptions.push(args);
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
