import { SlotVariant } from "isaac-typescript-definitions";

export type PostSlotDestroyedRegisterParameters = [
  callback: (slot: Entity) => void,
  slotVariant?: SlotVariant,
];

const subscriptions: PostSlotDestroyedRegisterParameters[] = [];

/** @internal */
export function postSlotDestroyedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSlotDestroyedRegister(
  ...args: PostSlotDestroyedRegisterParameters
): void {
  subscriptions.push(args);
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
