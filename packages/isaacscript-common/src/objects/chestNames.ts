import { PickupVariant } from "isaac-typescript-definitions";
import type { CHEST_PICKUP_VARIANTS } from "../core/constants";

/** Taken from "entities2.xml". */
export const CHEST_NAMES = {
  [PickupVariant.CHEST]: "Chest", // 50
  [PickupVariant.BOMB_CHEST]: "Bomb Chest", // 51
  [PickupVariant.SPIKED_CHEST]: "Spiked Chest", // 52
  [PickupVariant.ETERNAL_CHEST]: "Eternal Chest", // 53
  [PickupVariant.MIMIC_CHEST]: "Mimic Chest", // 54
  [PickupVariant.OLD_CHEST]: "Old Chest", // 55
  [PickupVariant.WOODEN_CHEST]: "Wooden Chest", // 56
  [PickupVariant.MEGA_CHEST]: "Mega Chest", // 57
  [PickupVariant.HAUNTED_CHEST]: "Haunted Chest", // 58
  [PickupVariant.LOCKED_CHEST]: "Locked Chest", // 60
  [PickupVariant.RED_CHEST]: "Red Chest", // 360
  [PickupVariant.MOMS_CHEST]: "Mom's Chest", // 390
} as const satisfies Record<(typeof CHEST_PICKUP_VARIANTS)[number], string>;
