import {
  CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART,
  CHARACTERS_WITH_NO_RED_HEARTS,
  CHARACTERS_WITH_NO_SOUL_HEARTS,
} from "../constants";
import {
  CHARACTER_NAMES,
  DEFAULT_CHARACTER_NAME,
} from "../objects/characterNames";

/**
 * Helper function to determine if the provided character can have red heart containers. Returns
 * true for characters like Isaac, Magdalene, or Cain. Returns true for Keeper and Tainted Keeper,
 * even though coin containers are not technically the same as red heart containers. Returns false
 * for characters like Blue Baby. Returns false for The Lost and Tainted Lost.
 */
export function characterCanHaveRedHearts(
  character: PlayerType | int,
): boolean {
  return !CHARACTERS_WITH_NO_RED_HEARTS.has(character);
}

/**
 * Helper function to determine if the provided character can have soul hearts. Returns true for
 * characters like Isaac, Magdalene, or Cain. Returns false for characters like Bethany. Returns
 * false for The Lost and Tainted Lost.
 */
export function characterCanHaveSoulHearts(
  character: PlayerType | int,
): boolean {
  return !CHARACTERS_WITH_NO_SOUL_HEARTS.has(character);
}

/**
 * Normally, characters get a red heart container upon reaching a new floor with an eternal heart,
 * but some characters grant a black heart instead. Returns true for Dark Judas and Tainted Judas.
 * Otherwise, returns false.
 */
export function characterGetsBlackHeartFromEternalHeart(
  character: PlayerType | int,
): boolean {
  return CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART.has(character);
}

/**
 * Returns the maximum heart containers that the provided character can have. Normally, this is 12,
 * but with Keeper it is 3, and with Tainted Keeper it is 2. This does not account for Birthright or
 * Mother's Kiss; use the `getPlayerMaxHeartContainers` helper function for that.
 */
export function getCharacterMaxHeartContainers(
  character: PlayerType | int,
): int {
  // 14
  if (character === PlayerType.PLAYER_KEEPER) {
    return 3;
  }

  // 16
  if (character === PlayerType.PLAYER_THEFORGOTTEN) {
    return 6;
  }

  // 17
  if (character === PlayerType.PLAYER_THESOUL) {
    return 6;
  }

  // 33
  if (character === PlayerType.PLAYER_KEEPER_B) {
    return 2;
  }

  return 12;
}

/** Helper function to get the name of a character. Returns "unknown" for modded characters. */
export function getCharacterName(character: PlayerType | int): string {
  if (character >= PlayerType.NUM_PLAYER_TYPES) {
    return "unknown";
  }

  const characterName = CHARACTER_NAMES[character as PlayerType];
  return characterName === undefined ? DEFAULT_CHARACTER_NAME : characterName;
}
