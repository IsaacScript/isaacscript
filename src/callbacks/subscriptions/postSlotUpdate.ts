/** @internal */
export type PostSlotUpdateCallbackType = (slot: Entity) => void;

const subscriptions: Array<
  [PostSlotUpdateCallbackType, SlotVariant | undefined]
> = [];

/** @internal */
export function postSlotUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSlotUpdateRegister(
  callback: PostSlotUpdateCallbackType,
  slotVariant?: SlotVariant,
): void {
  subscriptions.push([callback, slotVariant]);
}

/** @internal */
export function postSlotUpdateFire(slot: Entity): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}
