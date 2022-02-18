import { collectibleHasCacheFlag, getMaxCollectibleID } from "./collectibles";
import { copySet } from "./set";
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
 * collectibles.
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

/**
 * Returns an array containing every collectible type that the player has that matches the provided
 * CacheFlag.
 *
 * For example, if a player has one Lord of the Pit and two Transcendences, then this function would
 * return:
 *
 * ```ts
 * [
 *   CollectibleType.COLLECTIBLE_LORD_OF_THE_PIT,
 *   CollectibleType.COLLECTIBLE_TRANSCENDENCE,
 *   CollectibleType.COLLECTIBLE_TRANSCENDENCE,
 * ]
 * ```
 */
export function getPlayerCollectiblesForCacheFlag(
  player: EntityPlayer,
  cacheFlag: CacheFlag,
): Array<CollectibleType | int> {
  const collectiblesForCacheFlag = getCollectiblesForCacheFlag(cacheFlag);

  const playerCollectibles: Array<CollectibleType | int> = [];
  for (const collectibleType of collectiblesForCacheFlag.values()) {
    const numCollectibles = player.GetCollectibleNum(collectibleType);
    for (let i = 0; i < numCollectibles; i++) {
      playerCollectibles.push(collectibleType);
    }
  }

  return playerCollectibles;
}
