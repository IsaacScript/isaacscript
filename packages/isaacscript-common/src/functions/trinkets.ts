import {
  CacheFlag,
  PlayerType,
  TrinketSlot,
  TrinketType,
} from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import { BLIND_ITEM_PNG_PATH } from "../core/constants";
import {
  FIRST_TRINKET_TYPE,
  LAST_VANILLA_TRINKET_TYPE,
} from "../core/constantsFirstLast";
import {
  DEFAULT_TRINKET_DESCRIPTION,
  TRINKET_DESCRIPTION_MAP,
} from "../maps/trinketDescriptionMap";
import {
  DEFAULT_TRINKET_NAME,
  TRINKET_TYPE_TO_NAME_MAP,
} from "../maps/trinketTypeToNameMap";
import { getEntityID } from "./entities";
import { hasFlag } from "./flag";
import { isTrinket } from "./pickupVariants";
import { isCharacter } from "./players";
import { clearSprite } from "./sprites";
import { asNumber } from "./types";
import { iRange } from "./utils";

/**
 * Add this to a `TrinketType` to get the corresponding golden trinket type.
 *
 * Corresponds to the vanilla `PillColor.TRINKET_GOLDEN_FLAG` value.
 *
 * 1 << 15
 */
const GOLDEN_TRINKET_ADJUSTMENT = 32768;

const TRINKET_ANM2_PATH = "gfx/005.350_trinket.anm2";
const TRINKET_SPRITE_LAYER = 0;

/**
 * Helper function to get the corresponding golden trinket type from a normal trinket type.
 *
 * For example, passing `TrinketType.SWALLOWED_PENNY` would result in 32769, which is the value that
 * corresponds to the golden trinket sub-type for Swallowed Penny.
 */
export function getGoldenTrinketType(trinketType: TrinketType): TrinketType {
  return asNumber(trinketType) + GOLDEN_TRINKET_ADJUSTMENT;
}

/**
 * Returns the slot number corresponding to where a trinket can be safely inserted.
 *
 * For example:
 *
 * ```ts
 * const player = Isaac.GetPlayer();
 * const trinketSlot = getOpenTrinketSlotNum(player);
 * if (trinketSlot !== undefined) {
 *   // They have one or more open trinket slots
 *   player.AddTrinket(TrinketType.SWALLOWED_PENNY);
 * }
 * ```
 */
export function getOpenTrinketSlot(player: EntityPlayer): int | undefined {
  const maxTrinkets = player.GetMaxTrinkets();
  const trinketType1 = player.GetTrinket(TrinketSlot.SLOT_1);
  const trinketType2 = player.GetTrinket(TrinketSlot.SLOT_2);

  if (maxTrinkets === 1) {
    return trinketType1 === TrinketType.NULL ? 0 : undefined;
  }

  if (maxTrinkets === 2) {
    if (trinketType1 === TrinketType.NULL) {
      return 0;
    }

    return trinketType2 === TrinketType.NULL ? 1 : undefined;
  }

  error(`The player has an unknown number of trinket slots: ${maxTrinkets}`);
}

/**
 * Helper function to get the in-game description for a trinket. Returns "Unknown" if the provided
 * trinket type was not valid.
 *
 * This function works for both vanilla and modded trinkets.
 */
export function getTrinketDescription(trinketType: TrinketType): string {
  // "ItemConfigItem.Description" is bugged with vanilla items on patch v1.7.6, so we use a
  // hard-coded map as a workaround.
  const trinketDescription = TRINKET_DESCRIPTION_MAP.get(trinketType);
  if (trinketDescription !== undefined) {
    return trinketDescription;
  }

  const itemConfigItem = itemConfig.GetTrinket(trinketType);
  if (itemConfigItem !== undefined) {
    return itemConfigItem.Description;
  }

  return DEFAULT_TRINKET_DESCRIPTION;
}

/**
 * Helper function to get the path to a trinket PNG file. Returns the path to the question mark
 * sprite (i.e. from Curse of the Blind) if the provided trinket type was not valid.
 *
 * Note that this does not return the file name, but the full path to the trinket's PNG file. The
 * function is named "GfxFilename" to correspond to the associated `ItemConfigItem.GfxFileName`
 * field.
 */
export function getTrinketGfxFilename(trinketType: TrinketType): string {
  const itemConfigItem = itemConfig.GetTrinket(trinketType);
  if (itemConfigItem === undefined) {
    return BLIND_ITEM_PNG_PATH;
  }

  return itemConfigItem.GfxFileName;
}

/**
 * Helper function to get the name of a trinket. Returns "Unknown" if the provided trinket type is
 * not valid.
 *
 * For example, `getTrinketName(TrinketType.SWALLOWED_PENNY)` would return "Swallowed Penny".
 *
 * This function works for both vanilla and modded trinkets.
 */
export function getTrinketName(trinketType: TrinketType): string {
  // "ItemConfigItem.Name" is bugged with vanilla items on patch v1.7.6, so we use a hard-coded map
  // as a workaround.
  const trinketName = TRINKET_TYPE_TO_NAME_MAP.get(trinketType);
  if (trinketName !== undefined) {
    return trinketName;
  }

  const itemConfigItem = itemConfig.GetTrinket(trinketType);
  if (itemConfigItem !== undefined) {
    return itemConfigItem.Name;
  }

  return DEFAULT_TRINKET_NAME;
}

/** Helper function to get an array that represents every vanilla trinket type. */
export function getVanillaTrinketTypes(): TrinketType[] {
  return iRange(FIRST_TRINKET_TYPE, LAST_VANILLA_TRINKET_TYPE);
}

/**
 * Returns whether or not the player can hold an additional trinket, beyond what they are currently
 * carrying. This takes into account items that modify the max number of trinkets, like Mom's Purse.
 *
 * If the player is the Tainted Soul, this always returns false, since that character cannot pick up
 * items. (Only Tainted Forgotten can pick up items.)
 */
export function hasOpenTrinketSlot(player: EntityPlayer): boolean {
  if (isCharacter(player, PlayerType.SOUL_B)) {
    return false;
  }

  const openTrinketSlot = getOpenTrinketSlot(player);
  return openTrinketSlot !== undefined;
}

export function isGoldenTrinketType(trinketType: TrinketType): boolean {
  return asNumber(trinketType) > GOLDEN_TRINKET_ADJUSTMENT;
}

export function isModdedTrinketType(trinketType: TrinketType): boolean {
  return !isVanillaTrinketType(trinketType);
}

export function isVanillaTrinketType(trinketType: TrinketType): boolean {
  return trinketType <= LAST_VANILLA_TRINKET_TYPE;
}

/**
 * Helper function to generate a new sprite based on a collectible. If the provided collectible type
 * is invalid, a sprite with a Curse of the Blind question mark will be returned.
 */
export function newTrinketSprite(trinketType: TrinketType): Sprite {
  const sprite = Sprite();
  sprite.Load(TRINKET_ANM2_PATH, false);

  const gfxFileName = getTrinketGfxFilename(trinketType);
  sprite.ReplaceSpritesheet(TRINKET_SPRITE_LAYER, gfxFileName);
  sprite.LoadGraphics();

  return sprite;
}

/**
 * Helper function to change the sprite of a trinket entity.
 *
 * For more information about removing the trinket sprite, see the documentation for the
 * "clearSprite" helper function.
 *
 * @param trinket The trinket whose sprite you want to modify.
 * @param pngPath Equal to either the spritesheet path to load (e.g.
 *                "gfx/items/trinkets/trinket_001_swallowedpenny.png") or undefined. If undefined,
 *                the sprite will be removed, making it appear like the collectible has already been
 *                taken by the player.
 */
export function setTrinketSprite(
  trinket: EntityPickup,
  pngPath: string | undefined,
): void {
  if (!isTrinket(trinket)) {
    const entityID = getEntityID(trinket);
    error(
      `The "setTrinketSprite" function was given a non-trinket: ${entityID}`,
    );
  }

  const sprite = trinket.GetSprite();
  if (pngPath === undefined) {
    clearSprite(sprite, TRINKET_SPRITE_LAYER);
  } else {
    sprite.ReplaceSpritesheet(TRINKET_SPRITE_LAYER, pngPath);
    sprite.LoadGraphics();
  }
}

/** Helper function to check in the item config if a given trinket has a given cache flag. */
export function trinketHasCacheFlag(
  trinketType: TrinketType,
  cacheFlag: CacheFlag,
): boolean {
  const itemConfigItem = itemConfig.GetTrinket(trinketType);
  if (itemConfigItem === undefined) {
    return false;
  }

  return hasFlag(itemConfigItem.CacheFlags, cacheFlag);
}
