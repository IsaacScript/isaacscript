export function collectibleHasTag(
  collectibleType: CollectibleType | int,
  tag: ItemConfigTag,
): boolean {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === null) {
    return false;
  }

  return itemConfigItem.HasTags(tag);
}

/**
 * This is a helper function to get an item name from a CollectibleType or a TrinketType.
 *
 * Example:
 * ```
 * const item = CollectibleType.COLLECTIBLE_SAD_ONION;
 * const itemName = getItemName(item); // itemName is now "Sad Onion"
 * ```
 */
export function getItemName(
  collectibleOrTrinketType: int,
  trinket = false,
): string {
  const itemConfig = Isaac.GetItemConfig();
  const defaultName = "Unknown";

  if (type(collectibleOrTrinketType) !== "number") {
    return defaultName;
  }

  const itemConfigItem = trinket
    ? itemConfig.GetTrinket(collectibleOrTrinketType)
    : itemConfig.GetCollectible(collectibleOrTrinketType);

  if (itemConfigItem === null) {
    return defaultName;
  }

  return itemConfigItem.Name;
}

export function getMaxCollectibleID(): int {
  const itemConfig = Isaac.GetItemConfig();
  return itemConfig.GetCollectibles().Size - 1;
}

export function isQuestItem(collectibleType: CollectibleType | int): boolean {
  return collectibleHasTag(collectibleType, ItemConfigTag.QUEST);
}
