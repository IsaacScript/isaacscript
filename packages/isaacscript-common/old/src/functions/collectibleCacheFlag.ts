import { CacheFlag, CollectibleType } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import { getCollectibleTypeRange } from "./collectibles";
import { getEnumValues } from "./enums";
import { hasFlag } from "./flag";
import { copySet, getSortedSetValues } from "./set";
import { repeat } from "./utils";

const CACHE_FLAG_TO_COLLECTIBLES_MAP = new Map<
  CacheFlag,
  Set<CollectibleType>
>();

function initCacheFlagMap() {
  for (const cacheFlag of getEnumValues(CacheFlag)) {
    const collectiblesSet = new Set<CollectibleType>();

    for (const collectibleType of getCollectibleTypeRange()) {
      if (collectibleHasCacheFlag(collectibleType, cacheFlag)) {
        collectiblesSet.add(collectibleType);
      }
    }

    CACHE_FLAG_TO_COLLECTIBLES_MAP.set(cacheFlag, collectiblesSet);
  }
}

export function collectibleHasCacheFlag(
  collectibleType: CollectibleType,
  cacheFlag: CacheFlag,
): boolean {
  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return false;
  }

  return hasFlag(itemConfigItem.CacheFlags, cacheFlag);
}

/**
 * Returns a set containing every collectible type with the given cache flag, including modded
 * collectibles.
 */
export function getCollectiblesForCacheFlag(
  cacheFlag: CacheFlag,
): Set<CollectibleType> {
  // Lazy initialize the map.
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
): CollectibleType[] {
  const collectiblesForCacheFlag = getCollectiblesForCacheFlag(cacheFlag);

  const playerCollectibles: CollectibleType[] = [];
  for (const collectibleType of getSortedSetValues(collectiblesForCacheFlag)) {
    const numCollectibles = player.GetCollectibleNum(collectibleType);
    repeat(numCollectibles, () => {
      playerCollectibles.push(collectibleType);
    });
  }

  return playerCollectibles;
}
