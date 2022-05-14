import { CacheFlag, CollectibleType } from "isaac-typescript-definitions";
import { MAX_COLLECTIBLE_TYPE } from "../constantsMax";
import { collectibleHasCacheFlag } from "./collectibles";
import { getEnumValues } from "./enums";
import { irange } from "./math";
import { copySet, getSortedSetValues } from "./set";
import { repeat } from "./utils";

const CACHE_FLAG_TO_COLLECTIBLES_MAP = new Map<
  CacheFlag,
  Set<CollectibleType | int>
>();

function initCacheFlagMap() {
  for (const cacheFlag of getEnumValues(CacheFlag)) {
    const collectiblesSet = new Set<CollectibleType | int>();

    for (const collectibleType of irange(1, MAX_COLLECTIBLE_TYPE)) {
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
 *   CollectibleType.LORD_OF_THE_PIT,
 *   CollectibleType.TRANSCENDENCE,
 *   CollectibleType.TRANSCENDENCE,
 * ]
 * ```
 */
export function getPlayerCollectiblesForCacheFlag(
  player: EntityPlayer,
  cacheFlag: CacheFlag,
): Array<CollectibleType | int> {
  const collectiblesForCacheFlag = getCollectiblesForCacheFlag(cacheFlag);

  const playerCollectibles: Array<CollectibleType | int> = [];
  for (const collectibleType of getSortedSetValues(collectiblesForCacheFlag)) {
    const numCollectibles = player.GetCollectibleNum(collectibleType);
    repeat(numCollectibles, () => {
      playerCollectibles.push(collectibleType);
    });
  }

  return playerCollectibles;
}
