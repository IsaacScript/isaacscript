export const DEFAULT_PLAYER_STAT_MAP: Map<CacheFlag, number | boolean> =
  new Map<CacheFlag, number | boolean>([
    [CacheFlag.CACHE_DAMAGE, 3.5], // 1 << 0
    [CacheFlag.CACHE_FIREDELAY, 10], // 1 << 1
    [CacheFlag.CACHE_SHOTSPEED, 1.0], // 1 << 2
    [CacheFlag.CACHE_RANGE, 6.5], // 1 << 3
    [CacheFlag.CACHE_SPEED, 1], // 1 << 4
    [CacheFlag.CACHE_FLYING, false], // 1 << 7
    [CacheFlag.CACHE_LUCK, 0], // 1 << 10
  ]);
