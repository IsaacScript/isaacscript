import { CollectibleType } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import {
  FIRST_COLLECTIBLE_TYPE,
  LAST_COLLECTIBLE_TYPE,
  LAST_VANILLA_COLLECTIBLE_TYPE,
} from "../constantsFirstLast";
import { irange } from "./utils";

const ALL_COLLECTIBLES_ARRAY: CollectibleType[] = [];
const VANILLA_COLLECTIBLES_ARRAY: CollectibleType[] = [];
const MODDED_COLLECTIBLES_ARRAY: CollectibleType[] = [];

const ALL_COLLECTIBLES_SET = new Set<CollectibleType>();
const VANILLA_COLLECTIBLES_SET = new Set<CollectibleType>();
const MODDED_COLLECTIBLES_SET = new Set<CollectibleType>();

function initCollectibleArraysAndSets() {
  if (ALL_COLLECTIBLES_ARRAY.length !== 0) {
    return;
  }

  const collectibleTypeRange = irange(
    FIRST_COLLECTIBLE_TYPE,
    LAST_COLLECTIBLE_TYPE,
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
  VANILLA_COLLECTIBLES_ARRAY.sort();
  MODDED_COLLECTIBLES_ARRAY.sort();

  for (const collectibleType of ALL_COLLECTIBLES_ARRAY) {
    ALL_COLLECTIBLES_SET.add(collectibleType);
  }
  for (const collectibleType of VANILLA_COLLECTIBLES_ARRAY) {
    VANILLA_COLLECTIBLES_SET.add(collectibleType);
  }
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
 */
export function getCollectibleArray(): readonly CollectibleType[] {
  // Lazy initialize the arrays/sets.
  initCollectibleArraysAndSets();

  return ALL_COLLECTIBLES_ARRAY;
}

/**
 * Returns a set containing every valid collectible type in the game, including modded collectibles.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
 * then use the `getCollectibleArray` helper function instead.
 */
export function getCollectibleSet(): ReadonlySet<CollectibleType> {
  // Lazy initialize the arrays/sets.
  initCollectibleArraysAndSets();

  return ALL_COLLECTIBLES_SET;
}

/**
 * Returns an array containing every modded collectible type in the game.
 *
 * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
 * then use the `getModdedCollectibleSet` helper function instead.
 */
export function getModdedCollectibleArray(): readonly CollectibleType[] {
  // Lazy initialize the arrays/sets.
  initCollectibleArraysAndSets();

  return MODDED_COLLECTIBLES_ARRAY;
}

/**
 * Returns a set containing every modded collectible type in the game.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
 * then use the `getModdedCollectibleArray` helper function instead.
 */
export function getModdedCollectibleSet(): ReadonlySet<CollectibleType> {
  // Lazy initialize the arrays/sets.
  initCollectibleArraysAndSets();

  return MODDED_COLLECTIBLES_SET;
}

/**
 * Returns an array containing every valid vanilla collectible type in the game.
 *
 * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
 * then use the `getVanillaCollectibleSet` helper function instead.
 */
export function getVanillaCollectibleArray(): readonly CollectibleType[] {
  // Lazy initialize the arrays/sets.
  initCollectibleArraysAndSets();

  return VANILLA_COLLECTIBLES_ARRAY;
}

/**
 * Returns a set containing every valid vanilla collectible type in the game.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
 * then use the `getVanillaCollectibleArray` helper function instead.
 */
export function getVanillaCollectibleSet(): ReadonlySet<CollectibleType> {
  // Lazy initialize the arrays/sets.
  initCollectibleArraysAndSets();

  return VANILLA_COLLECTIBLES_SET;
}
