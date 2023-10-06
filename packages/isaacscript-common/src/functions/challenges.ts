import type { BossID, PlayerType } from "isaac-typescript-definitions";
import { Challenge } from "isaac-typescript-definitions";
import {
  CHALLENGE_BOSSES,
  DEFAULT_CHALLENGE_BOSS_ID,
} from "../objects/challengeBosses";
import {
  CHALLENGE_CHARACTERS,
  DEFAULT_CHALLENGE_CHARACTER,
} from "../objects/challengeCharacters";
import {
  CHALLENGE_NAMES,
  DEFAULT_CHALLENGE_NAME,
} from "../objects/challengeNames";

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
