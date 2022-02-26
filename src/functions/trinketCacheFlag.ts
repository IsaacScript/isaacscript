import { range } from "./math";
import { copySet } from "./set";
import { getMaxTrinketID, trinketHasCacheFlag } from "./trinkets";
import { getEnumValues } from "./utils";

const CACHE_FLAG_TO_TRINKETS_MAP = new Map<CacheFlag, Set<TrinketType | int>>();

function initCacheFlagMap() {
  const maxTrinketID = getMaxTrinketID();

  for (const cacheFlag of getEnumValues(CacheFlag)) {
    const trinketsSet = new Set<CollectibleType | int>();

    for (const trinketType of range(1, maxTrinketID)) {
      if (trinketHasCacheFlag(trinketType, cacheFlag)) {
        trinketsSet.add(trinketType);
      }
    }

    CACHE_FLAG_TO_TRINKETS_MAP.set(cacheFlag, trinketsSet);
  }
}

/**
 * Returns a set containing every trinket type with the given cache flag, including modded trinkets.
 */
export function getTrinketsForCacheFlag(
  cacheFlag: CacheFlag,
): Set<TrinketType | int> {
  // Lazy initialize the map
  if (CACHE_FLAG_TO_TRINKETS_MAP.size === 0) {
    initCacheFlagMap();
  }

  const trinketsSet = CACHE_FLAG_TO_TRINKETS_MAP.get(cacheFlag);
  if (trinketsSet === undefined) {
    return new Set();
  }

  return copySet(trinketsSet);
}

/**
 * Returns a map containing every trinket type that the player has that matches the provided
 * CacheFlag. The values of the map correspond to the multiplier for that trinket.
 */
export function getPlayerTrinketsForCacheFlag(
  player: EntityPlayer,
  cacheFlag: CacheFlag,
): Map<TrinketType | int, int> {
  const trinketsForCacheFlag = getTrinketsForCacheFlag(cacheFlag);

  const playerTrinkets = new Map<TrinketType | int, int>();
  for (const trinketType of trinketsForCacheFlag.values()) {
    const trinketMultiplier = player.GetTrinketMultiplier(trinketType);
    if (trinketMultiplier > 0) {
      playerTrinkets.set(trinketType, trinketMultiplier);
    }
  }

  return playerTrinkets;
}
