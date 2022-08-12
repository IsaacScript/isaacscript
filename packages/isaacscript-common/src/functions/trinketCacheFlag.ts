import { CacheFlag, TrinketType } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import { getTrinketTypes } from "../features/firstLast";
import { getEnumValues } from "./enums";
import { hasFlag } from "./flag";
import { copySet } from "./set";

const CACHE_FLAG_TO_TRINKETS_MAP = new Map<CacheFlag, Set<TrinketType>>();

function lazyInitCacheFlagMap() {
  if (CACHE_FLAG_TO_TRINKETS_MAP.size > 0) {
    return;
  }

  for (const cacheFlag of getEnumValues(CacheFlag)) {
    const trinketsSet = new Set<TrinketType>();

    for (const trinketType of getTrinketTypes()) {
      if (trinketHasCacheFlag(trinketType, cacheFlag)) {
        trinketsSet.add(trinketType);
      }
    }

    CACHE_FLAG_TO_TRINKETS_MAP.set(cacheFlag, trinketsSet);
  }
}

/**
 * Returns a map containing every trinket type that the player has that matches the provided
 * `CacheFlag`. The values of the map correspond to the multiplier for that trinket.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
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
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getTrinketsForCacheFlag(
  cacheFlag: CacheFlag,
): Set<TrinketType> {
  lazyInitCacheFlagMap();

  const trinketsSet = CACHE_FLAG_TO_TRINKETS_MAP.get(cacheFlag);
  if (trinketsSet === undefined) {
    return new Set();
  }

  return copySet(trinketsSet);
}

/** Helper function to check in the item config if a given trinket has a given cache flag. */
export function trinketHasCacheFlag(
  trinketType: TrinketType,
  cacheFlag: CacheFlag,
): boolean {
  const itemConfigItem = itemConfig.GetTrinket(trinketType);
  if (itemConfigItem === undefined) {
    return false;
  }

  return hasFlag(itemConfigItem.CacheFlags, cacheFlag);
}
