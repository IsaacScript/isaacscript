import { SlotVariant } from "isaac-typescript-definitions";
import { SLOT_NAMES } from "../objects/slotNames";
import { ReadonlySet } from "../types/ReadonlySet";
import { isSlot } from "./entityTypes";

const SLOT_MACHINE_VARIANTS = new ReadonlySet<SlotVariant>([
  SlotVariant.SLOT_MACHINE, // 1
  SlotVariant.BLOOD_DONATION_MACHINE, // 2,
  SlotVariant.FORTUNE_TELLING_MACHINE, // 3
  SlotVariant.DONATION_MACHINE, // 8
  SlotVariant.SHOP_RESTOCK_MACHINE, // 10
  SlotVariant.GREED_DONATION_MACHINE, // 11
  SlotVariant.MOMS_DRESSING_TABLE, // 12
  SlotVariant.CRANE_GAME, // 16
  SlotVariant.CONFESSIONAL, // 17
]);

/**
 * Helper function to get the name of a slot, as listed in the "entities2.xml" file. Returns
 * "Unknown" if the provided slot variant is not valid.
 *
 * This function only works for vanilla slot variants.
 *
 * For example, `getSlotName(SlotVariant.BLOOD_DONATION_MACHINE)` would return "Blood Donation
 * Machine".
 */
export function getSlotName(slotVariant: SlotVariant): string {
  // Handle modded slots.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return SLOT_NAMES[slotVariant] ?? "Unknown";
}

/** Returns true for the specific variants of `EntityType.SLOT` that are machines. */
export function isSlotMachine(entity: Entity): boolean {
  if (!isSlot(entity)) {
    return false;
  }

  return SLOT_MACHINE_VARIANTS.has(entity.Variant);
}
