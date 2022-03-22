import { CHEST_PICKUP_VARIANTS } from "../sets/chestPickupVariantsSet";
import { RED_HEART_SUB_TYPES_SET } from "../sets/redHeartSubTypesSet";
import { getEntities, removeEntities } from "./entity";

export function getCoins(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.PICKUP_COIN, matchingSubType);
}

export function getHearts(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.PICKUP_HEART, matchingSubType);
}

export function getKeys(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.PICKUP_KEY, matchingSubType);
}

/**
 * Helper function to get all of the pickups in the room.
 *
 * Example:
 * ```
 * // Make all of the pickups in the room invisible
 * for (const pickup of getPickups()) {
 *   pickup.Visible = false;
 * }
 * ```
 */
export function getPickups(
  matchingVariant: PickupVariant | int = -1,
  matchingSubType = -1,
): EntityPickup[] {
  const entities = getEntities(
    EntityType.ENTITY_PICKUP,
    matchingVariant,
    matchingSubType,
  );

  const pickups: EntityPickup[] = [];
  for (const entity of entities) {
    const pickup = entity.ToPickup();
    if (pickup !== undefined) {
      pickups.push(pickup);
    }
  }

  return pickups;
}

export function getRedHearts(): EntityPickup[] {
  const hearts = getHearts();
  return hearts.filter((heart) => RED_HEART_SUB_TYPES_SET.has(heart.SubType));
}

export function isChest(pickup: EntityPickup): boolean {
  return CHEST_PICKUP_VARIANTS.has(pickup.Variant);
}

export function isRedHeart(pickup: EntityPickup): boolean {
  return (
    pickup.Variant === PickupVariant.PICKUP_HEART &&
    RED_HEART_SUB_TYPES_SET.has(pickup.SubType)
  );
}

/**
 * Helper function to remove all of the pickups in the room.
 *
 * @param variant Optional. If specified, will only remove pickups that match this variant.
 * @param subType Optional. If specified, will only remove pickups that match this sub-type.
 * @param cap Optional. If specified, will only remove the given amount of pickups.
 * @returns True if one or more pickups was removed, false otherwise.
 */
export function removeAllPickups(
  variant?: PickupVariant | int,
  subType?: int,
  cap?: int,
): boolean {
  const pickups = getPickups(variant, subType);
  return removeEntities(pickups, cap);
}
