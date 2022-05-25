import { SlotVariant } from "isaac-typescript-definitions";

export type PostSlotRenderRegisterParameters = [
  callback: (slot: EntitySlot) => void,
  slotVariant?: SlotVariant,
];

const subscriptions: PostSlotRenderRegisterParameters[] = [];

/** @internal */
export function postSlotRenderHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSlotRenderRegister(
  ...args: PostSlotRenderRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postSlotRenderFire(slot: EntitySlot): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}
