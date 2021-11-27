import { GOLDEN_TRINKET_SHIFT } from "../constants";
import { TRINKET_NAME_MAP } from "../maps/trinketNameMap";

export function getMaxTrinketID(): int {
  const itemConfig = Isaac.GetItemConfig();
  return itemConfig.GetTrinkets().Size - 1;
}

/** Helper function to get all of the collectible entities in the room. */
export function getTrinkets(matchingSubType = -1): EntityPickup[] {
  const entities = Isaac.FindByType(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_TRINKET,
    matchingSubType,
  );

  const collectibles: EntityPickup[] = [];
  for (const entity of entities) {
    const pickup = entity.ToPickup();
    if (pickup !== undefined) {
      collectibles.push(pickup);
    }
  }

  return collectibles;
}

/**
 * This is a helper function to get a trinket name from a TrinketType.
 *
 * Example:
 * ```
 * const trinketType = TrinketType.TRINKET_SWALLOWED_PENNY;
 * const trinketName = getTrinketName(trinketType); // trinketName is "Swallowed Penny"
 * ```
 */
export function getTrinketName(trinketType: TrinketType | int): string {
  const itemConfig = Isaac.GetItemConfig();
  const defaultName = "Unknown";

  if (type(trinketType) !== "number") {
    return defaultName;
  }

  // "ItemConfigItem.Name" is bugged with vanilla items on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const trinketName = TRINKET_NAME_MAP.get(trinketType);
  if (trinketName !== undefined) {
    return trinketName;
  }

  const itemConfigItem = itemConfig.GetCollectible(trinketType);
  if (itemConfigItem === undefined) {
    return defaultName;
  }

  return itemConfigItem.Name;
}

export function isGoldenTrinket(trinketType: TrinketType | int): boolean {
  return trinketType > GOLDEN_TRINKET_SHIFT;
}
