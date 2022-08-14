import { CollectibleType } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import { getModdedCollectibleTypes } from "../features/firstLast";
import { getVanillaCollectibleTypeRange } from "./collectibles";

const ALL_COLLECTIBLES_ARRAY: CollectibleType[] = [];
const ALL_COLLECTIBLES_SET = new Set<CollectibleType>();

const VANILLA_COLLECTIBLES_ARRAY: CollectibleType[] = [];
const VANILLA_COLLECTIBLES_SET = new Set<CollectibleType>();

const MODDED_COLLECTIBLES_ARRAY: CollectibleType[] = [];
const MODDED_COLLECTIBLES_SET = new Set<CollectibleType>();

function lazyInitVanillaCollectibles() {
  if (VANILLA_COLLECTIBLES_ARRAY.length > 0) {
    return;
  }

  const vanillaCollectibleTypeRange = getVanillaCollectibleTypeRange();
  for (const collectibleType of vanillaCollectibleTypeRange) {
    // Vanilla collectible types are not contiguous, so we must check every value.
    const itemConfigItem = itemConfig.GetCollectible(collectibleType);
    if (itemConfigItem !== undefined) {
      VANILLA_COLLECTIBLES_ARRAY.push(collectibleType);
      VANILLA_COLLECTIBLES_SET.add(collectibleType);
    }
  }
}

function lazyInitModdedCollectibles() {
  if (MODDED_COLLECTIBLES_ARRAY.length > 0) {
    return;
  }

  lazyInitVanillaCollectibles();

  for (const collectibleType of VANILLA_COLLECTIBLES_ARRAY) {
    ALL_COLLECTIBLES_ARRAY.push(collectibleType);
    ALL_COLLECTIBLES_SET.add(collectibleType);
  }

  const moddedCollectibleTypes = getModdedCollectibleTypes();
  for (const collectibleType of moddedCollectibleTypes) {
    // Modded collectible types are contiguous, but we check every value just in case.
    const itemConfigItem = itemConfig.GetCollectible(collectibleType);
    if (itemConfigItem !== undefined) {
      MODDED_COLLECTIBLES_ARRAY.push(collectibleType);
      MODDED_COLLECTIBLES_SET.add(collectibleType);

      ALL_COLLECTIBLES_ARRAY.push(collectibleType);
      ALL_COLLECTIBLES_SET.add(collectibleType);
    }
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
  lazyInitModdedCollectibles();
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
  lazyInitModdedCollectibles();
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
  lazyInitModdedCollectibles();
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
  lazyInitModdedCollectibles();
  return MODDED_COLLECTIBLES_SET;
}

/**
 * Returns an array containing every valid vanilla collectible type in the game.
 *
 * Use this if you need to iterate over the collectibles in order. If you need to do O(1) lookups,
 * then use the `getVanillaCollectibleSet` helper function instead.
 */
export function getVanillaCollectibleArray(): readonly CollectibleType[] {
  lazyInitVanillaCollectibles();
  return VANILLA_COLLECTIBLES_ARRAY;
}

/**
 * Returns a set containing every valid vanilla collectible type in the game.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the collectibles in order,
 * then use the `getVanillaCollectibleArray` helper function instead.
 */
export function getVanillaCollectibleSet(): ReadonlySet<CollectibleType> {
  lazyInitVanillaCollectibles();
  return VANILLA_COLLECTIBLES_SET;
}
