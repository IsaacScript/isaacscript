import { COLLECTIBLE_SPRITE_LAYER } from "../constants";

const BLIND_ITEM_PNG_PATH = "gfx/items/collectibles/questionmark.png";

export function collectibleHasTag(
  collectibleType: CollectibleType | int,
  tag: ItemConfigTag,
): boolean {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return false;
  }

  return itemConfigItem.HasTags(tag);
}

export function getCollectibleInitCharges(
  collectibleType: CollectibleType | int,
): int {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return 0;
  }

  return itemConfigItem.InitCharge;
}

export function getCollectibleMaxCharges(
  collectibleType: CollectibleType | int,
): int {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return 0;
  }

  return itemConfigItem.MaxCharges;
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

  if (itemConfigItem === undefined) {
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

/**
 * Helper function to put a message in the log.txt file to let the Rebirth Item Tracker know that it
 * should remove an item.
 *
 * The "item tracker" in this function does not refer to the in-game item tracker, but rather to the
 * Python program located at: https://github.com/Rchardon/RebirthItemTracker
 */
export function removeItemFromItemTracker(
  collectibleType: CollectibleType | int,
): void {
  const itemName = getItemName(collectibleType);

  // This cannot use the "log()" function since the prefix will prevent the Rebirth Item Tracker
  // from recognizing the message
  Isaac.DebugString(
    `Removing voided collectible ${collectibleType} (${itemName}) from player 0 (Player)`,
  );
}

export function setCollectibleBlind(pickup: EntityPickup): void {
  setCollectibleSprite(pickup, BLIND_ITEM_PNG_PATH);
}

export function setCollectibleSprite(
  pickup: EntityPickup,
  pngPath: string,
): void {
  if (pickup.Variant !== PickupVariant.PICKUP_COLLECTIBLE) {
    error(
      `You cannot set a collectible sprite for pickups of variant: ${pickup.Variant}`,
    );
  }

  const sprite = pickup.GetSprite();
  sprite.ReplaceSpritesheet(COLLECTIBLE_SPRITE_LAYER, pngPath);
  sprite.LoadGraphics();
}
