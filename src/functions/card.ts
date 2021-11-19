import { getRandomInt, nextSeed } from "./random";

/**
 * Has an equal chance of returning any card (e.g. Fool, Reverse Fool, Wild Card, etc.). This will
 * not return any runes or objects.
 */
export function getRandomCard(seed = Random()): Card {
  let card: Card;
  do {
    seed = nextSeed(seed);
    card = getRandomInt(1, Card.NUM_CARDS - 1);
  } while (!isCard(card));

  return card;
}

/**
 * Has an equal chance of returning any rune (e.g. Rune of Hagalaz, Blank Rune, Black Rune, Soul of
 * Isaac, etc.). This will never return a Rune Shard.
 */
export function getRandomRune(seed = Random()): Card {
  let card: Card;
  do {
    seed = nextSeed(seed);
    card = getRandomInt(1, Card.NUM_CARDS - 1);
  } while (!isRune(card) || card === Card.RUNE_SHARD);

  return card;
}

/**
 * Returns true for entries in the Card enum that are not a rune or an object (e.g. Fool, Reverse
 * Fool, Wild Card, etc.).
 */
export function isCard(card: Card): boolean {
  return isNotCardOrRune(card) && !isRune(card);
}

/**
 * Returns true for entries in the Card enum that are not a card and not a rune (like Dice Shard).
 */
export function isNotCardOrRune(card: Card): boolean {
  return (
    card === Card.CARD_DICE_SHARD ||
    card === Card.CARD_EMERGENCY_CONTACT ||
    card === Card.CARD_CRACKED_KEY
  );
}

/**
 * Returns true for entries in the Card enum that are a rune. (e.g. Rune of Hagalaz, Blank Rune,
 * Black Rune, Rune Shard, Soul of Isaac, etc.)
 */
export function isRune(card: Card): boolean {
  return (
    (card >= Card.RUNE_HAGALAZ && card <= Card.RUNE_BLACK) ||
    card === Card.RUNE_SHARD ||
    (card >= Card.CARD_SOUL_ISAAC && card <= Card.CARD_SOUL_JACOB)
  );
}
