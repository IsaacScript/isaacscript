import type { CacheFlag } from "isaac-typescript-definitions";
import { TrinketType } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import { BLIND_ITEM_PNG_PATH } from "../core/constants";
import { LAST_VANILLA_TRINKET_TYPE } from "../core/constantsFirstLast";
import { MysteriousPaperEffect } from "../enums/MysteriousPaperEffect";
import {
  DEFAULT_TRINKET_DESCRIPTION,
  TRINKET_DESCRIPTION_MAP,
} from "../maps/trinketDescriptionMap";
import {
  DEFAULT_TRINKET_NAME,
  TRINKET_TYPE_TO_NAME_MAP,
} from "../maps/trinketTypeToNameMap";
import { getEntityID } from "./entities";
import { getEnumLength } from "./enums";
import { hasFlag } from "./flag";
import { isTrinket } from "./pickupVariants";
import { clearSprite } from "./sprites";
import { asNumber } from "./types";

/**
 * Add this to a `TrinketType` to get the corresponding golden trinket type.
 *
 * Corresponds to the vanilla `PillColor.TRINKET_GOLDEN_FLAG` value.
 *
 * 1 << 15
 */
const GOLDEN_TRINKET_ADJUSTMENT = 32_768;

const NUM_MYSTERIOUS_PAPER_EFFECTS = getEnumLength(MysteriousPaperEffect);

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
 * Helper function to get the current effect that the Mysterious Paper trinket is providing to the
 * player. Returns undefined if the player does not have the Mysterious Paper trinket.
 *
 * The Mysterious Paper trinket has four different effects:
 *
 * - The Polaroid (collectible)
 * - The Negative (collectible)
 * - A Missing Page (trinket)
 * - Missing Poster (trinket)
 *
 * It rotates between these four effects on every frame. Note that Mysterious Paper will cause the
 * `EntityPlayer.HasCollectible` and `EntityPlayer.HasTrinket` methods to return true for the
 * respective items on the particular frame, with the exception of the Missing Poster. (The player
 * will never "have" the Missing Poster, even on the correct corresponding frame.)
 *
 * @param player The player to look at.
 * @param frameCount Optional. The frame count that corresponds to time the effect will be active.
 *                   Default is the current frame.
 */
export function getMysteriousPaperEffectForFrame(
  player: EntityPlayer,
  frameCount?: int,
): MysteriousPaperEffect | undefined {
  if (frameCount === undefined) {
    frameCount = player.FrameCount;
  }

  if (!player.HasTrinket(TrinketType.MYSTERIOUS_PAPER)) {
    return undefined;
  }

  return frameCount % NUM_MYSTERIOUS_PAPER_EFFECTS;
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

  const defaultAnimation = sprite.GetDefaultAnimation();
  sprite.Play(defaultAnimation, true);

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
 *                the sprite will be removed, making the trinket effectively invisible (except for
 *                the shadow underneath it).
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
    // We use `clearSpriteLayer` instead of `Sprite.Reset` to maintain parity with the
    // `setCollectibleSprite` function.
    clearSprite(sprite);
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
