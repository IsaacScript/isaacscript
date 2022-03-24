import { itemConfig } from "../cachedClasses";
import { CardType } from "../enums/CardType";
import {
  CARD_DESCRIPTIONS,
  DEFAULT_CARD_DESCRIPTION,
} from "../objects/cardDescriptions";
import { CARD_NAMES, DEFAULT_CARD_NAME } from "../objects/cardNames";
import { CARD_TYPES, DEFAULT_CARD_TYPE } from "../objects/cardTypes";
import { range } from "./math";
import { getRandomSeed } from "./rng";
import { addSetsToSet, getRandomSetElement } from "./set";
import { getEnumValues } from "./utils";

const CARD_TYPE_TO_CARDS_MAP: Map<CardType, Set<Card>> = new Map();

/**
 * Contains all of the entries in the `Card` enum with the following types:
 * - CardType.TAROT
 * - CardType.SUIT
 * - CardType.SPECIAL
 * - CardType.TAROT_REVERSE
 */
const CARD_SET: Set<Card> = new Set();

function initCardObjects() {
  const maxCards = getMaxCards();

  // The card type to cards map should be valid for every card type,
  // so we initialize it with empty sets
  for (const cardType of getEnumValues(CardType)) {
    CARD_TYPE_TO_CARDS_MAP.set(cardType, new Set<Card>());
  }

  for (const card of range(1, maxCards)) {
    const cardType = getCardType(card);
    const cardTypeSet = CARD_TYPE_TO_CARDS_MAP.get(cardType);
    if (cardTypeSet === undefined) {
      error(`Failed to get the card set for card type: ${cardType}`);
    }
    cardTypeSet.add(card);
  }

  // i.e. everything except for CardType.RUNE, CardType.OBJECT, and CardType.MODDED
  const cards = getCardsOfType(
    CardType.TAROT,
    CardType.SUIT,
    CardType.SPECIAL,
    CardType.TAROT_REVERSE,
  );
  addSetsToSet(CARD_SET, cards);
}

/**
 * Helper function to get a card description from a Card enum value.
 *
 * Example:
 * ```ts
 * const card = Card.CARD_FOOL;
 * const cardDescription = getCardDescription(card); // cardDescription is "Where journey begins"
 * ```
 */
export function getCardDescription(card: Card | int): string {
  // "ItemConfigCard.Description" is bugged with vanilla cards on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const cardDescription = CARD_DESCRIPTIONS[card as Card];
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
 * Example:
 * ```ts
 * const card = Card.CARD_FOOL;
 * const cardName = getCardName(card); // cardName is "0 - The Fool"
 * ```
 */
export function getCardName(card: Card | int): string {
  // "ItemConfigCard.Name" is bugged with vanilla cards on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const cardName = CARD_NAMES[card as Card];
  if (cardName !== undefined && cardName !== DEFAULT_CARD_NAME) {
    return cardName;
  }

  const itemConfigCard = itemConfig.GetCard(card);
  if (itemConfigCard !== undefined) {
    return itemConfigCard.Name;
  }

  return DEFAULT_CARD_NAME;
}

export function getCardType(card: Card | int): CardType {
  const cardType = CARD_TYPES[card as Card];
  return cardType === undefined ? DEFAULT_CARD_TYPE : cardType;
}

/**
 * Helper function to get a set of cards matching the type. Also see the [[`CardType`]] enum.
 *
 * This function is variadic, meaning that you can you can specify N card types to get a set
 * containing cards that match any of the specified types.
 */
export function getCardsOfType(...cardTypes: CardType[]): Set<Card> {
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
 * Helper function to get the final card sub-type in the game.
 *
 * This cannot be reliably determined before run-time due to mods adding a variable amount of new
 * cards.
 */
export function getMaxCards(): int {
  return itemConfig.GetCards().Size - 1;
}

/**
 * Has an equal chance of returning any card (e.g. Fool, Reverse Fool, Wild Card, etc.).
 *
 * This will not return:
 * - any runes
 * - any objects like Dice Shard
 * - any modded cards.
 *
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 * `RNG.Next` method will be called. Default is `getRandomSeed()`.
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
 * `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of cards to not select.
 */
export function getRandomCardOfType(
  cardType: CardType,
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
 * `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of runes to not select.
 */
export function getRandomRune(
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: Card[] = [],
): Card {
  const runesSet = getCardsOfType(CardType.RUNE);
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
export function isCardType(card: Card, cardType: CardType): boolean {
  return cardType === getCardType(card);
}

/** Returns true for cards that have `CardType.MODDED`. */
export function isModdedCard(card: Card): boolean {
  return isCardType(card, CardType.MODDED);
}

/** Returns true for cards that have `CardType.OBJECT`. */
export function isPocketItemObject(card: Card): boolean {
  return isCardType(card, CardType.OBJECT);
}

/** Returns true for cards that have `CardType.TAROT_REVERSE`. */
export function isReverseTarotCard(card: Card): boolean {
  return isCardType(card, CardType.TAROT_REVERSE);
}

/** Returns true for cards that have `CardType.RUNE`. */
export function isRune(card: Card): boolean {
  return isCardType(card, CardType.RUNE);
}

/** Returns true for cards that have `CardType.SPECIAL`. */
export function isSpecialCard(card: Card): boolean {
  return isCardType(card, CardType.SPECIAL);
}

/** Returns true for cards that have `CardType.SUIT`. */
export function isSuitCard(card: Card): boolean {
  return isCardType(card, CardType.SUIT);
}

/** Returns true for cards that have `CardType.TAROT`. */
export function isTarotCard(card: Card): boolean {
  return isCardType(card, CardType.TAROT);
}
