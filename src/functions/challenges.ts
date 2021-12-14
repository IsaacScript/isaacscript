import { CHALLENGE_NAME_MAP } from "../maps/challengeNameMap";

/** Get the proper name for a `Challenge` enum. This will only work for vanilla challenges. */
export function getChallengeName(challenge: Challenge): string {
  const challengeName = CHALLENGE_NAME_MAP.get(challenge);
  return challengeName === undefined ? "Unknown" : challengeName;
}
