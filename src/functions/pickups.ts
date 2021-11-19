import { getRandomArrayElement } from "./array";
import { getEnumValues } from "./util";

/** Has an equal chance of returning any value in the `HeartSubType` enum. */
export function getRandomHeartSubType(seed = Random()): HeartSubType {
  const heartSubTypes = getEnumValues(HeartSubType);
  return getRandomArrayElement(heartSubTypes, seed);
}

const CHEST_PICKUP_VARIANTS = new Set<PickupVariant>([
  PickupVariant.PICKUP_CHEST, // 50
  PickupVariant.PICKUP_BOMBCHEST, // 51
  PickupVariant.PICKUP_SPIKEDCHEST, // 52
  PickupVariant.PICKUP_ETERNALCHEST, // 53
  PickupVariant.PICKUP_MIMICCHEST, // 54
  PickupVariant.PICKUP_OLDCHEST, // 55
  PickupVariant.PICKUP_WOODENCHEST, // 56
  PickupVariant.PICKUP_MEGACHEST, // 57
  PickupVariant.PICKUP_HAUNTEDCHEST, // 58
  PickupVariant.PICKUP_LOCKEDCHEST, // 60
  PickupVariant.PICKUP_REDCHEST, // 360
  PickupVariant.PICKUP_MOMSCHEST, // 390
]);

export function isChest(pickup: EntityPickup): boolean {
  return CHEST_PICKUP_VARIANTS.has(pickup.Variant);
}
