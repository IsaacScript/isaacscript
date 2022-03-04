import { CHEST_PICKUP_VARIANTS } from "../constants";
import { getEntities, removeEntities } from "./entity";

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

export function isChest(pickup: EntityPickup): boolean {
  return CHEST_PICKUP_VARIANTS.has(pickup.Variant);
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
