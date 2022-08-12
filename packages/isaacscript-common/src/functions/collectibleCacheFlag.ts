import { CacheFlag, CollectibleType } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import { getCollectibleArray } from "./collectibleSet";
import { getEnumValues } from "./enums";
import { hasFlag } from "./flag";
import { copySet, getSortedSetValues } from "./set";
import { repeat } from "./utils";

const CACHE_FLAG_TO_COLLECTIBLES_MAP = new Map<
  CacheFlag,
  Set<CollectibleType>
>();

function lazyInitCacheFlagMap() {
  if (CACHE_FLAG_TO_COLLECTIBLES_MAP.size > 0) {
    return;
  }

  for (const cacheFlag of getEnumValues(CacheFlag)) {
    const collectiblesSet = new Set<CollectibleType>();

    for (const collectibleType of getCollectibleArray()) {
      if (collectibleHasCacheFlag(collectibleType, cacheFlag)) {
        collectiblesSet.add(collectibleType);
      }
    }

    CACHE_FLAG_TO_COLLECTIBLES_MAP.set(cacheFlag, collectiblesSet);
  }
}

/** Helper function to check in the item config if a given collectible has a given cache flag. */
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
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getCollectiblesForCacheFlag(
  cacheFlag: CacheFlag,
): Set<CollectibleType> {
  lazyInitCacheFlagMap();

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
 * For example, if the cache flag is `CacheFlag.FLYING`, and the player has one Lord of the Pit and
 * two Dead Doves, then this function would return:
 *
 * ```ts
 * [
 *   CollectibleType.LORD_OF_THE_PIT,
 *   CollectibleType.DEAD_DOVE,
 *   CollectibleType.DEAD_DOVE,
 * ]
 * ```
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
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
