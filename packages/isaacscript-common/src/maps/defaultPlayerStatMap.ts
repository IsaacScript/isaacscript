import { CacheFlag } from "isaac-typescript-definitions";
import { getTearsStat } from "../functions/tears";
import { ReadonlyMap } from "../types/ReadonlyMap";

const DEFAULT_MAX_FIRE_DELAY = 10;

/** The default fire delay is represented in the tear stat, not the `MaxFireDelay` value. */
export const DEFAULT_PLAYER_STAT_MAP = new ReadonlyMap<CacheFlag, number>([
  [CacheFlag.DAMAGE, 3.5], // 1 << 0

  // The default tears stat is 2.73.
  [CacheFlag.FIRE_DELAY, getTearsStat(DEFAULT_MAX_FIRE_DELAY)], // 1 << 1

  [CacheFlag.SHOT_SPEED, 1], // 1 << 2
  [CacheFlag.RANGE, 6.5], // 1 << 3
  [CacheFlag.SPEED, 1], // 1 << 4
  [CacheFlag.LUCK, 0], // 1 << 10
]);
