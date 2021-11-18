import { COLLECTIBLE_NAME_MAP } from "../collectibleNameMap";
import { removeAllMatchingEntities } from "./entity";
import { copySet } from "./util";

const COLLECTIBLE_SPRITE_LAYER = 1;
const BLIND_ITEM_PNG_PATH = "gfx/items/collectibles/questionmark.png";

// Glitched items start at id 4294967295 (the final 32-bit integer) and increment backwards
const GLITCHED_ITEM_THRESHOLD = 4000000000;

const COLLECTIBLE_SET = new Set<CollectibleType | int>();

function initSet() {
  const itemConfig = Isaac.GetItemConfig();

  for (
    let collectibleType = 1;
    collectibleType <= getMaxCollectibleID();
    collectibleType++
  ) {
    const itemConfigItem = itemConfig.GetCollectible(collectibleType);
    if (itemConfigItem !== undefined) {
      COLLECTIBLE_SET.add(collectibleType);
    }
  }
}

/**
 * Helper function to change the item on an item pedestal. Simply updating the SubType is not
 * sufficient because you also need to update the sprite.
 */
export function changeCollectibleSubType(
  collectible: EntityPickup,
  newCollectibleType: CollectibleType | int,
): void {
  collectible.SubType = newCollectibleType;

  const itemConfig = Isaac.GetItemConfig();
  const itemConfigItem = itemConfig.GetCollectible(newCollectibleType);
  if (itemConfigItem === undefined) {
    error(`Failed to get the item config for: ${newCollectibleType}`);
  }
  setCollectibleSprite(collectible, itemConfigItem.GfxFileName);
}

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
 * This is a helper function to get an item name from a CollectibleType.
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

  // "ItemConfigItem.Name" is bugged with vanilla items on patch v1.7.5,
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

/** Returns a set containing every valid collectible type in the game, including modded items. */
export function getCollectibleSet(): Set<CollectibleType | int> {
  // Lazy initialize the set
  if (COLLECTIBLE_SET.size === 0) {
    initSet();
  }

  return copySet(COLLECTIBLE_SET);
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

export function isQuestCollectible(
  collectibleType: CollectibleType | int,
): boolean {
  return collectibleHasTag(collectibleType, ItemConfigTag.QUEST);
}

export function removeAllCollectibles(): void {
  removeAllMatchingEntities(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_COLLECTIBLE,
  );
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
