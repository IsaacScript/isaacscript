/**
 * Constants relating to collections for various vanilla objects.
 *
 * @module
 */

import type {
  CardType,
  CollectibleType,
  PillEffect,
  TrinketType,
} from "isaac-typescript-definitions";
import {
  asCardType,
  asCollectibleType,
  asPillEffect,
  asTrinketType,
} from "../functions/types";
import { iRange } from "../functions/utils";
import { ReadonlySet } from "../types/ReadonlySet";
import { itemConfig } from "./cachedClasses";
import {
  FIRST_CARD_TYPE,
  FIRST_COLLECTIBLE_TYPE,
  FIRST_PILL_EFFECT,
  FIRST_TRINKET_TYPE,
  LAST_VANILLA_CARD_TYPE,
  LAST_VANILLA_COLLECTIBLE_TYPE,
  LAST_VANILLA_PILL_EFFECT,
  LAST_VANILLA_TRINKET_TYPE,
} from "./constantsFirstLast";

// ------------
// Collectibles
// ------------

/**
 * An array that represents the range from the first vanilla collectible type to the last vanilla
 * collectible type. This will include integers that do not represent any valid collectible types.
 *
 * This function is only useful when building collectible type objects. For most purposes, you
 * should use the `VANILLA_COLLECTIBLE_TYPES` or `VANILLA_COLLECTIBLE_TYPES_SET` constants instead.
 */
export const VANILLA_COLLECTIBLE_TYPE_RANGE: readonly int[] = iRange(
  FIRST_COLLECTIBLE_TYPE,
  LAST_VANILLA_COLLECTIBLE_TYPE,
);

/**
 * An array that contains every valid vanilla collectible type, as verified by the
 * `ItemConfig.GetCollectible` method. Vanilla collectible types are not contiguous, so every valid
 * must be verified. (There are several gaps, e.g. 666.)
 *
 * If you need to do O(1) lookups, use the `VANILLA_COLLECTIBLE_TYPES_SET` constant instead.
 */
// eslint-disable-next-line complete/strict-enums
export const VANILLA_COLLECTIBLE_TYPES: readonly CollectibleType[] =
  VANILLA_COLLECTIBLE_TYPE_RANGE.filter((potentialCollectibleType) => {
    const collectibleType = asCollectibleType(potentialCollectibleType);
    const itemConfigItem = itemConfig.GetCollectible(collectibleType);
    return itemConfigItem !== undefined;
  });

/**
 * A set that contains every valid vanilla collectible type, as verified by the
 * `ItemConfig.GetCollectible` method. Vanilla collectible types are not contiguous, so every valid
 * must be verified. (There are several gaps, e.g. 666.)
 */
export const VANILLA_COLLECTIBLE_TYPES_SET = new ReadonlySet(
  VANILLA_COLLECTIBLE_TYPES,
);

// --------
// Trinkets
// --------

/**
 * An array that represents the range from the first vanilla trinket type to the last vanilla
 * trinket type. This will include integers that do not represent any valid trinket types.
 *
 * This function is only useful when building trinket type objects. For most purposes, you should
 * use the `VANILLA_TRINKET_TYPES` or `VANILLA_TRINKET_TYPES_SET` constants instead.
 */
export const VANILLA_TRINKET_TYPE_RANGE: readonly int[] = iRange(
  FIRST_TRINKET_TYPE,
  LAST_VANILLA_TRINKET_TYPE,
);

/**
 * An array that contains every valid vanilla trinket type, as verified by the
 * `ItemConfig.GetTrinket` method. Vanilla trinket types are not contiguous, so every valid must be
 * verified. (The only gap is 47 for `POLAROID_OBSOLETE`.)
 *
 * If you need to do O(1) lookups, use the `VANILLA_TRINKET_TYPES_SET` constant instead.
 */
// eslint-disable-next-line complete/strict-enums
export const VANILLA_TRINKET_TYPES: readonly TrinketType[] =
  VANILLA_TRINKET_TYPE_RANGE.filter((potentialTrinketType) => {
    const trinketType = asTrinketType(potentialTrinketType);
    const itemConfigTrinket = itemConfig.GetTrinket(trinketType);
    return itemConfigTrinket !== undefined;
  });

/**
 * A set that contains every valid vanilla trinket type, as verified by the `ItemConfig.GetTrinket`
 * method. Vanilla trinket types are not contiguous, so every valid must be verified. (The only gap
 * is 47 for `POLAROID_OBSOLETE`.)
 */
export const VANILLA_TRINKET_TYPES_SET = new ReadonlySet(VANILLA_TRINKET_TYPES);

// ----------
// Card Types
// ----------

/**
 * An array that represents the range from the first vanilla card type to the last vanilla card
 * type.
 *
 * This function is only useful when building card type objects. For most purposes, you should use
 * the `VANILLA_CARD_TYPES` or `VANILLA_CARD_TYPES_SET` constants instead.
 */
export const VANILLA_CARD_TYPE_RANGE: readonly int[] = iRange(
  FIRST_CARD_TYPE,
  LAST_VANILLA_CARD_TYPE,
);

/**
 * An array that contains every valid vanilla card type, as verified by the `ItemConfig.GetCard`
 * method. Vanilla card types are contiguous, but we validate every entry to double check.
 *
 * If you need to do O(1) lookups, use the `VANILLA_CARD_TYPES_SET` constant instead.
 */
// eslint-disable-next-line complete/strict-enums
export const VANILLA_CARD_TYPES: readonly CardType[] =
  VANILLA_CARD_TYPE_RANGE.filter((potentialCardType) => {
    const cardType = asCardType(potentialCardType);
    const itemConfigCard = itemConfig.GetCard(cardType);
    return itemConfigCard !== undefined;
  });

/**
 * A set that contains every valid vanilla card type, as verified by the `ItemConfig.GetCard`
 * method. Vanilla card types are contiguous, but we validate every entry to double check.
 */
export const VANILLA_CARD_TYPES_SET = new ReadonlySet(VANILLA_CARD_TYPES);

// ------------
// Pill Effects
// ------------

/**
 * An array that represents the range from the first vanilla pill effect to the last vanilla pill
 * effect.
 *
 * This function is only useful when building pill effect objects. For most purposes, you should use
 * the `VANILLA_PILL_EFFECTS` or `VANILLA_PILL_EFFECTS_SET` constants instead.
 */
export const VANILLA_PILL_EFFECT_RANGE: readonly int[] = iRange(
  FIRST_PILL_EFFECT,
  LAST_VANILLA_PILL_EFFECT,
);

/**
 * An array that contains every valid vanilla pill effect, as verified by the
 * `ItemConfig.GetPillEffect` method. Vanilla pill effects are contiguous, but we validate every
 * entry to double check.
 *
 * If you need to do O(1) lookups, use the `VANILLA_PILL_EFFECT_SET` constant instead.
 */
// eslint-disable-next-line complete/strict-enums
export const VANILLA_PILL_EFFECTS: readonly PillEffect[] =
  VANILLA_PILL_EFFECT_RANGE.filter((potentialPillEffect) => {
    const pillEffect = asPillEffect(potentialPillEffect);
    const itemConfigPillEffect = itemConfig.GetPillEffect(pillEffect);
    return itemConfigPillEffect !== undefined;
  });

/**
 * A set that contains every valid vanilla pill effect, as verified by the
 * `ItemConfig.GetPillEffect` method. Vanilla pill effects are contiguous, but we validate every
 * entry to double check.
 */
export const VANILLA_PILL_EFFECTS_SET = new ReadonlySet(VANILLA_PILL_EFFECTS);
