import { CHEST_PICKUP_VARIANTS } from "../constants";
import { getRandomArrayElement } from "./array";
import { getEnumValues } from "./utils";

/**
 * Has as an equal chance of returning any value in the `HeartSubType` enum. Useful for spawning a random type of heart.
 *
 * @param seed Optional. The seed with which to select the random sub-type. `Random()` by default.
 * @param exceptions Optional. An array of sub-types to not select.
 */
export function getRandomHeartSubType(
  seed = Random(),
  exceptions: HeartSubType[] = [],
): HeartSubType {
  const heartSubTypes = getEnumValues(HeartSubType);
  return getRandomArrayElement(heartSubTypes, seed, exceptions);
}

export function isChest(pickup: EntityPickup): boolean {
  return CHEST_PICKUP_VARIANTS.has(pickup.Variant);
}
