export type PostSlotUpdateCallbackType = (slot: Entity) => void;

const subscriptions: Array<
  [PostSlotUpdateCallbackType, SlotVariant | undefined]
> = [];

export function postSlotUpdateHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postSlotUpdateRegister(
  callback: PostSlotUpdateCallbackType,
  slotVariant?: SlotVariant,
): void {
  subscriptions.push([callback, slotVariant]);
}

export function postSlotUpdateFire(slot: Entity): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}
