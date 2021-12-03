/** @internal */
export type PostSlotRenderCallbackType = (slot: Entity) => void;

const subscriptions: Array<
  [PostSlotRenderCallbackType, SlotVariant | undefined]
> = [];

/** @internal */
export function postSlotRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSlotRenderRegister(
  callback: PostSlotRenderCallbackType,
  slotVariant?: SlotVariant,
): void {
  subscriptions.push([callback, slotVariant]);
}

/** @internal */
export function postSlotRenderFire(slot: Entity): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}
