import { PickupVariant } from "isaac-typescript-definitions";

export const CHEST_PICKUP_VARIANTS: ReadonlySet<PickupVariant> = new Set([
  PickupVariant.CHEST, // 50
  PickupVariant.BOMB_CHEST, // 51
  PickupVariant.SPIKED_CHEST, // 52
  PickupVariant.ETERNAL_CHEST, // 53
  PickupVariant.MIMIC_CHEST, // 54
  PickupVariant.OLD_CHEST, // 55
  PickupVariant.WOODEN_CHEST, // 56
  PickupVariant.MEGA_CHEST, // 57
  PickupVariant.HAUNTED_CHEST, // 58
  PickupVariant.LOCKED_CHEST, // 60
  PickupVariant.RED_CHEST, // 360
  PickupVariant.MOMS_CHEST, // 390
]);
