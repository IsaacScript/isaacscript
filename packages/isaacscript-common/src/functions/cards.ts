import { CardType, ItemConfigCardType } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import {
  FIRST_CARD_TYPE,
  LAST_VANILLA_CARD_TYPE,
} from "../core/constantsFirstLast";
import {
  CARD_DESCRIPTIONS,
  DEFAULT_CARD_DESCRIPTION,
} from "../objects/cardDescriptions";
import { CARD_NAMES, DEFAULT_CARD_NAME } from "../objects/cardNames";
import {
  CARD_TYPE_TO_ITEM_CONFIG_CARD_TYPE,
  DEFAULT_CARD_TYPE,
} from "../objects/cardTypeToItemConfigCardType";
import { getEnumValues } from "./enums";
import { getRandomSeed } from "./rng";
import { addSetsToSet, getRandomSetElement } from "./set";
import { irange } from "./utils";

const ITEM_CONFIG_CARD_TYPE_TO_CARD_TYPE_MAP = new Map<
  ItemConfigCardType,
  Set<CardType>
>();

/**
 * Contains all of the entries in the `CardType` enum with the following types:
 * - ItemConfigCardType.TAROT
 * - ItemConfigCardType.SUIT
 * - ItemConfigCardType.SPECIAL
 * - ItemConfigCardType.TAROT_REVERSE
 */
const CARD_SET = new Set<CardType>();

function lazyInitCardMapsSets() {
  // The card type to cards map should be valid for every card type, so we initialize it with empty
  // sets.
  for (const cardType of getEnumValues(ItemConfigCardType)) {
    ITEM_CONFIG_CARD_TYPE_TO_CARD_TYPE_MAP.set(cardType, new Set<CardType>());
  }

  for (const card of getVanillaCardTypes()) {
    const itemConfigCardType = getItemConfigCardType(card);
    const cardTypeSet =
      ITEM_CONFIG_CARD_TYPE_TO_CARD_TYPE_MAP.get(itemConfigCardType);
    if (cardTypeSet === undefined) {
      error(
        `Failed to get the card set for item config card type: ${itemConfigCardType}`,
      );
    }
    cardTypeSet.add(card);
  }

  // i.e. everything except for:
  // - ItemConfigCardType.RUNE
  // - ItemConfigCardType.SPECIAL_OBJECT
  // - ItemConfigCardType.MODDED
  const cards = getCardTypesOfType(
    ItemConfigCardType.TAROT,
    ItemConfigCardType.SUIT,
    ItemConfigCardType.SPECIAL,
    ItemConfigCardType.TAROT_REVERSE,
  );
  addSetsToSet(CARD_SET, cards);
}

/**
 * Helper function to get a card description from a Card enum value.
 *
 * For example, `getCardDescription(card)` returns "Where journey begins".
 */
export function getCardDescription(cardType: CardType): string {
  // "ItemConfigCard.Description" is bugged with vanilla cards on patch v1.7.6, so we use a
  // hard-coded map as a workaround.
  const cardDescription = CARD_DESCRIPTIONS[cardType];
  // Handle modded cards.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (cardDescription !== undefined) {
    return cardDescription;
  }

  const itemConfigCard = itemConfig.GetCard(cardType);
  if (itemConfigCard !== undefined) {
    return itemConfigCard.Description;
  }

  return DEFAULT_CARD_DESCRIPTION;
}

/**
 * Helper function to get a card name from a Card.
 *
 * For example, `getCardName(Card.FOOL)` would return "0 - The Fool".
 */
export function getCardName(cardType: CardType): string {
  // "ItemConfigCard.Name" is bugged with vanilla cards on patch v1.7.6, so we use a hard-coded map
  // as a workaround.
  const cardName = CARD_NAMES[cardType];
  // Handle modded cards.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (cardName !== undefined) {
    return cardName;
  }

  const itemConfigCard = itemConfig.GetCard(cardType);
  if (itemConfigCard !== undefined) {
    return itemConfigCard.Name;
  }

  return DEFAULT_CARD_NAME;
}

/**
 * Helper function to get a set of card types matching the `ItemConfigCardType`.
 *
 * This function is variadic, meaning that you can you can specify N card types to get a set
 * containing cards that match any of the specified types.
 */
export function getCardTypesOfType(
  ...itemConfigCardTypes: ItemConfigCardType[]
): Set<CardType> {
  if (ITEM_CONFIG_CARD_TYPE_TO_CARD_TYPE_MAP.size === 0) {
    lazyInitCardMapsSets();
  }

  const matchingCardTypes = new Set<CardType>();
  for (const itemConfigCardType of itemConfigCardTypes) {
    const cardTypeSet =
      ITEM_CONFIG_CARD_TYPE_TO_CARD_TYPE_MAP.get(itemConfigCardType);
    if (cardTypeSet === undefined) {
      error(
        `Failed to get the card type set for item config type: ${itemConfigCardType}`,
      );
    }

    for (const cardType of cardTypeSet.values()) {
      matchingCardTypes.add(cardType);
    }
  }

  return matchingCardTypes;
}

export function getItemConfigCardType(cardType: CardType): ItemConfigCardType {
  const itemConfigCardType = CARD_TYPE_TO_ITEM_CONFIG_CARD_TYPE[cardType];

  // Handle modded cards.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return itemConfigCardType === undefined
    ? DEFAULT_CARD_TYPE
    : itemConfigCardType;
}

/**
 * Has an equal chance of returning any card (e.g. Fool, Reverse Fool, Wild Card, etc.).
 *
 * This will not return:
 * - any runes
 * - any objects like Dice Shard
 * - any modded cards (since there is not a way to distinguish between modded cards and modded
 *   runes/objects)
 *
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of cards to not select.
 */
export function getRandomCard(
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: CardType[] = [],
): CardType {
  return getRandomSetElement(CARD_SET, seedOrRNG, exceptions);
}

/**
 * @param itemConfigCardType The item config card type that represents the pool of cards to select
 *                           from.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of cards to not select.
 */
export function getRandomCardTypeOfType(
  itemConfigCardType: ItemConfigCardType,
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: CardType[] = [],
): CardType {
  const cardTypeSet = getCardTypesOfType(itemConfigCardType);
  return getRandomSetElement(cardTypeSet, seedOrRNG, exceptions);
}

/**
 * Has an equal chance of returning any rune (e.g. Rune of Hagalaz, Blank Rune, Black Rune, Soul of
 * Isaac, etc.). This will never return a Rune Shard.
 *
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of runes to not select.
 */
export function getRandomRune(
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: CardType[] = [],
): CardType {
  const runesSet = getCardTypesOfType(ItemConfigCardType.RUNE);
  runesSet.delete(CardType.RUNE_SHARD);
  return getRandomSetElement(runesSet, seedOrRNG, exceptions);
}

/** Helper function to get an array with every valid vanilla card sub-type. */
export function getVanillaCardTypes(): CardType[] {
  return irange(FIRST_CARD_TYPE, LAST_VANILLA_CARD_TYPE);
}

/**
 * Returns true for cards that have the following card type:
 * - CardType.TAROT
 * - CardType.SUIT
 * - CardType.SPECIAL
 * - CardType.TAROT_REVERSE
 */
export function isCard(cardType: CardType): boolean {
  return CARD_SET.has(cardType);
}

/** Returns whether or not the given card type matches the specified item config card type. */
export function isCardType(
  cardType: CardType,
  itemConfigCardType: ItemConfigCardType,
): boolean {
  return itemConfigCardType === getItemConfigCardType(cardType);
}

/** Returns true for any card or rune added by a mod. */
export function isModdedCardType(cardType: CardType): boolean {
  return !isVanillaCardType(cardType);
}

/** Returns true for cards that have `ItemConfigCardType.SPECIAL_OBJECT`. */
export function isPocketItemObject(cardType: CardType): boolean {
  return isCardType(cardType, ItemConfigCardType.SPECIAL_OBJECT);
}

/** Returns true for cards that have `ItemConfigCardType.TAROT_REVERSE`. */
export function isReverseTarotCard(cardType: CardType): boolean {
  return isCardType(cardType, ItemConfigCardType.TAROT_REVERSE);
}

/** Returns true for cards that have `CardType.RUNE`. */
export function isRune(cardType: CardType): boolean {
  return isCardType(cardType, ItemConfigCardType.RUNE);
}

/** Returns true for cards that have `CardType.SPECIAL`. */
export function isSpecialCard(cardType: CardType): boolean {
  return isCardType(cardType, ItemConfigCardType.SPECIAL);
}

/** Returns true for cards that have `CardType.SUIT`. */
export function isSuitCard(cardType: CardType): boolean {
  return isCardType(cardType, ItemConfigCardType.SUIT);
}

/** Returns true for cards that have `CardType.TAROT`. */
export function isTarotCard(cardType: CardType): boolean {
  return isCardType(cardType, ItemConfigCardType.TAROT);
}

/** Returns true for any vanilla card or rune. */
export function isVanillaCardType(cardType: CardType): boolean {
  return cardType <= LAST_VANILLA_CARD_TYPE;
}
