import { Card, ItemConfigCardType } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import { MAX_CARD } from "../constantsMax";
import {
  CARD_DESCRIPTIONS,
  DEFAULT_CARD_DESCRIPTION,
} from "../objects/cardDescriptions";
import { CARD_NAMES, DEFAULT_CARD_NAME } from "../objects/cardNames";
import { CARD_TYPES, DEFAULT_CARD_TYPE } from "../objects/cardTypes";
import { getEnumValues } from "./enums";
import { getRandomSeed } from "./rng";
import { addSetsToSet, getRandomSetElement } from "./set";
import { irange } from "./utils";

const CARD_TYPE_TO_CARDS_MAP: Map<ItemConfigCardType, Set<Card>> = new Map();

/**
 * Contains all of the entries in the `Card` enum with the following types:
 * - ItemConfigCardType.TAROT
 * - ItemConfigCardType.SUIT
 * - ItemConfigCardType.SPECIAL
 * - ItemConfigCardType.TAROT_REVERSE
 */
const CARD_SET: Set<Card> = new Set();

function initCardObjects() {
  // The card type to cards map should be valid for every card type, so we initialize it with empty
  // sets.
  for (const cardType of getEnumValues(ItemConfigCardType)) {
    CARD_TYPE_TO_CARDS_MAP.set(cardType, new Set<Card>());
  }

  for (const card of irange(1, MAX_CARD)) {
    const cardType = getCardType(card);
    const cardTypeSet = CARD_TYPE_TO_CARDS_MAP.get(cardType);
    if (cardTypeSet === undefined) {
      error(`Failed to get the card set for card type: ${cardType}`);
    }
    cardTypeSet.add(card);
  }

  // i.e. everything except for:
  // - ItemConfigCardType.RUNE
  // - ItemConfigCardType.SPECIAL_OBJECT
  // - ItemConfigCardType.MODDED
  const cards = getCardsOfType(
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
 * For example:
 *
 * ```ts
 * const card = Card.FOOL;
 * const cardDescription = getCardDescription(card); // cardDescription is "Where journey begins"
 * ```
 */
export function getCardDescription(card: Card): string {
  // "ItemConfigCard.Description" is bugged with vanilla cards on patch v1.7.6, so we use a
  // hard-coded map as a workaround.
  const cardDescription = CARD_DESCRIPTIONS[card];
  if (cardDescription !== undefined) {
    return cardDescription;
  }

  const itemConfigCard = itemConfig.GetCard(card);
  if (itemConfigCard !== undefined) {
    return itemConfigCard.Description;
  }

  return DEFAULT_CARD_DESCRIPTION;
}

/**
 * Helper function to get a card name from a Card.
 *
 * For example:
 *
 * ```ts
 * const card = Card.FOOL;
 * const cardName = getCardName(card); // cardName is "0 - The Fool"
 * ```
 */
export function getCardName(card: Card): string {
  // "ItemConfigCard.Name" is bugged with vanilla cards on patch v1.7.6, so we use a hard-coded map
  // as a workaround.
  const cardName = CARD_NAMES[card];
  if (cardName !== undefined && cardName !== DEFAULT_CARD_NAME) {
    return cardName;
  }

  const itemConfigCard = itemConfig.GetCard(card);
  if (itemConfigCard !== undefined) {
    return itemConfigCard.Name;
  }

  return DEFAULT_CARD_NAME;
}

export function getCardType(card: Card): ItemConfigCardType {
  const cardType = CARD_TYPES[card];
  return cardType === undefined ? DEFAULT_CARD_TYPE : cardType;
}

/**
 * Helper function to get a set of cards matching the type. Also see the [[`CardType`]] enum.
 *
 * This function is variadic, meaning that you can you can specify N card types to get a set
 * containing cards that match any of the specified types.
 */
export function getCardsOfType(...cardTypes: ItemConfigCardType[]): Set<Card> {
  if (CARD_TYPE_TO_CARDS_MAP.size === 0) {
    initCardObjects();
  }

  const matchingCards = new Set<Card>();
  for (const cardType of cardTypes) {
    const cardSet = CARD_TYPE_TO_CARDS_MAP.get(cardType);
    if (cardSet === undefined) {
      error(`Failed to get the cards for type: ${cardType}`);
    }

    for (const card of cardSet.values()) {
      matchingCards.add(card);
    }
  }

  return matchingCards;
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
  exceptions: Card[] = [],
): Card {
  return getRandomSetElement(CARD_SET, seedOrRNG, exceptions);
}

/**
 * @param cardType The card type that represents the pool of cards to select from.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of cards to not select.
 */
export function getRandomCardOfType(
  cardType: ItemConfigCardType,
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: Card[] = [],
): Card {
  const cardSet = getCardsOfType(cardType);
  return getRandomSetElement(cardSet, seedOrRNG, exceptions);
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
  exceptions: Card[] = [],
): Card {
  const runesSet = getCardsOfType(ItemConfigCardType.RUNE);
  runesSet.delete(Card.RUNE_SHARD);
  return getRandomSetElement(runesSet, seedOrRNG, exceptions);
}

/**
 * Returns true for cards that have the following card type:
 * - CardType.TAROT
 * - CardType.SUIT
 * - CardType.SPECIAL
 * - CardType.TAROT_REVERSE
 */
export function isCard(card: Card): boolean {
  return CARD_SET.has(card);
}

/** Returns whether or not the given card matches the specified card type. */
export function isCardType(card: Card, cardType: ItemConfigCardType): boolean {
  return cardType === getCardType(card);
}

/** Returns true for cards that have `CardType.MODDED`. */
export function isModdedCard(card: Card): boolean {
  return isCardType(card, ItemConfigCardType.MODDED);
}

/** Returns true for cards that have `CardType.SPECIAL_OBJECT`. */
export function isPocketItemObject(card: Card): boolean {
  return isCardType(card, ItemConfigCardType.SPECIAL_OBJECT);
}

/** Returns true for cards that have `CardType.TAROT_REVERSE`. */
export function isReverseTarotCard(card: Card): boolean {
  return isCardType(card, ItemConfigCardType.TAROT_REVERSE);
}

/** Returns true for cards that have `CardType.RUNE`. */
export function isRune(card: Card): boolean {
  return isCardType(card, ItemConfigCardType.RUNE);
}

/** Returns true for cards that have `CardType.SPECIAL`. */
export function isSpecialCard(card: Card): boolean {
  return isCardType(card, ItemConfigCardType.SPECIAL);
}

/** Returns true for cards that have `CardType.SUIT`. */
export function isSuitCard(card: Card): boolean {
  return isCardType(card, ItemConfigCardType.SUIT);
}

/** Returns true for cards that have `CardType.TAROT`. */
export function isTarotCard(card: Card): boolean {
  return isCardType(card, ItemConfigCardType.TAROT);
}
