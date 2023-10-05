import type {
  CacheFlag,
  CollectiblePedestalType,
  ItemConfigTag,
} from "isaac-typescript-definitions";
import {
  CollectibleSpriteLayer,
  CollectibleType,
  EntityType,
  ItemConfigChargeType,
  ItemConfigTagZero,
  ItemType,
  PickupPrice,
  PickupVariant,
  RenderMode,
} from "isaac-typescript-definitions";
import { game, itemConfig } from "../core/cachedClasses";
import {
  BLIND_ITEM_PNG_PATH,
  DEFAULT_ITEM_POOL_TYPE,
  QUALITIES,
} from "../core/constants";
import { LAST_VANILLA_COLLECTIBLE_TYPE } from "../core/constantsFirstLast";
import { VANILLA_COLLECTIBLE_TYPES } from "../core/constantsVanilla";
import {
  COLLECTIBLE_DESCRIPTION_MAP,
  DEFAULT_COLLECTIBLE_DESCRIPTION,
} from "../maps/collectibleDescriptionMap";
import {
  COLLECTIBLE_TYPE_TO_NAME_MAP,
  DEFAULT_COLLECTIBLE_NAME,
} from "../maps/collectibleTypeToNameMap";
import { SINGLE_USE_ACTIVE_COLLECTIBLE_TYPES_SET } from "../sets/singleUseActiveCollectibleTypesSet";
import { getEntityID } from "./entities";
import { hasFlag } from "./flag";
import { isCollectible } from "./pickupVariants";
import { clearSprite, spriteEquals } from "./sprites";
import { isInteger } from "./types";
import { assertDefined } from "./utils";

const COLLECTIBLE_ANM2_PATH = "gfx/005.100_collectible.anm2";

const DEFAULT_COLLECTIBLE_PRICE = 15;

/** Glitched items start at id 4294967295 (the final 32-bit integer) and increment backwards. */
const GLITCHED_ITEM_THRESHOLD = 4_000_000_000;

const QUALITY_TO_VANILLA_COLLECTIBLE_TYPES_MAP: ReadonlyMap<
  Quality,
  ReadonlySet<CollectibleType>
> = (() => {
  const qualityToCollectibleTypesMap = new Map<Quality, Set<CollectibleType>>();

  for (const quality of QUALITIES) {
    const collectibleTypesSet = new Set<CollectibleType>();

    for (const collectibleType of VANILLA_COLLECTIBLE_TYPES) {
      const collectibleTypeQuality = getCollectibleQuality(collectibleType);
      if (collectibleTypeQuality === quality) {
        collectibleTypesSet.add(collectibleType);
      }
    }

    qualityToCollectibleTypesMap.set(quality, collectibleTypesSet);
  }

  return qualityToCollectibleTypesMap;
})();

/** The `isBlindCollectible` function needs a reference sprite to work properly. */
const questionMarkSprite = (() => {
  const sprite = Sprite();
  sprite.Load("gfx/005.100_collectible.anm2", false);
  sprite.ReplaceSpritesheet(1, "gfx/items/collectibles/questionmark.png");
  sprite.LoadGraphics();

  return sprite;
})();

export function clearCollectibleSprite(collectible: EntityPickup): void {
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "clearCollectibleSprite" function was given a non-collectible: ${entityID}`,
    );
  }

  setCollectibleSprite(collectible, undefined);
}

/** Helper function to check in the item config if a given collectible has a given cache flag. */
export function collectibleHasCacheFlag(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
  cacheFlag: CacheFlag,
): boolean {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "collectibleHasCacheFlag",
  );

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return false;
  }

  return hasFlag(itemConfigItem.CacheFlags, cacheFlag);
}

/** Helper function to check if two collectible sprites have the same sprite sheet loaded. */
export function collectibleSpriteEquals(
  sprite1: Sprite,
  sprite2: Sprite,
): boolean {
  // We start at negative 40 texels upwards, as by default we assume a collectible that is sitting
  // on a pedestal. We finish at positive 10 texels downwards, in order to make comparing shop items
  // more accurate.
  const xStart = -1;
  const xFinish = 1;
  const xIncrement = 1;
  const yStart = -40;
  const yFinish = 10;
  const yIncrement = 3;

  return spriteEquals(
    sprite1,
    sprite2,
    CollectibleSpriteLayer.HEAD,
    xStart,
    xFinish,
    xIncrement,
    yStart,
    yFinish,
    yIncrement,
  );
}

/**
 * Helper function to get the charge type that a collectible has. Returns
 * `ItemConfigChargeType.NORMAL` if the provided collectible type was not valid.
 */
export function getCollectibleChargeType(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): ItemConfigChargeType {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleChargeType",
  );

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return ItemConfigChargeType.NORMAL;
  }

  return itemConfigItem.ChargeType;
}

/**
 * Helper function to get the in-game description for a collectible. Returns "Unknown" if the
 * provided collectible type was not valid.
 *
 * This function works for both vanilla and modded collectibles.
 */
export function getCollectibleDescription(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): string {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleDescription",
  );

  // "ItemConfigItem.Description" is bugged with vanilla items on patch v1.7.6, so we use a
  // hard-coded map as a workaround.
  const collectibleDescription =
    COLLECTIBLE_DESCRIPTION_MAP.get(collectibleType);
  if (collectibleDescription !== undefined) {
    return collectibleDescription;
  }

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem !== undefined) {
    return itemConfigItem.Description;
  }

  return DEFAULT_COLLECTIBLE_DESCRIPTION;
}

/**
 * Helper function to get the coin cost that a collectible item would be if it were being offered in
 * a Devil Room deal. Returns 0 if passed `CollectibleType.NULL`.
 */
export function getCollectibleDevilCoinPrice(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): int {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleDescription",
  );

  if (collectibleType === CollectibleType.NULL) {
    return 0;
  }

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return DEFAULT_COLLECTIBLE_PRICE;
  }

  return itemConfigItem.DevilPrice * DEFAULT_COLLECTIBLE_PRICE;
}

/**
 * Helper function to get the heart cost that a collectible item would be if it were being offered
 * in a Devil Room deal. Returns 0 if passed `CollectibleType.NULL`.
 */
export function getCollectibleDevilHeartPrice(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
  player: EntityPlayer,
): PickupPrice {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleDevilHeartPrice",
  );
  const maxHearts = player.GetMaxHearts();

  if (collectibleType === CollectibleType.NULL) {
    return 0;
  }

  if (maxHearts === 0) {
    return PickupPrice.THREE_SOUL_HEARTS;
  }

  const defaultCollectiblePrice = PickupPrice.ONE_HEART;
  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return defaultCollectiblePrice;
  }

  const twoHeartPrice =
    maxHearts === 2
      ? PickupPrice.ONE_HEART_AND_TWO_SOUL_HEARTS
      : PickupPrice.TWO_HEARTS;

  return itemConfigItem.DevilPrice === 2
    ? twoHeartPrice
    : PickupPrice.ONE_HEART;
}

/**
 * Helper function to get the path to a collectible PNG file. Returns the path to the question mark
 * sprite (i.e. from Curse of the Blind) if the provided collectible type was not valid.
 *
 * If you intentionally want the path to the question mark sprite, pass -1 as the collectible type.
 *
 * Note that this does not return the file name, but the full path to the collectible's PNG file.
 * The function is named "GfxFilename" to correspond to the associated `ItemConfigItem.GfxFileName`
 * field.
 */
export function getCollectibleGfxFilename(
  collectibleOrCollectibleType: EntityPickup | CollectibleType | -1,
): string {
  if (collectibleOrCollectibleType === -1) {
    return BLIND_ITEM_PNG_PATH;
  }

  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleGfxFilename",
  );

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return BLIND_ITEM_PNG_PATH;
  }

  return itemConfigItem.GfxFileName;
}

/**
 * Helper function to get the initial amount of charges that a collectible has. Returns 0 if the
 * provided collectible type was not valid.
 */
export function getCollectibleInitCharge(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): int {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleInitCharge",
  );

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
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): ItemType {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleItemType",
  );

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return ItemType.NULL;
  }

  return itemConfigItem.Type;
}

/**
 * Helper function to get the maximum amount of charges that a collectible has. Returns 0 if the
 * provided collectible type was not valid.
 */
export function getCollectibleMaxCharges(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): int {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleMaxCharges",
  );

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
 * This function works for both vanilla and modded collectibles.
 *
 * For example, `getCollectibleName(CollectibleType.SAD_ONION)` would return "Sad Onion".
 */
export function getCollectibleName(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): string {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleName",
  );

  // "ItemConfigItem.Name" is bugged with vanilla items on patch v1.7.6, so we use a hard-coded map
  // as a workaround.
  const collectibleName = COLLECTIBLE_TYPE_TO_NAME_MAP.get(collectibleType);
  if (collectibleName !== undefined) {
    return collectibleName;
  }

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem !== undefined) {
    return itemConfigItem.Name;
  }

  return DEFAULT_COLLECTIBLE_NAME;
}

/**
 * Helper function to get the "pedestal type" of a collectible. For example, it might be sitting on
 * top of a broken Blood Donation Machine, or it might be sitting on top of an opened Spiked Chest.
 */
export function getCollectiblePedestalType(
  collectible: EntityPickup,
): CollectiblePedestalType {
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "getCollectiblePedestalType" function was given a non-collectible: ${entityID}`,
    );
  }

  const sprite = collectible.GetSprite();
  return sprite.GetOverlayFrame();
}

/**
 * Helper function to get a collectible's quality, which ranges from 0 to 4 (inclusive). For
 * example, Mom's Knife has a quality of 4. Returns 0 if the provided collectible type was not
 * valid.
 */
export function getCollectibleQuality(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): Quality {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleQuality",
  );

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return 0;
  }

  return itemConfigItem.Quality;
}

/**
 * Helper function to get the tags of a collectible (which is the composition of zero or more
 * `ItemConfigTag`). Returns 0 if the provided collectible type is not valid.
 *
 * For example:
 *
 * ```ts
 * const collectibleType = CollectibleType.SAD_ONION;
 * const itemConfigTags = getCollectibleTags(collectibleType); // itemConfigTags is "18350080"
 * ```
 */
export function getCollectibleTags(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): BitFlags<ItemConfigTag> {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "getCollectibleTags",
  );

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  return itemConfigItem === undefined ? ItemConfigTagZero : itemConfigItem.Tags;
}

/**
 * Returns a set containing every vanilla collectible type with the given quality.
 *
 * Note that this function will only return vanilla collectible types. To handle modded collectible
 * types, use the `getCollectibleTypesOfQuality` helper function instead.
 */
export function getVanillaCollectibleTypesOfQuality(
  quality: Quality,
): ReadonlySet<CollectibleType> {
  const collectibleTypes =
    QUALITY_TO_VANILLA_COLLECTIBLE_TYPES_MAP.get(quality);
  assertDefined(
    collectibleTypes,
    `Failed to find the vanilla collectible types corresponding to quality: ${quality}`,
  );

  return collectibleTypes;
}

/** Returns true if the item type in the item config is equal to `ItemType.ITEM_ACTIVE`. */
export function isActiveCollectible(collectibleType: CollectibleType): boolean {
  const itemType = getCollectibleItemType(collectibleType);
  return itemType === ItemType.ACTIVE;
}

/**
 * Returns true if the collectible has a red question mark sprite.
 *
 * Note that this function will not work properly in a render callback with the `RenderMode` set to
 * `RenderMode.WATER_REFLECT`. If this is detected, this function will throw a run-time error.
 */
export function isBlindCollectible(collectible: EntityPickup): boolean {
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "isBlindCollectible" function was given a non-collectible: ${entityID}`,
    );
  }

  const room = game.GetRoom();
  const renderMode = room.GetRenderMode();
  if (renderMode === RenderMode.WATER_REFLECT) {
    error(
      'The "isBlindCollectible" function will not work properly in a render callback with the render mode equal to "RenderMode.WATER_REFLECT". Make sure that you properly account for this case if you are calling this function in a render callback.',
    );
  }

  const sprite = collectible.GetSprite();
  const animation = sprite.GetAnimation();
  const frame = sprite.GetFrame();

  questionMarkSprite.SetFrame(animation, frame);
  return collectibleSpriteEquals(sprite, questionMarkSprite);
}

/**
 * Returns whether the given collectible is a "glitched" item. All items are replaced by glitched
 * items once a player has TMTRAINER. However, glitched items can also "naturally" appear in secret
 * rooms and I AM ERROR rooms if the "Corrupted Data" achievement is unlocked.
 */
export function isGlitchedCollectible(collectible: EntityPickup): boolean {
  return (
    collectible.Variant === PickupVariant.COLLECTIBLE &&
    collectible.SubType > GLITCHED_ITEM_THRESHOLD
  );
}

/**
 * Returns true if the collectible has the "Hidden" attribute in the item config.
 *
 * Hidden collectibles will not show up in any pools and Eden will not start with them.
 */
export function isHiddenCollectible(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): boolean {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "isHiddenCollectible",
  );

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  return itemConfigItem !== undefined && itemConfigItem.Hidden;
}

export function isModdedCollectibleType(
  collectibleType: CollectibleType,
): boolean {
  return !isVanillaCollectibleType(collectibleType);
}

/**
 * Returns true if the item type in the item config is equal to `ItemType.ITEM_PASSIVE` or
 * `ItemType.ITEM_FAMILIAR`.
 */
export function isPassiveOrFamiliarCollectible(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
): boolean {
  const collectibleType = getCollectibleTypeFromArg(
    collectibleOrCollectibleType,
    "isPassiveCollectible",
  );

  const itemType = getCollectibleItemType(collectibleType);
  return itemType === ItemType.PASSIVE || itemType === ItemType.FAMILIAR;
}

/** Helper function to check if a collectible type is a particular quality. */
export function isQuality(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
  quality: int,
): boolean {
  const actualQuality = getCollectibleQuality(collectibleOrCollectibleType);
  return quality === actualQuality;
}

/**
 * Helper function to determine if a particular collectible will disappear from the player's
 * inventory upon use. Note that this will not work will modded collectibles, as there is no way to
 * dynamically know if a modded collectible will disappear.
 */
export function isSingleUseCollectible(
  collectibleType: CollectibleType,
): boolean {
  return SINGLE_USE_ACTIVE_COLLECTIBLE_TYPES_SET.has(collectibleType);
}

export function isValidCollectibleType(
  collectibleType: CollectibleType,
): boolean {
  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  return itemConfigItem !== undefined;
}

export function isVanillaCollectibleType(
  collectibleType: CollectibleType,
): boolean {
  return collectibleType <= LAST_VANILLA_COLLECTIBLE_TYPE;
}

/**
 * Helper function to generate a new sprite based on a collectible. If the provided collectible type
 * is invalid, a sprite with a Curse of the Blind question mark will be returned.
 *
 * If you intentionally want a question mark sprite, pass -1 as the collectible type.
 */
export function newCollectibleSprite(
  collectibleType: CollectibleType | -1,
): Sprite {
  const sprite = Sprite();
  sprite.Load(COLLECTIBLE_ANM2_PATH, false);

  // We want to clear the pedestal layers so that the returned sprite only has the collectible
  // image. We can't use the `Sprite.Reset` method for this purpose because that would unload the
  // anm2 file.
  clearSprite(sprite);

  const gfxFileName = getCollectibleGfxFilename(collectibleType);
  sprite.ReplaceSpritesheet(CollectibleSpriteLayer.HEAD, gfxFileName);
  sprite.LoadGraphics();

  const defaultAnimation = sprite.GetDefaultAnimation();
  sprite.Play(defaultAnimation, true);

  return sprite;
}

/**
 * Helper function to remove all pickup delay on a collectible. By default, collectibles have a 20
 * frame delay before they can be picked up by a player.
 */
export function removeCollectiblePickupDelay(collectible: EntityPickup): void {
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "removeCollectiblePickupDelay" function was given a non-collectible: ${entityID}`,
    );
  }

  collectible.Wait = 0;
}

/**
 * Helper function to set a collectible sprite to a question mark (i.e. how collectibles look when
 * the player has Curse of the Blind).
 */
export function setCollectibleBlind(collectible: EntityPickup): void {
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "setCollectibleBlind" function was given a non-collectible: ${entityID}`,
    );
  }

  setCollectibleSprite(collectible, BLIND_ITEM_PNG_PATH);
}

/**
 * Helper function to remove the collectible from a collectible pedestal and make it appear as if a
 * player has already taken the item. This is accomplished by changing the sub-type to
 * `CollectibleType.NULL` and then setting the sprite to an empty/missing PNG file.
 *
 * For more information, see the documentation for the "clearSprite" helper function.
 */
export function setCollectibleEmpty(collectible: EntityPickup): void {
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "setCollectibleEmpty" function was given a non-collectible: ${entityID}`,
    );
  }

  collectible.SubType = CollectibleType.NULL;
  clearCollectibleSprite(collectible);
}

/**
 * Helper function to change a collectible into a "glitched" item (like the ones that appear when
 * the player has TMTRAINER).
 */
export function setCollectibleGlitched(collectible: EntityPickup): void {
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "setCollectibleGlitched" function was given a non-collectible: ${entityID}`,
    );
  }

  // We need to generate a new glitched item. Thus, we temporarily give the player TMTRAINER, if
  // necessary.
  const player = Isaac.GetPlayer();
  const hasTMTRAINER = player.HasCollectible(CollectibleType.TMTRAINER);
  if (!hasTMTRAINER) {
    player.AddCollectible(CollectibleType.TMTRAINER, 0, false);
  }

  const itemPool = game.GetItemPool();
  const collectibleType = itemPool.GetCollectible(DEFAULT_ITEM_POOL_TYPE);
  setCollectibleSubType(collectible, collectibleType);

  if (!hasTMTRAINER) {
    player.RemoveCollectible(CollectibleType.TMTRAINER);
  }
}

/**
 * Helper function to set the "pedestal type" of a collectible. For example, it might be sitting on
 * top of a broken Blood Donation Machine and you want to change it to be sitting on top of an
 * opened Spiked Chest.
 */
export function setCollectiblePedestalType(
  collectible: EntityPickup,
  collectiblePedestalType: CollectiblePedestalType,
): void {
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "setCollectiblePedestalType" function was given a non-collectible: ${entityID}`,
    );
  }

  const sprite = collectible.GetSprite();
  const overlayAnimation = sprite.GetOverlayAnimation();
  sprite.SetOverlayFrame(overlayAnimation, collectiblePedestalType);
}

/**
 * Helper function to change the sprite of a collectible pedestal entity.
 *
 * For more information about removing the collectible sprite, see the documentation for the
 * "clearSprite" helper function.
 *
 * @param collectible The collectible whose sprite you want to modify.
 * @param pngPath Equal to either the spritesheet path to load (e.g.
 *                "gfx/items/collectibles/collectibles_001_thesadonion.png") or undefined. If
 *                undefined, the sprite will be removed, making it appear like the collectible has
 *                already been taken by the player.
 */
export function setCollectibleSprite(
  collectible: EntityPickup,
  pngPath: string | undefined,
): void {
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "setCollectibleSprite" function was given a non-collectible: ${entityID}`,
    );
  }

  const sprite = collectible.GetSprite();
  if (pngPath === undefined) {
    // We want to remove the little circle that appears on top of the pedestal, which is why we also
    // clear `CollectibleSpriteLayer.ITEM_SHADOW`.
    clearSprite(
      sprite,
      CollectibleSpriteLayer.HEAD,
      CollectibleSpriteLayer.ITEM_SHADOW,
    );
  } else {
    sprite.ReplaceSpritesheet(CollectibleSpriteLayer.HEAD, pngPath);
    sprite.LoadGraphics();
  }
}

/**
 * Helper function to change the collectible on a pedestal. Simply updating the `SubType` field is
 * not sufficient because the sprite will not change.
 */
export function setCollectibleSubType(
  collectible: EntityPickup,
  newCollectibleType: CollectibleType,
): void {
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "setCollectibleSubType" function was given a non-collectible: ${entityID}`,
    );
  }

  // You cannot morph a pedestal to "CollectibleType.NULL"; it would instead create a new random
  // collectible item.
  if (newCollectibleType === CollectibleType.NULL) {
    setCollectibleEmpty(collectible);
    return;
  }

  // The naive way to change a collectible's sub-type is to set it directly. However, doing this
  // will not update the sprite. Manually updating the sprite works in most situations, but does not
  // work when the pedestal is empty. Instead, we can simply morph the collectible, which seems to
  // work in all situations.
  collectible.Morph(
    EntityType.PICKUP,
    PickupVariant.COLLECTIBLE,
    newCollectibleType,
    true,
    true,
    true,
  );
}

/**
 * Helper function to put a message in the log.txt file to let the Rebirth Item Tracker know that
 * the build has been rerolled.
 */
export function setCollectiblesRerolledForItemTracker(): void {
  // This cannot use the "log" function since the prefix will prevent the Rebirth Item Tracker from
  // recognizing the message. The number here does not matter since the tracker does not check for a
  // specific number.
  Isaac.DebugString("Added 3 Collectibles");
}

function getCollectibleTypeFromArg(
  collectibleOrCollectibleType: EntityPickup | CollectibleType,
  functionName: string,
): CollectibleType {
  if (isInteger(collectibleOrCollectibleType)) {
    return collectibleOrCollectibleType;
  }

  const collectible = collectibleOrCollectibleType;
  if (!isCollectible(collectible)) {
    const entityID = getEntityID(collectible);
    error(
      `The "${functionName}" function was given a non-collectible: ${entityID}`,
    );
  }

  return collectible.SubType;
}
