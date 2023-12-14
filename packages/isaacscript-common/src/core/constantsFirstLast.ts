/**
 * Constants relating to the first and last value for various vanilla objects.
 *
 * @module
 */

import {
  CardType,
  Challenge,
  CollectibleType,
  PillColor,
  PillEffect,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { getEnumLength, getHighestEnumValue } from "../functions/enums";

// ------------
// Collectibles
// ------------

/** Equal to `CollectibleType.SAD_ONION` (1). */
export const FIRST_COLLECTIBLE_TYPE = CollectibleType.SAD_ONION;

/**
 * Calculated from the `CollectibleType` enum.
 *
 * Note that this cannot be calculated from the length of the enum, because collectible types are
 * not contiguous.
 */
export const LAST_VANILLA_COLLECTIBLE_TYPE =
  getHighestEnumValue(CollectibleType);

/** Calculated from the `CollectibleType` enum. (`CollectibleType.NULL` is not included.) */
export const NUM_VANILLA_COLLECTIBLE_TYPES = getEnumLength(CollectibleType) - 1;

// --------
// Trinkets
// --------

/** Equal to `TrinketType.SWALLOWED_PENNY` (1). */
export const FIRST_TRINKET_TYPE = TrinketType.SWALLOWED_PENNY;

/**
 * Calculated from the `TrinketType` enum.
 *
 * Note that this cannot be calculated from the length of the enum, because trinket types are not
 * contiguous.
 */
export const LAST_VANILLA_TRINKET_TYPE = getHighestEnumValue(TrinketType);

/** Calculated from the `TrinketType` enum. (`TrinketType.NULL` is not included.) */
export const NUM_VANILLA_TRINKET_TYPES = getEnumLength(TrinketType) - 1;

// -----
// Cards
// -----

/** Equal to `Card.FOOL` (1). */
export const FIRST_CARD_TYPE = CardType.FOOL;

/** Calculated from the `CardType` enum. */
export const LAST_VANILLA_CARD_TYPE = getHighestEnumValue(CardType);

/** Calculated from the `Card` enum. `Card.NULL` is not included. */
export const NUM_VANILLA_CARD_TYPES = getEnumLength(CardType) - 1;

// ------------
// Pill Effects
// ------------

/** Equal to `PillEffect.BAD_GAS` (0). */
export const FIRST_PILL_EFFECT = PillEffect.BAD_GAS;

/** Calculated from the `PillEffect` enum. */
export const LAST_VANILLA_PILL_EFFECT = getHighestEnumValue(PillEffect);

/**
 * Calculated from the `PillEffect` enum. (There is no `PillEffect.NULL` in the custom enum, so we
 * do not have to subtract one here.)
 */
export const NUM_VANILLA_PILL_EFFECTS = getEnumLength(PillEffect);

// -----------
// Pill Colors
// -----------

/** Equal to `PillColor.BLUE_BLUE` (1). */
export const FIRST_PILL_COLOR = PillColor.BLUE_BLUE;

/**
 * Equal to `PillColor.WHITE_YELLOW` (13).
 *
 * Note that `PillColor.GOLD` is technically higher, but that is not considered for the purposes of
 * this constant.
 */
export const LAST_NORMAL_PILL_COLOR = PillColor.WHITE_YELLOW;

/** Equal to `PillColor.HORSE_BLUE_BLUE` (2049). */
export const FIRST_HORSE_PILL_COLOR = PillColor.HORSE_BLUE_BLUE;

/**
 * Equal to `PillColor.HORSE_WHITE_YELLOW` (2061).
 *
 * Note that `PillColor.HORSE_GOLD` is technically higher, but that is not considered for the
 * purposes of this constant.
 */
export const LAST_HORSE_PILL_COLOR = PillColor.HORSE_WHITE_YELLOW;

/**
 * Calculated from the difference between the first pill color and the last pill color. This does
 * not include Gold Pills. In Repentance, this should be equal to 13.
 */
export const NUM_NORMAL_PILL_COLORS =
  LAST_NORMAL_PILL_COLOR - FIRST_PILL_COLOR + 1;

// -------
// Players
// -------

/** Equal to `PlayerType.ISAAC` (0). */
export const FIRST_CHARACTER = PlayerType.ISAAC;

// It is not possible to determine "LAST_CHARACTER", since there is no associated config.

/** Calculated from the `PlayerType` enum. */
export const LAST_VANILLA_CHARACTER = getHighestEnumValue(PlayerType);

// ----------
// Challenges
// ----------

/** Calculated from the `Challenge` enum. `Challenge.NULL` is not included. */
export const NUM_VANILLA_CHALLENGES = getEnumLength(Challenge) - 1;
