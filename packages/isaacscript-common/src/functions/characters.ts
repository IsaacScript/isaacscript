import type { CollectibleType } from "isaac-typescript-definitions";
import { PlayerType } from "isaac-typescript-definitions";
import { LAST_VANILLA_CHARACTER } from "../core/constantsFirstLast";
import { CHARACTER_DAMAGE_MULTIPLIERS } from "../objects/characterDamageMultipliers";
import { CHARACTER_NAMES } from "../objects/characterNames";
import { CHARACTER_STARTING_COLLECTIBLES } from "../objects/characterStartingCollectibles";
import { CHARACTERS_THAT_START_WITH_AN_ACTIVE_ITEM_SET } from "../sets/charactersThatStartWithAnActiveItemSet";
import { CHARACTERS_WITH_BLACK_HEART_FROM_ETERNAL_HEART_SET } from "../sets/charactersWithBlackHeartFromEternalHeartSet";
import { CHARACTERS_WITH_FREE_DEVIL_DEALS_SET } from "../sets/charactersWithFreeDevilDealsSet";
import { CHARACTERS_WITH_NO_RED_HEARTS_SET } from "../sets/charactersWithNoRedHeartsSet";
import { CHARACTERS_WITH_NO_SOUL_HEARTS_SET } from "../sets/charactersWithNoSoulHeartsSet";
import { LOST_STYLE_CHARACTERS_SET } from "../sets/lostStyleCharactersSet";
import { ReadonlySet } from "../types/ReadonlySet";

const FLYING_CHARACTERS_SET = new ReadonlySet<PlayerType>([
  PlayerType.AZAZEL, // 7
  PlayerType.LOST, // 10
  PlayerType.SOUL, // 17
  PlayerType.LOST_B, // 31
  PlayerType.JACOB_2_B, // 39
  PlayerType.SOUL_B, // 40
]);

const MAIN_CHARACTERS_SET = new ReadonlySet<PlayerType>([
  PlayerType.ISAAC, // 0
  PlayerType.MAGDALENE, // 1
  PlayerType.CAIN, // 2
  PlayerType.JUDAS, // 3
  PlayerType.BLUE_BABY, // 4
  PlayerType.EVE, // 5
  PlayerType.SAMSON, // 6
  PlayerType.AZAZEL, // 7
  PlayerType.LAZARUS, // 8
  PlayerType.EDEN, // 9
  PlayerType.LOST, // 10
  PlayerType.LILITH, // 13
  PlayerType.KEEPER, // 14
  PlayerType.APOLLYON, // 15
  PlayerType.FORGOTTEN, // 16
  PlayerType.BETHANY, // 18
  PlayerType.JACOB, // 19
  PlayerType.ISAAC_B, // 21
  PlayerType.MAGDALENE_B, // 22
  PlayerType.CAIN_B, // 23
  PlayerType.JUDAS_B, // 24
  PlayerType.BLUE_BABY_B, // 25
  PlayerType.EVE_B, // 26
  PlayerType.SAMSON_B, // 27
  PlayerType.AZAZEL_B, // 28
  PlayerType.LAZARUS_B, // 29
  PlayerType.EDEN_B, // 30
  PlayerType.LOST_B, // 31
  PlayerType.LILITH_B, // 32
  PlayerType.KEEPER_B, // 33
  PlayerType.APOLLYON_B, // 34
  PlayerType.FORGOTTEN_B, // 35
  PlayerType.BETHANY_B, // 36
  PlayerType.JACOB_B, // 37
]);

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

/** Helper function to get the numerical damage multiplier for a character. */
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
 * Helper function to get the collectibles that are granted to a particular character at the
 * beginning of a run.
 *
 * Note that this will return an empty array for Eden and Tainted Eden.
 */
export function getCharacterStartingCollectibles(
  character: PlayerType,
): readonly CollectibleType[] {
  return CHARACTER_STARTING_COLLECTIBLES[character];
}

export function isFlyingCharacter(player: EntityPlayer): boolean {
  const character = player.GetPlayerType();
  return FLYING_CHARACTERS_SET.has(character);
}

/**
 * Helper function to check if the provided character is one of the characters that are selectable
 * from the main menu (and have achievements related to completing the various bosses and so on).
 */
export function isMainCharacter(character: PlayerType): boolean {
  return MAIN_CHARACTERS_SET.has(character);
}

export function isModdedCharacter(character: PlayerType): boolean {
  return !isVanillaCharacter(character);
}

export function isVanillaCharacter(character: PlayerType): boolean {
  return character <= LAST_VANILLA_CHARACTER;
}
