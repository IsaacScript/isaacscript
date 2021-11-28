import { CARD_DESCRIPTION_MAP } from "../maps/cardDescriptionMap";
import { CARD_NAME_MAP } from "../maps/cardNameMap";
import {
  CARDS,
  CARD_SET,
  POCKET_ITEM_OBJECT_SET,
  RUNES,
  RUNE_SET,
} from "../sets/cards";
import { arrayRemove, getRandomArrayElement } from "./array";

/**
 * This is a helper function to get a card name from a Card.
 *
 * Example:
 * ```
 * const card = Card.CARD_FOOL;
 * const cardName = getCardName(card); // cardName is "0 - The Fool"
 * ```
 */
export function getCardDescription(card: Card | int): string {
  const itemConfig = Isaac.GetItemConfig();
  const defaultDescription = "Unknown";

  if (type(card) !== "number") {
    return defaultDescription;
  }

  // "ItemConfigCard.Description" is bugged with vanilla cards on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const cardDescription = CARD_DESCRIPTION_MAP.get(card);
  if (cardDescription !== undefined) {
    return cardDescription;
  }

  const itemConfigCard = itemConfig.GetCard(card);
  if (itemConfigCard === undefined) {
    return defaultDescription;
  }

  return itemConfigCard.Description;
}

/**
 * This is a helper function to get a card name from a Card.
 *
 * Example:
 * ```
 * const card = Card.CARD_FOOL;
 * const cardName = getCardName(card); // cardName is "0 - The Fool"
 * ```
 */
export function getCardName(card: Card | int): string {
  const itemConfig = Isaac.GetItemConfig();
  const defaultName = "Unknown";

  if (type(card) !== "number") {
    return defaultName;
  }

  // "ItemConfigCard.Name" is bugged with vanilla cards on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const cardName = CARD_NAME_MAP.get(card);
  if (cardName !== undefined) {
    return cardName;
  }

  const itemConfigCard = itemConfig.GetCard(card);
  if (itemConfigCard === undefined) {
    return defaultName;
  }

  return itemConfigCard.Name;
}

/**
 * Has an equal chance of returning any card (e.g. Fool, Reverse Fool, Wild Card, etc.). This will
 * not return any runes or objects like Dice Shard.
 *
 * @param seed Optional. The seed with which to select the random card. `Random()` by default.
 * @param exceptions Optional. An array of cards to not select.
 */
export function getRandomCard(seed = Random(), exceptions: Card[] = []): Card {
  const cardsWithoutExceptions = arrayRemove(CARDS, ...exceptions);
  return getRandomArrayElement(cardsWithoutExceptions, seed);
}

/**
 * Has an equal chance of returning any rune (e.g. Rune of Hagalaz, Blank Rune, Black Rune, Soul of
 * Isaac, etc.). This will never return a Rune Shard.
 *
 * @param seed Optional. The seed with which to select the random rune. `Random()` by default.
 * @param exceptions Optional. An array of runes to not select.
 */
export function getRandomRune(seed = Random(), exceptions: Card[] = []): Card {
  exceptions.push(Card.RUNE_SHARD);
  const runesWithoutExceptions = arrayRemove(RUNES, ...exceptions);
  return getRandomArrayElement(runesWithoutExceptions, seed);
}

/**
 * Returns true for entries in the Card enum that are not a rune and not an object (e.g. Fool,
 * Reverse Fool, Wild Card, etc.).
 */
export function isCard(card: Card): boolean {
  return CARD_SET.has(card);
}

/**
 * Returns true for entries in the Card enum that are an object (like Dice Shard).
 */
export function isPocketItemObject(card: Card): boolean {
  return POCKET_ITEM_OBJECT_SET.has(card);
}

/**
 * Returns true for entries in the Card enum that are a rune (e.g. Rune of Hagalaz, Blank Rune,
 * Black Rune, Rune Shard, Soul of Isaac, etc.).
 */
export function isRune(card: Card): boolean {
  return RUNE_SET.has(card);
}
