import {
  CHALLENGE_NAMES,
  DEFAULT_CHALLENGE_NAME,
} from "../objects/challengeNames";

/** Get the proper name for a `Challenge` enum. This will only work for vanilla challenges. */
export function getChallengeName(challenge: Challenge): string {
  const challengeName = CHALLENGE_NAMES[challenge];
  return challengeName === undefined ? DEFAULT_CHALLENGE_NAME : challengeName;
}
