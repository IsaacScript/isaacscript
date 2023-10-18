import type {
  BossID,
  CollectibleType,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";
import { Challenge } from "isaac-typescript-definitions";
import {
  CHALLENGE_BOSSES,
  DEFAULT_CHALLENGE_BOSS_ID,
} from "../objects/challengeBosses";
import {
  CHALLENGE_CHARACTERS,
  DEFAULT_CHALLENGE_CHARACTER,
} from "../objects/challengeCharacters";
import { CHALLENGE_COLLECTIBLE_TYPES } from "../objects/challengeCollectibleTypes";
import {
  CHALLENGE_NAMES,
  DEFAULT_CHALLENGE_NAME,
} from "../objects/challengeNames";
import { CHALLENGE_TRINKET_TYPE } from "../objects/challengeTrinketType";
import { log } from "./log";

/**
 * Helper function to clear the current challenge, which will restart the run on a new random
 * non-challenge seed with the current character.
 *
 * If the player is not in a challenge already, this function will do nothing.
 *
 * Under the hood, this function executes the `challenge 0` console command.
 */
export function clearChallenge(): void {
  if (onAnyChallenge()) {
    const command = `challenge ${Challenge.NULL}`;
    log(
      `Restarting the run to clear the current challenge with a console command of: ${command}`,
    );
    Isaac.ExecuteCommand(command);
  }
}

/**
 * Get the final boss of a challenge. This will only work for vanilla challenges.
 *
 * For modded challenges, `BossID.MOM` (6) will be returned.
 *
 * Note that for `Challenge.BACKASSWARDS` (31), this function will return `BossID.MEGA_SATAN` (55),
 * but this is not actually the final boss. (There is no final boss for this challenge.)
 */
export function getChallengeBoss(challenge: Challenge): BossID {
  const challengeBossID = CHALLENGE_BOSSES[challenge];
  // Handle modded challenges.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return challengeBossID ?? DEFAULT_CHALLENGE_BOSS_ID;
}

/**
 * Get the starting character of a challenge. This will only work for vanilla challenges.
 *
 * For modded challenges, `PlayerType.ISAAC` (0) will be returned.
 */
export function getChallengeCharacter(challenge: Challenge): PlayerType {
  const challengeCharacter = CHALLENGE_CHARACTERS[challenge];
  // Handle modded challenges.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return challengeCharacter ?? DEFAULT_CHALLENGE_CHARACTER;
}

/**
 * Get the extra starting collectibles for a challenge. This will only work for vanilla challenges.
 *
 * For modded challenges, an empty array will be returned.
 */
export function getChallengeCollectibleTypes(
  challenge: Challenge,
): readonly CollectibleType[] {
  return CHALLENGE_COLLECTIBLE_TYPES[challenge];
}

/**
 * Get the proper name for a `Challenge` enum. This will only work for vanilla challenges.
 *
 * For modded challenges, "Unknown" will be returned.
 */
export function getChallengeName(challenge: Challenge): string {
  const challengeName = CHALLENGE_NAMES[challenge];
  // Handle modded challenges.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return challengeName ?? DEFAULT_CHALLENGE_NAME;
}

/**
 * Get the extra starting trinket for a challenge. This will only work for vanilla challenges.
 *
 * If a challenge does not grant a starting trinket, `undefined` will be returned.
 *
 * For modded challenges, `undefined` will be returned.
 */
export function getChallengeTrinketType(
  challenge: Challenge,
): TrinketType | undefined {
  return CHALLENGE_TRINKET_TYPE[challenge];
}

/** Helper function to see if the player is playing any challenge. */
export function onAnyChallenge(): boolean {
  const challenge = Isaac.GetChallenge();
  return challenge !== Challenge.NULL;
}

/**
 * Helper function to check to see if the player is playing a particular challenge.
 *
 * This function is variadic, meaning that you can specify as many challenges as you want to check
 * for.
 */
export function onChallenge(...challenges: Challenge[]): boolean {
  const challenge = Isaac.GetChallenge();
  return challenges.includes(challenge);
}

/**
 * Helper function to restart the run on a particular challenge.
 *
 * If the player is already in the particular challenge, this function will do nothing.
 *
 * Under the hood, this function executes the `challenge 0` console command.
 */
export function setChallenge(challenge: Challenge): void {
  if (!onChallenge(challenge)) {
    const command = `challenge ${challenge}`;
    log(
      `Restarting the run to set a challenge with a console command of: ${command}`,
    );
    Isaac.ExecuteCommand(command);
  }
}
