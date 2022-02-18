import { collectibleHasCacheFlag, getMaxCollectibleID } from "./collectibles";
import { copySet, deleteSetsFromSet } from "./set";
import { getEnumValues } from "./util";

const CACHE_FLAG_TO_COLLECTIBLES_MAP = new Map<
  CacheFlag,
  Set<CollectibleType | int>
>();

function initCacheFlagMap() {
  const maxCollectibleID = getMaxCollectibleID();

  for (const cacheFlag of getEnumValues(CacheFlag)) {
    const collectiblesSet = new Set<CollectibleType | int>();

    for (
      let collectibleType = 1;
      collectibleType <= maxCollectibleID;
      collectibleType++
    ) {
      if (collectibleHasCacheFlag(collectibleType, cacheFlag)) {
        collectiblesSet.add(collectibleType);
      }
    }

    CACHE_FLAG_TO_COLLECTIBLES_MAP.set(cacheFlag, collectiblesSet);
  }
}

/**
 * Returns a set containing every collectible type with the given cache flag, including modded
 * items.
 */
export function getCollectiblesForCacheFlag(
  cacheFlag: CacheFlag,
): Set<CollectibleType | int> {
  // Lazy initialize the map
  if (CACHE_FLAG_TO_COLLECTIBLES_MAP.size === 0) {
    initCacheFlagMap();
  }

  const collectiblesSet = CACHE_FLAG_TO_COLLECTIBLES_MAP.get(cacheFlag);
  if (collectiblesSet === undefined) {
    return new Set();
  }

  return copySet(collectiblesSet);
}

export function getFlyingCollectibles(): Set<CollectibleType | int> {
  // Instead of manually compiling a list of collectibles that grant flying,
  // we can instead dynamically look for collectibles that have "CacheFlag.CACHE_FLYING"
  const collectiblesWithFlyingCacheFlag = getCollectiblesForCacheFlag(
    CacheFlag.CACHE_FLYING,
  );

  // None of the collectibles with a cache of "all" grant flying,
  // so we can safely remove them from the list
  const collectiblesWithAllCacheFlag = getCollectiblesForCacheFlag(
    CacheFlag.CACHE_ALL,
  );
  deleteSetsFromSet(
    collectiblesWithFlyingCacheFlag,
    collectiblesWithAllCacheFlag,
  );

  return collectiblesWithFlyingCacheFlag;
}
