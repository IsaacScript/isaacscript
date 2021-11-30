import {
  BLIND_ITEM_PNG_PATH,
  SINGLE_USE_ACTIVE_COLLECTIBLE_TYPES,
} from "../constants";
import { COLLECTIBLE_DESCRIPTION_MAP } from "../maps/collectibleDescriptionMap";
import { COLLECTIBLE_NAME_MAP } from "../maps/collectibleNameMap";
import { removeAllPickups } from "./entity";
import { clearSprite } from "./sprite";

const COLLECTIBLE_SPRITE_LAYER = 1;
const COLLECTIBLE_SHADOW_LAYER = 4;

// Glitched items start at id 4294967295 (the final 32-bit integer) and increment backwards
const GLITCHED_ITEM_THRESHOLD = 4000000000;

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

/**
 * Helper function to get the in-game description for a collectible. Returns "Unknown" if the
 * provided collectible type was not valid.
 */
export function getCollectibleDescription(
  collectibleType: CollectibleType | int,
): string {
  const itemConfig = Isaac.GetItemConfig();
  const defaultDescription = "Unknown";

  if (type(collectibleType) !== "number") {
    return defaultDescription;
  }

  // "ItemConfigItem.Description" is bugged with vanilla items on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const collectibleDescription =
    COLLECTIBLE_DESCRIPTION_MAP.get(collectibleType);
  if (collectibleDescription !== undefined) {
    return collectibleDescription;
  }

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return defaultDescription;
  }

  return itemConfigItem.Description;
}

/**
 * Helper function to get the heart cost that a collectible item would be if it were being offered
 * in a Devil Room deal. Returns 0 if passed CollectibleType.COLLECTIBLE_NULL.
 */
export function getCollectibleDevilHeartPrice(
  collectibleType: CollectibleType | int,
  player: EntityPlayer,
): PickupPrice {
  const itemConfig = Isaac.GetItemConfig();
  const maxHearts = player.GetMaxHearts();

  if (collectibleType === CollectibleType.COLLECTIBLE_NULL) {
    return 0;
  }

  if (maxHearts === 0) {
    return PickupPrice.PRICE_THREE_SOULHEARTS;
  }

  const defaultPickupPrice = PickupPrice.PRICE_ONE_HEART;
  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return defaultPickupPrice;
  }

  const twoHeartPrice =
    maxHearts === 2
      ? PickupPrice.PRICE_ONE_HEART_AND_TWO_SOULHEARTS
      : PickupPrice.PRICE_TWO_HEARTS;

  return itemConfigItem.DevilPrice === 2
    ? twoHeartPrice
    : PickupPrice.PRICE_ONE_HEART;
}

/**
 * Helper function to get the path to a collectible's sprite. Returns
 * "gfx/items/collectibles/questionmark.png" if the provided collectible type was not valid.
 */
export function getCollectibleGfxFilename(
  collectibleType: CollectibleType | int,
): string {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return "unknown.png";
  }

  return itemConfigItem.GfxFileName;
}

/**
 * Helper function to get the initial amount of charges that a collectible has. Returns 0 if the
 * provided collectible type was not valid.
 */
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

/**
 * Helper function to get the `ItemType` of a collectible. Returns `ItemType.ITEM_NULL` if the
 * provided collectible type was not valid.
 */
export function getCollectibleItemType(
  collectibleType: CollectibleType | int,
): ItemType {
  const itemConfig = Isaac.GetItemConfig();

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return ItemType.ITEM_NULL;
  }

  return itemConfigItem.Type;
}

/**
 * Helper function to get the maximum amount of charges that a collectible has. Returns 0 if the
 * provided collectible type was not valid.
 */
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
 * Helper function to get the name of a collectible. Returns "Unknown" if the provided collectible
 * type is not valid.
 *
 * Example:
 * ```
 * const collectibleType = CollectibleType.COLLECTIBLE_SAD_ONION;
 * const collectibleName = getCollectibleName(collectibleType); // collectibleName is "Sad Onion"
 * ```
 */
export function getCollectibleName(
  collectibleType: CollectibleType | int,
): string {
  const itemConfig = Isaac.GetItemConfig();
  const defaultName = "Unknown";

  if (type(collectibleType) !== "number") {
    return defaultName;
  }

  // "ItemConfigItem.Name" is bugged with vanilla items on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const collectibleName = COLLECTIBLE_NAME_MAP.get(collectibleType);
  if (collectibleName !== undefined) {
    return collectibleName;
  }

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return defaultName;
  }

  return itemConfigItem.Name;
}

/** Helper function to get all of the collectible entities in the room. */
export function getCollectibles(matchingSubType = -1): EntityPickup[] {
  const entities = Isaac.FindByType(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_COLLECTIBLE,
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

export function getMaxCollectibleID(): int {
  const itemConfig = Isaac.GetItemConfig();
  return itemConfig.GetCollectibles().Size - 1;
}

/**
 * Returns whether or not the given collectible is a "glitched" item. All items are replaced by
 * glitched items once a player has TMTRAINER. However, glitched items can also "naturally" appear
 * in secret rooms and I AM ERROR rooms if the "Corrupted Data" achievement is unlocked.
 */
export function isGlitchedCollectible(entity: Entity): boolean {
  return (
    entity.Type === EntityType.ENTITY_PICKUP &&
    entity.Variant === PickupVariant.PICKUP_COLLECTIBLE &&
    entity.SubType > GLITCHED_ITEM_THRESHOLD
  );
}

/**
 * Returns true if the item type in the item config is equal to `ItemType.ITEM_PASSIVE` or
 * `ItemType.ITEM_FAMILIAR`.
 */
export function isPassiveCollectible(collectibleType: CollectibleType | int) {
  const itemType = getCollectibleItemType(collectibleType);
  return (
    itemType === ItemType.ITEM_PASSIVE || itemType === ItemType.ITEM_FAMILIAR
  );
}

export function isQuestCollectible(
  collectibleType: CollectibleType | int,
): boolean {
  return collectibleHasTag(collectibleType, ItemConfigTag.QUEST);
}

/**
 * Helper function to determine if a particular collectible will disappear from the player's
 * inventory upon use. Note that this will not work will modded items, as there is no way to
 * dynamically know if a modded item will disappear.
 */
export function isSingleUseCollectible(
  collectibleType: CollectibleType | int,
): boolean {
  return SINGLE_USE_ACTIVE_COLLECTIBLE_TYPES.has(collectibleType);
}

/**
 * Helper function to remove all of the collectibles in the room.
 *
 * @param collectibleType Optional. If specified, will only remove collectibles that match this
 * collectible type.
 * @param cap Optional. If specified, will only remove the given amount of collectibles.
 */
export function removeAllCollectibles(
  collectibleType?: CollectibleType | int,
  cap?: int,
): void {
  removeAllPickups(PickupVariant.PICKUP_COLLECTIBLE, collectibleType, cap);
}

/**
 * Helper function to remove all pickup delay on a collectible. By default, collectibles have a 20
 * frame delay before they can be picked up by a player.
 */
export function removeCollectiblePickupDelay(collectible: EntityPickup): void {
  if (collectible.Variant !== PickupVariant.PICKUP_COLLECTIBLE) {
    error(
      `You cannot remove pickup delay for pickups of variant: ${collectible.Variant}`,
    );
  }

  collectible.Wait = 0;
}

/**
 * Helper function to put a message in the log.txt file to let the Rebirth Item Tracker know that it
 * should remove an item.
 *
 * The "item tracker" in this function does not refer to the in-game item tracker, but rather to the
 * Python program located at: https://github.com/Rchardon/RebirthItemTracker
 */
export function removeCollectibleFromItemTracker(
  collectibleType: CollectibleType | int,
): void {
  const collectibleName = getCollectibleName(collectibleType);

  // This cannot use the "log()" function since the prefix will prevent the Rebirth Item Tracker
  // from recognizing the message
  Isaac.DebugString(
    `Removing collectible ${collectibleType} (${collectibleName}) on player 0 (Player)`,
  );
}

export function setCollectibleBlind(collectible: EntityPickup): void {
  if (collectible.Variant !== PickupVariant.PICKUP_COLLECTIBLE) {
    error(
      `You cannot set a collectible to be blind for pickups of variant: ${collectible.Variant}`,
    );
  }

  setCollectibleSprite(collectible, BLIND_ITEM_PNG_PATH);
}

/**
 * Helper function to remove the collectible from a collectible pedestal and make it appear as if a
 * player has already taken the item. This is accomplished by setting its sprite to an empty/missing
 * PNG file.
 *
 * For more information, see the documentation for the "emptySprite" helper function.
 */
export function setCollectibleEmpty(collectible: EntityPickup): void {
  if (collectible.Variant !== PickupVariant.PICKUP_COLLECTIBLE) {
    error(
      `You cannot set a collectible to be empty for pickups of variant: ${collectible.Variant}`,
    );
  }

  collectible.SubType = CollectibleType.COLLECTIBLE_NULL;
  setCollectibleSprite(collectible);
}

/**
 * Helper function to change the sprite of a collectible pedestal entity.
 *
 * For more information about removing the collectible sprite, see the documentation for the
 * "emptySprite" helper function.
 *
 * @param collectible The collectible whose sprite you want to modify.
 * @param pngPath Optional. Equal to the spritesheet path to load (e.g.
 * "gfx/items/collectibles/collectibles_001_thesadonion.png"). If not specified, will remove the
 * sprite, making it appear like the collectible has already been taken by the player.
 */
export function setCollectibleSprite(
  collectible: EntityPickup,
  pngPath?: string,
): void {
  if (collectible.Variant !== PickupVariant.PICKUP_COLLECTIBLE) {
    error(
      `You cannot set a collectible sprite for pickups of variant: ${collectible.Variant}`,
    );
  }

  const sprite = collectible.GetSprite();
  if (pngPath === undefined) {
    clearSprite(sprite, COLLECTIBLE_SPRITE_LAYER, COLLECTIBLE_SHADOW_LAYER);
  } else {
    sprite.ReplaceSpritesheet(COLLECTIBLE_SPRITE_LAYER, pngPath);
    sprite.LoadGraphics();
  }
}

/**
 * Helper function to change the collectible on a pedestal. Simply updating the SubType property is
 * not sufficient because the sprite will not change.
 */
export function setCollectibleSubType(
  collectible: EntityPickup,
  newCollectibleType: CollectibleType | int,
): void {
  if (collectible.Variant !== PickupVariant.PICKUP_COLLECTIBLE) {
    error(
      `You cannot set a collectible sub type for pickups of variant: ${collectible.Variant}`,
    );
  }

  // You cannot morph a pedestal to "CollectibleType.COLLECTIBLE_NULL";
  // it would instead create a new random collectible item
  if (newCollectibleType === CollectibleType.COLLECTIBLE_NULL) {
    setCollectibleEmpty(collectible);
    return;
  }

  // The naive way to change a collectible's sub-type is to set it directly
  // However, doing this will not update the sprite
  // Manually updating the sprite works in most situations, but does not work when the pedestal is
  // empty
  // Instead, we can simply morph the collectible, which seems to work in all situations
  collectible.Morph(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_COLLECTIBLE,
    newCollectibleType,
    true,
    true,
    true,
  );
}
