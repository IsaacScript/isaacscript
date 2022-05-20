/* eslint-disable sort-exports/sort-exports */

import {
  Card,
  CollectibleType,
  PillColor,
  PillEffect,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { itemConfig } from "./cachedClasses";
import { getEnumLength, getLastEnumValue } from "./functions/enums";

/** Equal to `Card.FOOL`. */
export const FIRST_CARD = Card.FOOL;

/**
 * Will change depending on how many modded cards there are.
 *
 * Equal to `itemConfig.GetCards().Size - 1`. (We subtract one to account for `Card.NULL`.)
 */
export const NUM_CARDS = itemConfig.GetCards().Size - 1;

/**
 * Will change depending on how many modded cards there are.
 *
 * Equal to `itemConfig.GetCards().Size - 1`. (We subtract one to account for `Card.NULL`.)
 */
export const MAX_CARD = NUM_CARDS as Card;

/** Calculated from the `Card` enum. `Card.NULL` is not included. */
export const NUM_VANILLA_CARDS = getEnumLength(Card) - 1;

/** Calculated from the `Card` enum. */
export const MAX_VANILLA_CARD = getLastEnumValue(Card);

/** Equal to `CollectibleType.SAD_ONION`. */
export const FIRST_COLLECTIBLE_TYPE = CollectibleType.SAD_ONION;

// `NUM_COLLECTIBLE_TYPES` is not exported because we would have to iterate over all possible values
// and check `isValidCollectible`. The `getCollectiblesNum` helper function should be used instead.

/**
 * Will change depending on how many modded collectibles there are.
 *
 * Equal to `itemConfig.GetCollectibles().Size - 1`. (`Size` includes invalid collectibles. We
 * subtract one to account for `CollectibleType.NULL`.)
 */
export const MAX_COLLECTIBLE_TYPE = (itemConfig.GetCollectibles().Size -
  1) as CollectibleType;

/** Calculated from the `CollectibleType` enum. `CollectibleType.NULL` is not included. */
export const NUM_VANILLA_COLLECTIBLE_TYPES = getEnumLength(CollectibleType) - 1;

/**
 * Calculated from the `CollectibleType` enum.
 *
 * Note that this cannot be calculated from the length of the enum, because unlike all of the other
 * enums, the collectible types are not contiguous.
 */
export const MAX_VANILLA_COLLECTIBLE_TYPE = getLastEnumValue(CollectibleType);

/** Equal to `PillEffect.BAD_GAS`. */
export const FIRST_PILL_EFFECT = PillEffect.BAD_GAS;

/**
 * Will change depending on how many modded pill effects there are.
 *
 * Equal to `itemConfig.GetPillEffects().Size - 1`. (We subtract one to account for
 * `PillEffect.NULL`.)
 */
export const NUM_PILL_EFFECTS = itemConfig.GetPillEffects().Size - 1;

/**
 * Will change depending on how many modded pill effects there are.
 *
 * Equal to `itemConfig.GetPillEffects().Size - 1`. (We subtract one to account for
 * `PillEffect.NULL`.)
 */
export const MAX_PILL_EFFECT = NUM_PILL_EFFECTS as PillEffect;

/**
 * Calculated from the `PillEffect` enum.
 *
 * (There is no `PillEffect.NULL` in the custom enum, so we don't have to subtract one here.)
 */
export const NUM_VANILLA_PILL_EFFECTS = getEnumLength(PillEffect);

/** Calculated from the `PillEffect` enum. */
export const MAX_VANILLA_PILL_EFFECT = getLastEnumValue(PillEffect);

/** Equal to `TrinketType.SWALLOWED_PENNY`. */
export const FIRST_TRINKET_TYPE = TrinketType.SWALLOWED_PENNY;

/**
 * Will change depending on how many modded cards there are.
 *
 * Equal to `itemConfig.GetTrinkets().Size - 1`. (We subtract one to account for
 * `TrinketType.NULL`.)
 */
export const NUM_TRINKET_TYPES = itemConfig.GetTrinkets().Size - 1;

/**
 * Will change depending on how many modded cards there are.
 *
 * Equal to `itemConfig.GetTrinkets().Size - 1`. (We subtract one to account for
 * `TrinketType.NULL`.)
 */
export const MAX_TRINKET_TYPE = NUM_TRINKET_TYPES as TrinketType;

/** Calculated from the `TrinketType` enum. `TrinketType.NULL` is not included. */
export const NUM_VANILLA_TRINKET_TYPES = getEnumLength(TrinketType) - 1;

/** Calculated from the `TrinketType` enum. */
export const MAX_VANILLA_TRINKET_TYPE = getLastEnumValue(TrinketType);

/** Equal to `PlayerType.ISAAC`. */
export const FIRST_CHARACTER = PlayerType.ISAAC;

/** Calculated from the `PlayerType` enum. */
export const MAX_VANILLA_CHARACTER = getLastEnumValue(PlayerType);

// It is not possible to determine "MAX_PLAYER_TYPE", since there is no associated config.

/** Equal to `PillColor.BLUE_BLUE`. */
export const FIRST_PILL_COLOR = PillColor.BLUE_BLUE;

/**
 * Equal to `PillColor.WHITE_YELLOW`.
 *
 * Note that `PillColor.GOLD` is technically higher, but that is not considered for the purposes of
 * this constant.
 */
export const MAX_NORMAL_PILL_COLOR = PillColor.WHITE_YELLOW;

/** Equal to `PillColor.HORSE_BLUE_BLUE`. */
export const FIRST_HORSE_PILL_COLOR = PillColor.HORSE_BLUE_BLUE;

/**
 * Equal to `PillColor.HORSE_WHITE_YELLOW`.
 *
 * Note that `PillColor.HORSE_GOLD` is technically higher, but that is not considered for the
 * purposes of this constant.
 */
export const MAX_HORSE_PILL_COLOR = PillColor.HORSE_WHITE_YELLOW;
