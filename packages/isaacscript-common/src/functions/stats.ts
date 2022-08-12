import { CacheFlag } from "isaac-typescript-definitions";
import { DEFAULT_PLAYER_STAT_MAP } from "../maps/defaultPlayerStatMap";

/**
 * Returns the starting stat that Isaac (the default character) starts with. For example, if you
 * pass this function `CacheFlag.DAMAGE`, it will return 3.5.
 *
 * Note that the default fire delay is represented in the tear stat, not the `MaxFireDelay` value.
 */
export function getDefaultPlayerStat(cacheFlag: CacheFlag): number | undefined {
  return DEFAULT_PLAYER_STAT_MAP.get(cacheFlag);
}
