import { CacheFlag, TrinketType } from "isaac-typescript-definitions";
import { getEnumValues } from "./enums";
import { copySet } from "./set";
import { getTrinketTypeRange, trinketHasCacheFlag } from "./trinkets";

const CACHE_FLAG_TO_TRINKETS_MAP = new Map<CacheFlag, Set<TrinketType>>();

function initCacheFlagMap() {
  for (const cacheFlag of getEnumValues(CacheFlag)) {
    const trinketsSet = new Set<TrinketType>();

    for (const trinketType of getTrinketTypeRange()) {
      if (trinketHasCacheFlag(trinketType, cacheFlag)) {
        trinketsSet.add(trinketType);
      }
    }

    CACHE_FLAG_TO_TRINKETS_MAP.set(cacheFlag, trinketsSet);
  }
}

/**
 * Returns a map containing every trinket type that the player has that matches the provided
 * CacheFlag. The values of the map correspond to the multiplier for that trinket.
 */
export function getPlayerTrinketsForCacheFlag(
  player: EntityPlayer,
  cacheFlag: CacheFlag,
): Map<TrinketType, int> {
  const trinketsForCacheFlag = getTrinketsForCacheFlag(cacheFlag);

  const playerTrinkets = new Map<TrinketType, int>();
  for (const trinketType of trinketsForCacheFlag.values()) {
    const trinketMultiplier = player.GetTrinketMultiplier(trinketType);
    if (trinketMultiplier > 0) {
      playerTrinkets.set(trinketType, trinketMultiplier);
    }
  }

  return playerTrinkets;
}

/**
 * Returns a set containing every trinket type with the given cache flag, including modded trinkets.
 */
export function getTrinketsForCacheFlag(
  cacheFlag: CacheFlag,
): Set<TrinketType> {
  // Lazy initialize the map.
  if (CACHE_FLAG_TO_TRINKETS_MAP.size === 0) {
    initCacheFlagMap();
  }

  const trinketsSet = CACHE_FLAG_TO_TRINKETS_MAP.get(cacheFlag);
  if (trinketsSet === undefined) {
    return new Set();
  }

  return copySet(trinketsSet);
}
