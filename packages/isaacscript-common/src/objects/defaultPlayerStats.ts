import { PlayerStat } from "../enums/PlayerStat";
import { getTearsStat } from "../functions/tears";

const DEFAULT_MAX_FIRE_DELAY = 10;

/** The default fire delay is represented in the tear stat, not the `MaxFireDelay` value. */
export const DEFAULT_PLAYER_STATS = {
  [PlayerStat.DAMAGE]: 3.5, // 1 << 0

  // The default tears stat is 2.73.
  [PlayerStat.FIRE_DELAY]: getTearsStat(DEFAULT_MAX_FIRE_DELAY), // 1 << 1

  [PlayerStat.SHOT_SPEED]: 1, // 1 << 2
  [PlayerStat.TEAR_RANGE]: 6.5, // 1 << 3
  [PlayerStat.MOVE_SPEED]: 1, // 1 << 4
  [PlayerStat.LUCK]: 0, // 1 << 10
} as const;
