import { PlayerType } from "isaac-typescript-definitions";
import { MAX_VANILLA_CHARACTER } from "../constants";
import {
  CHARACTER_NAMES,
  DEFAULT_CHARACTER_NAME,
} from "../objects/characterNames";
import { CHARACTERS_THAT_START_WITH_AN_ACTIVE_ITEM_SET } from "../sets/charactersThatStartWithAnActiveItemSet";
import { CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART_SET } from "../sets/charactersWithBlackHeartFromEternalHeartSet";
import { CHARACTERS_WITH_FREE_DEVIL_DEALS_SET } from "../sets/charactersWithFreeDevilDealsSet";
import { CHARACTERS_WITH_NO_RED_HEARTS_SET } from "../sets/charactersWithNoRedHeartsSet";
import { CHARACTERS_WITH_NO_SOUL_HEARTS_SET } from "../sets/charactersWithNoSoulHeartsSet";
import { LOST_STYLE_CHARACTERS_SET } from "../sets/lostStyleCharactersSet";

/**
 * Helper function to determine if the given character can have red heart containers. Returns true
 * for characters like Isaac, Magdalene, or Cain. Returns true for Keeper and Tainted Keeper, even
 * though coin containers are not technically the same as red heart containers. Returns false for
 * characters like Blue Baby. Returns false for The Lost and Tainted Lost.
 */
export function characterCanHaveRedHearts(character: PlayerType): boolean {
  return !CHARACTERS_WITH_NO_RED_HEARTS_SET.has(character);
}

/**
 * Helper function to determine if the given character can have soul hearts. Returns true for
 * characters like Isaac, Magdalene, or Cain. Returns false for characters like Bethany. Returns
 * false for The Lost and Tainted Lost.
 */
export function characterCanHaveSoulHearts(character: PlayerType): boolean {
  return !CHARACTERS_WITH_NO_SOUL_HEARTS_SET.has(character);
}

/**
 * Helper function for determining whether the given character can take free Devil Deals. (e.g. The
 * Lost, Tainted Lost, etc.)
 */
export function characterCanTakeFreeDevilDeals(character: PlayerType): boolean {
  return CHARACTERS_WITH_FREE_DEVIL_DEALS_SET.has(character);
}

/**
 * Normally, characters get a red heart container upon reaching a new floor with an eternal heart,
 * but some characters grant a black heart instead. Returns true for Dark Judas and Tainted Judas.
 * Otherwise, returns false.
 */
export function characterGetsBlackHeartFromEternalHeart(
  character: PlayerType,
): boolean {
  return CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART_SET.has(character);
}

/**
 * Helper function to determine if the specified character starts with an active item.
 *
 * For the purposes of this function, the save file is considered to be fully unlocked (e.g. Isaac
 * is considered to starts with the D6, but this is not the case on a brand new save file).
 */
export function characterStartsWithActiveItem(character: PlayerType): boolean {
  return CHARACTERS_THAT_START_WITH_AN_ACTIVE_ITEM_SET.has(character);
}

/**
 * - Most characters have a 56 frame death animation (i.e. the "Death" animation).
 * - The Lost and Tainted Lost have a 38 frame death animation (i.e. the "LostDeath" animation).
 * - Tainted Forgotten have a 20 frame death animation (i.e. the "ForgottenDeath" animation).
 */
export function getCharacterDeathAnimationName(character: PlayerType): string {
  if (LOST_STYLE_CHARACTERS_SET.has(character)) {
    return "LostDeath";
  }

  if (character === PlayerType.THE_FORGOTTEN_B) {
    return "ForgottenDeath";
  }

  return "Death";
}

/**
 * Returns the maximum heart containers that the provided character can have. Normally, this is 12,
 * but with Keeper it is 3, and with Tainted Keeper it is 2. This does not account for Birthright or
 * Mother's Kiss; use the `getPlayerMaxHeartContainers` helper function for that.
 */
export function getCharacterMaxHeartContainers(character: PlayerType): int {
  // 14
  if (character === PlayerType.KEEPER) {
    return 3;
  }

  // 16
  if (character === PlayerType.THE_FORGOTTEN) {
    return 6;
  }

  // 17
  if (character === PlayerType.THE_SOUL) {
    return 6;
  }

  // 33
  if (character === PlayerType.KEEPER_B) {
    return 2;
  }

  return 12;
}

/** Helper function to get the name of a character. Returns "unknown" for modded characters. */
export function getCharacterName(character: PlayerType): string {
  if (isVanillaCharacter(character)) {
    return "unknown";
  }

  const characterName = CHARACTER_NAMES[character];
  return characterName === undefined ? DEFAULT_CHARACTER_NAME : characterName;
}

export function isModdedCharacter(character: PlayerType): boolean {
  return !isVanillaCharacter(character);
}

export function isVanillaCharacter(character: PlayerType): boolean {
  return character <= MAX_VANILLA_CHARACTER;
}
