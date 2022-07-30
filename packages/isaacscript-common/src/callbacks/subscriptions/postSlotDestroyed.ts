import { SlotVariant } from "isaac-typescript-definitions";
import { SlotDestructionType } from "../../enums/SlotDestructionType";

export type PostSlotDestroyedRegisterParameters = [
  callback: (
    slot: EntitySlot,
    slotDestructionType: SlotDestructionType,
  ) => void,
  slotVariant?: SlotVariant,
  slotDestructionType?: SlotDestructionType,
];

const subscriptions: PostSlotDestroyedRegisterParameters[] = [];

export function postSlotDestroyedHasSubscriptions(): boolean {
  return subscriptions.length > 0;
}

export function postSlotDestroyedRegister(
  ...args: PostSlotDestroyedRegisterParameters
): void {
  subscriptions.push(args);
}

export function postSlotDestroyedFire(
  slot: EntitySlot,
  slotDestructionType: SlotDestructionType,
): void {
  for (const [
    callback,
    callbackSlotVariant,
    callbackSlotDestructionType,
  ] of subscriptions) {
    // Handle the optional 2nd callback argument.
    if (
      callbackSlotVariant !== undefined &&
      callbackSlotVariant !== slot.Variant
    ) {
      continue;
    }

    // Handle the optional 3rd callback argument.
    if (
      callbackSlotDestructionType !== undefined &&
      callbackSlotDestructionType !== slotDestructionType
    ) {
      continue;
    }

    callback(slot, slotDestructionType);
  }
}
