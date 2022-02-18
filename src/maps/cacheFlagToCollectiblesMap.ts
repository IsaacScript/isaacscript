import {
  collectibleHasCacheFlag,
  getMaxCollectibleID,
} from "../functions/collectibles";
import { getEnumValues } from "../functions/util";

export const CACHE_FLAG_TO_COLLECTIBLES_MAP = new Map<
  CacheFlag,
  Set<CollectibleType | int>
>();

initMap();

function initMap() {
  const maxCollectibleID = getMaxCollectibleID();

  // The cache flag to collectibles map should be valid for every cache flag,
  // so we initialize it with empty sets
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
