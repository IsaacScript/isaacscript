import { itemConfig } from "../cachedClasses";
import { TRINKET_GOLDEN_FLAG } from "../constants";
import {
  DEFAULT_TRINKET_DESCRIPTION,
  TRINKET_DESCRIPTION_MAP,
} from "../maps/trinketDescriptionMap";
import { DEFAULT_TRINKET_NAME, TRINKET_NAME_MAP } from "../maps/trinketNameMap";
import { hasFlag } from "./flag";
import { getPickups } from "./pickups";
import { useActiveItemTemp } from "./player";
import { clearSprite } from "./sprite";
import { giveTrinketsBack, temporarilyRemoveTrinkets } from "./trinketGive";
import { repeat } from "./utils";

const TRINKET_SPRITE_LAYER = 0;

/**
 * Helper function to get the final trinket type in the game. This cannot be reliably determined
 * before run-time due to mods adding a variable amount of new trinkets.
 */
export function getMaxTrinketType(): int {
  return itemConfig.GetTrinkets().Size - 1;
}

/**
 * Returns the slot number corresponding to where a trinket can be safely inserted.
 *
 * Example:
 * ```
 * const player = Isaac.GetPlayer();
 * const trinketSlot = getOpenTrinketSlotNum(player);
 * if (trinketSlot !== undefined) {
 *   // They have one or more open trinket slots
 *   player.AddTrinket(TrinketType.TRINKET_SWALLOWED_PENNY);
 * }
 * ```
 */
export function getOpenTrinketSlot(player: EntityPlayer): int | undefined {
  const maxTrinkets = player.GetMaxTrinkets();
  const trinket0 = player.GetTrinket(TrinketSlot.SLOT_1);
  const trinket1 = player.GetTrinket(TrinketSlot.SLOT_2);

  if (maxTrinkets === 1) {
    return trinket0 === TrinketType.TRINKET_NULL ? 0 : undefined;
  }

  if (maxTrinkets === 2) {
    if (trinket0 === TrinketType.TRINKET_NULL) {
      return 0;
    }

    return trinket1 === TrinketType.TRINKET_NULL ? 1 : undefined;
  }

  return error(
    `The player has an unknown number of trinket slots: ${maxTrinkets}`,
  );
}

/** Helper function to get all of the trinket entities in the room. */
export function getTrinkets(matchingSubType = -1): EntityPickup[] {
  return getPickups(PickupVariant.PICKUP_TRINKET, matchingSubType);
}

/**
 * Helper function to get the in-game description for a trinket. Returns "Unknown" if the provided
 * trinket type was not valid.
 */
export function getTrinketDescription(trinketType: TrinketType | int): string {
  // "ItemConfigItem.Description" is bugged with vanilla items on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const trinketDescription = TRINKET_DESCRIPTION_MAP.get(trinketType);
  if (trinketDescription !== undefined) {
    return trinketDescription;
  }

  const itemConfigItem = itemConfig.GetCollectible(trinketType);
  if (itemConfigItem !== undefined) {
    return itemConfigItem.Description;
  }

  return DEFAULT_TRINKET_DESCRIPTION;
}

/**
 * Helper function to get the name of a trinket. Returns "Unknown" if the provided trinket type is
 * not valid.
 *
 * Example:
 * ```
 * const trinketType = TrinketType.TRINKET_SWALLOWED_PENNY;
 * const trinketName = getTrinketName(trinketType); // trinketName is "Swallowed Penny"
 * ```
 */
export function getTrinketName(trinketType: TrinketType | int): string {
  // "ItemConfigItem.Name" is bugged with vanilla items on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const trinketName = TRINKET_NAME_MAP.get(trinketType);
  if (trinketName !== undefined) {
    return trinketName;
  }

  const itemConfigItem = itemConfig.GetCollectible(trinketType);
  if (itemConfigItem !== undefined) {
    return itemConfigItem.Name;
  }

  return DEFAULT_TRINKET_NAME;
}

/**
 * Returns whether or not the player can hold an additional trinket, beyond what they are currently
 * carrying. This takes into account items that modify the max number of trinkets, like Mom's Purse.
 *
 * If the player is the Tainted Soul, this always returns false, since that character cannot pick up
 * items. (Only Tainted Forgotten can pick up items.)
 */
export function hasOpenTrinketSlot(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  if (character === PlayerType.PLAYER_THESOUL_B) {
    return false;
  }

  const openTrinketSlot = getOpenTrinketSlot(player);
  return openTrinketSlot !== undefined;
}

export function isGoldenTrinket(trinketType: TrinketType | int): boolean {
  // The first golden trinket is Golden Swallowed Penny (32769)
  return trinketType > TRINKET_GOLDEN_FLAG;
}

/**
 * Helper function to change the sprite of a trinket entity.
 *
 * For more information about removing the trinket sprite, see the documentation for the
 * "clearSprite" helper function.
 *
 * @param trinket The trinket whose sprite you want to modify.
 * @param pngPath Equal to either the spritesheet path to load (e.g.
 * "gfx/items/collectibles/collectibles_001_thesadonion.png") or undefined. If undefined, the sprite
 * will be removed, making it appear like the collectible has already been taken by the player.
 */
export function setTrinketSprite(
  trinket: EntityPickup,
  pngPath: string | undefined,
): void {
  if (trinket.Variant !== PickupVariant.PICKUP_TRINKET) {
    error(
      `You cannot set a trinket sprite for pickups of variant: ${trinket.Variant}`,
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

/**
 * Helper function to smelt a trinket. Before smelting, this function will automatically remove the
 * trinkets that the player is holding, if any, and then give them back after the new trinket is
 * smelted.
 *
 * @param player The player to smelt the trinkets to.
 * @param trinketType The trinket type to smelt.
 * @param numTrinkets Optional. If specified, will smelt the given number of trinkets. Use this to
 * avoid calling this function multiple times. Default is 1.
 */
export function smeltTrinket(
  player: EntityPlayer,
  trinketType: TrinketType | int,
  numTrinkets = 1,
): void {
  const trinketSituation = temporarilyRemoveTrinkets(player);

  repeat(numTrinkets, () => {
    player.AddTrinket(trinketType);
    useActiveItemTemp(player, CollectibleType.COLLECTIBLE_SMELTER);
  });

  giveTrinketsBack(player, trinketSituation);
}

export function trinketHasCacheFlag(
  trinketType: TrinketType | int,
  cacheFlag: CacheFlag,
): boolean {
  const itemConfigItem = itemConfig.GetTrinket(trinketType);
  if (itemConfigItem === undefined) {
    return false;
  }

  return hasFlag(itemConfigItem.CacheFlags, cacheFlag);
}
