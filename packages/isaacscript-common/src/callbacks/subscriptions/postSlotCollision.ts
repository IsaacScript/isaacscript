import { SlotVariant } from "isaac-typescript-definitions";

export type PostSlotCollisionRegisterParameters = [
  callback: (slot: EntitySlot, player: EntityPlayer) => void,
  slotVariant?: SlotVariant,
];

const subscriptions: PostSlotCollisionRegisterParameters[] = [];

export function postSlotCollisionHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postSlotCollisionRegister(
  ...args: PostSlotCollisionRegisterParameters
): void {
  subscriptions.push(args);
}

export function postSlotCollisionFire(
  slot: EntitySlot,
  player: EntityPlayer,
): void {
  for (const [callback, callbackSlotVariant] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackSlotVariant !== undefined &&
      callbackSlotVariant !== slot.Variant
    ) {
      continue;
    }

    callback(slot, player);
  }
}
