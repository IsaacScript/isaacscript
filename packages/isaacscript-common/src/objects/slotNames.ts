import { SlotVariant } from "isaac-typescript-definitions";

export const DEFAULT_SLOT_NAME = "Unknown";

/** Taken from "entities2.xml". */
export const SLOT_NAMES = {
  [SlotVariant.SLOT_MACHINE]: "Slot Machine", // 1
  [SlotVariant.BLOOD_DONATION_MACHINE]: "Blood Donation Machine", // 2
  [SlotVariant.FORTUNE_TELLING_MACHINE]: "Fortune Telling Machine", // 3
  [SlotVariant.BEGGAR]: "Beggar", // 4
  [SlotVariant.DEVIL_BEGGAR]: "Devil Beggar", // 5
  [SlotVariant.SHELL_GAME]: "Shell Game", // 6
  [SlotVariant.KEY_MASTER]: "Key Master", // 7
  [SlotVariant.DONATION_MACHINE]: "Donation Machine", // 8
  [SlotVariant.BOMB_BUM]: "Bomb Bum", // 9
  [SlotVariant.SHOP_RESTOCK_MACHINE]: "Shop Restock Machine", // 10
  [SlotVariant.GREED_DONATION_MACHINE]: "Greed Donation Machine", // 11
  [SlotVariant.MOMS_DRESSING_TABLE]: "Mom's Dressing Table", // 12
  [SlotVariant.BATTERY_BUM]: "Battery Bum", // 13
  [SlotVariant.ISAAC_SECRET]: "Isaac (secret)", // 14
  [SlotVariant.HELL_GAME]: "Hell Game", // 15
  [SlotVariant.CRANE_GAME]: "Crane Game", // 16
  [SlotVariant.CONFESSIONAL]: "Confessional", // 17
  [SlotVariant.ROTTEN_BEGGAR]: "Rotten Beggar", // 18
} as const satisfies Record<SlotVariant, string>;
