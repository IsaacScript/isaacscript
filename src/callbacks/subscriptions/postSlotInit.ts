export type PostSlotInitCallbackType = (slot: Entity) => void;

const subscriptions: Array<
  [PostSlotInitCallbackType, SlotVariant | undefined]
> = [];

export function postSlotInitHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postSlotInitRegister(
  callback: PostSlotInitCallbackType,
  slotVariant?: SlotVariant,
): void {
  subscriptions.push([callback, slotVariant]);
}

export function postSlotInitFire(slot: Entity): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}
