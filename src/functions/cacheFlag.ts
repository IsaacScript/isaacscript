import { DEFAULT_PLAYER_STAT_MAP } from "../maps/defaultPlayerStatMap";

export function getDefaultPlayerStat(
  cacheFlag: CacheFlag,
): float | boolean | undefined {
  return DEFAULT_PLAYER_STAT_MAP.get(cacheFlag);
}
