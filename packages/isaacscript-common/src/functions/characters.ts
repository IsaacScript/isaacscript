import type {
  CollectibleType,
  TrinketType,
} from "isaac-typescript-definitions";
import { PlayerType } from "isaac-typescript-definitions";
import { FLYING_CHARACTERS, MAIN_CHARACTERS } from "../core/constants";
import { LAST_VANILLA_CHARACTER } from "../core/constantsFirstLast";
import { CHARACTER_DAMAGE_MULTIPLIERS } from "../objects/characterDamageMultipliers";
import { CHARACTER_NAMES } from "../objects/characterNames";
import { CHARACTER_SPRITE_PNG_FILE_NAMES } from "../objects/characterSpritePNGFileNames";
import { CHARACTER_STARTING_COLLECTIBLE_TYPES } from "../objects/characterStartingCollectibleTypes";
import { CHARACTER_STARTING_TRINKET_TYPE } from "../objects/characterStartingTrinketTypes";
import { CHARACTERS_THAT_START_WITH_AN_ACTIVE_ITEM_SET } from "../sets/charactersThatStartWithAnActiveItemSet";
import { CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART_SET } from "../sets/charactersWithBlackHeartFromEternalHeartSet";
import { CHARACTERS_WITH_FREE_DEVIL_DEALS_SET } from "../sets/charactersWithFreeDevilDealsSet";
import { CHARACTERS_WITH_NO_RED_HEARTS_SET } from "../sets/charactersWithNoRedHeartsSet";
import { CHARACTERS_WITH_NO_SOUL_HEARTS_SET } from "../sets/charactersWithNoSoulHeartsSet";
import { LOST_STYLE_CHARACTERS_SET } from "../sets/lostStyleCharactersSet";
import { ReadonlySet } from "../types/ReadonlySet";

type MainCharacter = (typeof MAIN_CHARACTERS)[number];

const FLYING_CHARACTERS_SET = new ReadonlySet<PlayerType>(FLYING_CHARACTERS);
const MAIN_CHARACTERS_SET = new ReadonlySet<PlayerType>(MAIN_CHARACTERS);

const PNG_PATH_PREFIX = "characters/costumes";

/**
 * Normally, characters get a red heart container upon reaching a new floor with an eternal heart,
 * but some characters grant a black heart instead. Returns true for Dark Judas and Tainted Judas.
 * Otherwise, returns false.
 */
export function canCharacterGetBlackHeartFromEternalHeart(
  character: PlayerType,
): boolean {
  return CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART_SET.has(character);
}

/**
 * Helper function to determine if the given character can have red heart containers. Returns true
 * for characters like Isaac, Magdalene, or Cain. Returns true for Keeper and Tainted Keeper, even
 * though coin containers are not technically the same as red heart containers. Returns false for
 * characters like Blue Baby. Returns false for The Lost and Tainted Lost.
 */
export function canCharacterHaveRedHearts(character: PlayerType): boolean {
  return !CHARACTERS_WITH_NO_RED_HEARTS_SET.has(character);
}

/**
 * Helper function to determine if the given character can have soul hearts. Returns true for
 * characters like Isaac, Magdalene, or Cain. Returns false for characters like Bethany. Returns
 * false for The Lost and Tainted Lost.
 */
export function canCharacterHaveSoulHearts(character: PlayerType): boolean {
  return !CHARACTERS_WITH_NO_SOUL_HEARTS_SET.has(character);
}

/**
 * Helper function for determining whether the given character can take free Devil Deals. (e.g. The
 * Lost, Tainted Lost, etc.)
 */
export function canCharacterTakeFreeDevilDeals(character: PlayerType): boolean {
  return CHARACTERS_WITH_FREE_DEVIL_DEALS_SET.has(character);
}

/**
 * Helper function to determine if the specified character starts with an active item.
 *
 * For the purposes of this function, the save file is considered to be fully unlocked (e.g. Isaac
 * is considered to starts with the D6, but this is not the case on a brand new save file).
 */
export function doesCharacterStartWithActiveItem(
  character: PlayerType,
): boolean {
  return CHARACTERS_THAT_START_WITH_AN_ACTIVE_ITEM_SET.has(character);
}

/**
 * Helper function to get the numerical damage multiplier for a character.
 *
 * @param character The character to get.
 * @param hasWhoreOfBabylon Optional. Whether the character has the Whore of Babylon effect
 *                          currently active. Defaults to false. This is necessary because Eve's
 *                          damage multiplier changes from 0.75 to 1 when she has Whore of Babylon
 *                          active.
 */
export function getCharacterDamageMultiplier(
  character: PlayerType,
  hasWhoreOfBabylon = false,
): float {
  if (character === PlayerType.EVE && hasWhoreOfBabylon) {
    return 1;
  }

  return CHARACTER_DAMAGE_MULTIPLIERS[character];
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

  if (character === PlayerType.FORGOTTEN_B) {
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
  if (character === PlayerType.FORGOTTEN) {
    return 6;
  }

  // 17
  if (character === PlayerType.SOUL) {
    return 6;
  }

  // 33
  if (character === PlayerType.KEEPER_B) {
    return 2;
  }

  return 12;
}

/** Helper function to get the name of a character. Returns "Unknown" for modded characters. */
export function getCharacterName(character: PlayerType): string {
  if (isModdedCharacter(character)) {
    return "Unknown";
  }

  return CHARACTER_NAMES[character];
}

/**
 * Helper function to get the path to the sprite for a particular character.
 *
 * For example, the file path for `PlayerType.ISAAC` is
 * "characters/costumes/character_001_isaac.png".
 */
export function getCharacterSpritePNGFilePath(character: PlayerType): string {
  const fileName = CHARACTER_SPRITE_PNG_FILE_NAMES[character];
  return `${PNG_PATH_PREFIX}/${fileName}`;
}

/**
 * Helper function to get the collectibles that are granted to a particular character at the
 * beginning of a run.
 *
 * Note that this will return an empty array for Eden and Tainted Eden.
 */
export function getCharacterStartingCollectibleTypes(
  character: PlayerType,
): readonly CollectibleType[] {
  return CHARACTER_STARTING_COLLECTIBLE_TYPES[character];
}

/**
 * Helper function to get the trinket that is granted to a particular character at the beginning of
 * a run. Returns undefined if the character does not start with a trinket.
 *
 * Note that this will return undefined for Eden and Tainted Eden.
 */
export function getCharacterStartingTrinketType(
  character: PlayerType,
): TrinketType | undefined {
  return CHARACTER_STARTING_TRINKET_TYPE[character];
}

/**
 * Helper function to get the "main" version of the character. In other words, this is the character
 * that selectable from the main menu (and has achievements related to completing the various bosses
 * and so on).
 *
 * For example, the main character for `PlayerType.MAGDALENE` (1) is also `PlayerType.MAGDALENE`
 * (1), but the main character for `PlayerType.LAZARUS_2` (11) would be `PlayerType.LAZARUS` (8).
 *
 * For `PlayerType.POSSESSOR` (-1) and modded characters, the same character will be returned.
 */
export function getMainCharacter(
  character: PlayerType,
): PlayerType | undefined {
  if (isMainCharacter(character) || isModdedCharacter(character)) {
    return character;
  }

  switch (character) {
    // -1
    case PlayerType.POSSESSOR: {
      return PlayerType.POSSESSOR;
    }

    // 11
    case PlayerType.LAZARUS_2: {
      return PlayerType.LAZARUS;
    }

    // 12
    case PlayerType.DARK_JUDAS: {
      return PlayerType.JUDAS;
    }

    // 17
    case PlayerType.SOUL: {
      return PlayerType.FORGOTTEN;
    }

    // 20
    case PlayerType.ESAU: {
      return PlayerType.JACOB;
    }

    // 38
    case PlayerType.LAZARUS_2_B: {
      return PlayerType.LAZARUS_2;
    }

    // 39
    case PlayerType.JACOB_2_B: {
      return PlayerType.JACOB_B;
    }

    // 40
    case PlayerType.SOUL_B: {
      return PlayerType.FORGOTTEN_B;
    }
  }
}

export function isFlyingCharacter(character: PlayerType): boolean {
  return FLYING_CHARACTERS_SET.has(character);
}

/**
 * Helper function to check if the provided character is one of the characters that are selectable
 * from the main menu (and have achievements related to completing the various bosses and so on).
 */
export function isMainCharacter(
  character: PlayerType,
): character is MainCharacter {
  return MAIN_CHARACTERS_SET.has(character);
}

export function isModdedCharacter(character: PlayerType): boolean {
  return !isVanillaCharacter(character);
}

export function isVanillaCharacter(character: PlayerType): boolean {
  return character <= LAST_VANILLA_CHARACTER;
}
