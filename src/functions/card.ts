import { getRandomInt } from "./random";

/** Has an equal chance of returning any value between 1 and `Card.NUM_CARDS - 1`. */
export function getRandomCard(seed = Random()): Card {
  return getRandomInt(1, Card.NUM_CARDS - 1, seed);
}

/** Returns true for entries in the Card enum that are not a rune or an object. */
export function isCard(card: Card): boolean {
  return isNotCardOrRune(card) && !isRune(card);
}

/** Returns true for entries in the Card enum that are not a card or a rune. (e.g. Dice Shard) */
export function isNotCardOrRune(card: Card): boolean {
  return (
    card === Card.CARD_DICE_SHARD ||
    card === Card.CARD_EMERGENCY_CONTACT ||
    card === Card.CARD_CRACKED_KEY
  );
}

/**
 * Returns true for entries in the Card enum that are a rune. (e.g. Rune of Hagalaz, Blank Rune,
 * Black Rune, Rune Shard, Soul of Isaac)
 */
export function isRune(card: Card): boolean {
  return (
    (card >= Card.RUNE_HAGALAZ && card <= Card.RUNE_BLACK) ||
    card === Card.RUNE_SHARD ||
    (card >= Card.CARD_SOUL_ISAAC && card <= Card.CARD_SOUL_JACOB)
  );
}
