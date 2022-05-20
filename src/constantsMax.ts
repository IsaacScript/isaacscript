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

// We subtract one to account for `Card.NULL`.
export const FIRST_CARD = Card.FOOL;
export const NUM_CARDS = itemConfig.GetCards().Size - 1;
export const MAX_CARD = NUM_CARDS as Card;
export const NUM_VANILLA_CARDS = getEnumLength(Card) - 1;
export const MAX_VANILLA_CARD = NUM_VANILLA_CARDS as Card;

// We subtract one to account for `CollectibleType.NULL`.
export const FIRST_COLLECTIBLE_TYPE = CollectibleType.SAD_ONION;
export const NUM_COLLECTIBLE_TYPES = itemConfig.GetCollectibles().Size - 1;
export const MAX_COLLECTIBLE_TYPE = NUM_COLLECTIBLE_TYPES as CollectibleType;
// To get the number of vanilla collectibles, we cannot get the length of the `CollectibleType`
// enum, because unlike all of the other enums, the values are not contiguous.
export const NUM_VANILLA_COLLECTIBLE_TYPES = getLastEnumValue(CollectibleType);
export const MAX_VANILLA_COLLECTIBLE_TYPE =
  NUM_VANILLA_COLLECTIBLE_TYPES as CollectibleType;

// We subtract one to account for `PillEffect.NULL`.
export const FIRST_PILL_EFFECT = PillEffect.BAD_GAS;
export const NUM_PILL_EFFECTS = itemConfig.GetPillEffects().Size - 1;
export const MAX_PILL_EFFECT = NUM_PILL_EFFECTS as PillEffect;
// There is no `PillEffect.NULL` in the custom enum, so we don't have to subtract one here.
export const NUM_VANILLA_PILL_EFFECTS = getEnumLength(PillEffect);
export const MAX_VANILLA_PILL_EFFECT = NUM_VANILLA_PILL_EFFECTS as PillEffect;

// We subtract one to account for `TrinketType.NULL`.
export const FIRST_TRINKET_TYPE = TrinketType.SWALLOWED_PENNY;
export const NUM_TRINKET_TYPES = itemConfig.GetTrinkets().Size - 1;
export const MAX_TRINKET_TYPE = NUM_TRINKET_TYPES as TrinketType;
export const NUM_VANILLA_TRINKET_TYPES = getEnumLength(TrinketType) - 1;
export const MAX_VANILLA_TRINKET_TYPE =
  NUM_VANILLA_TRINKET_TYPES as TrinketType;

export const FIRST_CHARACTER = PlayerType.ISAAC;
export const MAX_VANILLA_CHARACTER = getLastEnumValue(PlayerType);
// It is not possible to determine "MAX_PLAYER_TYPE", since there is no associated config.

export const FIRST_PILL_COLOR = PillColor.BLUE_BLUE;
export const MAX_NORMAL_PILL_COLOR = PillColor.WHITE_YELLOW;
