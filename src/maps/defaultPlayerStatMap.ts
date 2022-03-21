import { getTearsStat } from "../functions/tears";

const DEFAULT_MAX_FIRE_DELAY = 10;

/** The default fire delay is represented in the tear stat, not the `MaxFireDelay` value. */
export const DEFAULT_PLAYER_STAT_MAP: ReadonlyMap<CacheFlag, number> = new Map([
  [CacheFlag.CACHE_DAMAGE, 3.5], // 1 << 0

  // The default tears stat is 2.73
  [CacheFlag.CACHE_FIREDELAY, getTearsStat(DEFAULT_MAX_FIRE_DELAY)], // 1 << 1

  [CacheFlag.CACHE_SHOTSPEED, 1.0], // 1 << 2
  [CacheFlag.CACHE_RANGE, 6.5], // 1 << 3
  [CacheFlag.CACHE_SPEED, 1], // 1 << 4
  [CacheFlag.CACHE_LUCK, 0], // 1 << 10
]);
