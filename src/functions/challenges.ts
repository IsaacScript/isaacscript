import {
  CHALLENGE_NAME_MAP,
  DEFAULT_CHALLENGE_NAME,
} from "../maps/challengeNameMap";

/** Get the proper name for a `Challenge` enum. This will only work for vanilla challenges. */
export function getChallengeName(challenge: Challenge): string {
  const challengeName = CHALLENGE_NAME_MAP[challenge];
  return challengeName === undefined ? DEFAULT_CHALLENGE_NAME : challengeName;
}
