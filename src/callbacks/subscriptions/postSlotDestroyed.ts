/** @internal */
export type PostSlotDestroyedCallbackType = (slot: Entity) => void;

const subscriptions: Array<
  [PostSlotDestroyedCallbackType, SlotVariant | undefined]
> = [];

/** @internal */
export function postSlotDestroyedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSlotDestroyedRegister(
  callback: PostSlotDestroyedCallbackType,
  slotVariant?: SlotVariant,
): void {
  subscriptions.push([callback, slotVariant]);
}

/** @internal */
export function postSlotDestroyedFire(slot: Entity): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}
