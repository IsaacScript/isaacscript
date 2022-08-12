import { CollectibleType } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import {
  FIRST_COLLECTIBLE_TYPE,
  LAST_VANILLA_COLLECTIBLE_TYPE,
} from "../core/constantsFirstLast";
import { getLastCollectibleType } from "../features/firstLast";
import { irange } from "./utils";

const ALL_COLLECTIBLES_ARRAY: CollectibleType[] = [];
const VANILLA_COLLECTIBLES_ARRAY: CollectibleType[] = [];
const MODDED_COLLECTIBLES_ARRAY: CollectibleType[] = [];

const ALL_COLLECTIBLES_SET = new Set<CollectibleType>();
const VANILLA_COLLECTIBLES_SET = new Set<CollectibleType>();
const MODDED_COLLECTIBLES_SET = new Set<CollectibleType>();

function lazyInitCollectibleArraysAndSets() {
  if (ALL_COLLECTIBLES_ARRAY.length !== 0) {
    return;
  }

  const lastCollectibleType = getLastCollectibleType();
  const collectibleTypeRange = irange(
    FIRST_COLLECTIBLE_TYPE,
    lastCollectibleType,
  ) as CollectibleType[];
  for (const collectibleType of collectibleTypeRange) {
    const itemConfigItem = itemConfig.GetCollectible(collectibleType);
    if (itemConfigItem === undefined) {
      continue;
    }

    ALL_COLLECTIBLES_ARRAY.push(collectibleType);
    if (collectibleType <= LAST_VANILLA_COLLECTIBLE_TYPE) {
      VANILLA_COLLECTIBLES_ARRAY.push(collectibleType);
    } else {
      MODDED_COLLECTIBLES_ARRAY.push(collectibleType);
    }
  }

  ALL_COLLECTIBLES_ARRAY.sort();
  for (const collectibleType of ALL_COLLECTIBLES_ARRAY) {
    ALL_COLLECTIBLES_SET.add(collectibleType);
  }

  VANILLA_COLLECTIBLES_ARRAY.sort();
  for (const collectibleType of VANILLA_COLLECTIBLES_ARRAY) {
    VANILLA_COLLECTIBLES_SET.add(collectibleType);
  }

  MODDED_COLLECTIBLES_ARRAY.sort();
  for (const collectibleType of MODDED_COLLECTIBLES_ARRAY) {
    MODDED_COLLECTIBLES_SET.add(collectibleType);
  }
}

/**
 * Returns an array containing every valid collectible type in the game, including modded
 * collectibles.
 *
 * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
 * then use the `getCollectibleSet` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getCollectibleArray(): readonly CollectibleType[] {
  lazyInitCollectibleArraysAndSets();
  return ALL_COLLECTIBLES_ARRAY;
}

/**
 * Returns a set containing every valid collectible type in the game, including modded collectibles.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
 * then use the `getCollectibleArray` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getCollectibleSet(): ReadonlySet<CollectibleType> {
  lazyInitCollectibleArraysAndSets();
  return ALL_COLLECTIBLES_SET;
}

/**
 * Returns an array containing every modded collectible type in the game.
 *
 * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
 * then use the `getModdedCollectibleSet` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getModdedCollectibleArray(): readonly CollectibleType[] {
  lazyInitCollectibleArraysAndSets();
  return MODDED_COLLECTIBLES_ARRAY;
}

/**
 * Returns a set containing every modded collectible type in the game.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
 * then use the `getModdedCollectibleArray` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getModdedCollectibleSet(): ReadonlySet<CollectibleType> {
  lazyInitCollectibleArraysAndSets();
  return MODDED_COLLECTIBLES_SET;
}

/**
 * Returns an array containing every valid vanilla collectible type in the game.
 *
 * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
 * then use the `getVanillaCollectibleSet` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getVanillaCollectibleArray(): readonly CollectibleType[] {
  lazyInitCollectibleArraysAndSets();
  return VANILLA_COLLECTIBLES_ARRAY;
}

/**
 * Returns a set containing every valid vanilla collectible type in the game.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
 * then use the `getVanillaCollectibleArray` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all collectibles will necessarily be present when a mod first loads (due to mod load order).
 */
export function getVanillaCollectibleSet(): ReadonlySet<CollectibleType> {
  lazyInitCollectibleArraysAndSets();
  return VANILLA_COLLECTIBLES_SET;
}
