export type PostSlotRenderCallbackType = (slot: Entity) => void;

const subscriptions: Array<
  [PostSlotRenderCallbackType, SlotVariant | undefined]
> = [];

export function postSlotRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postSlotRenderRegister(
  callback: PostSlotRenderCallbackType,
  slotVariant?: SlotVariant,
): void {
  subscriptions.push([callback, slotVariant]);
}

export function postSlotRenderFire(slot: Entity): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}
