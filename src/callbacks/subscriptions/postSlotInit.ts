import { SlotVariant } from "isaac-typescript-definitions";

export type PostSlotInitRegisterParameters = [
  callback: (slot: Entity) => void,
  slotVariant?: SlotVariant,
];

const subscriptions: PostSlotInitRegisterParameters[] = [];

/** @internal */
export function postSlotInitHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

/** @internal */
export function postSlotInitRegister(
  ...args: PostSlotInitRegisterParameters
): void {
  subscriptions.push(args);
}

/** @internal */
export function postSlotInitFire(slot: Entity): void {
  for (const [callback, slotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (slotVariant !== undefined && slotVariant !== slot.Variant) {
      continue;
    }

    callback(slot);
  }
}
