import { SlotVariant } from "isaac-typescript-definitions";
import { isSlot } from "./entityTypes";

const SLOT_MACHINE_VARIANTS: ReadonlySet<SlotVariant> = new Set([
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

/** Returns true for the specific variants of `EntityType.SLOT` that are machines. */
export function isSlotMachine(entity: Entity): boolean {
  if (!isSlot(entity)) {
    return false;
  }

  return SLOT_MACHINE_VARIANTS.has(entity.Variant);
}
