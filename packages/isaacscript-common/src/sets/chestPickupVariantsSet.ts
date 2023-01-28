import { PickupVariant } from "isaac-typescript-definitions";
import { ReadonlySet } from "../types/ReadonlySet";

export const CHEST_PICKUP_VARIANTS = new ReadonlySet<PickupVariant>([
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
