export type PostSlotInitCallbackType = (slot: Entity) => void;

const subscriptions: Array<
  [PostSlotInitCallbackType, SlotVariant | undefined]
> = [];

/** @internal */
export function postSlotInitHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSlotInitRegister(
  callback: PostSlotInitCallbackType,
  slotVariant?: SlotVariant,
): void {
  subscriptions.push([callback, slotVariant]);
}

/** @internal */
export function postSlotInitFire(slot: Entity): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}
