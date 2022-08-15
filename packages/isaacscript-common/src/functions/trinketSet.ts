import { TrinketType } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import { getModdedTrinketTypes } from "../features/firstLast";
import { getVanillaTrinketTypes } from "./trinkets";

const ALL_TRINKET_TYPES_ARRAY: TrinketType[] = [];
const ALL_TRINKET_TYPES_SET = new Set<TrinketType>();

const VANILLA_TRINKET_TYPES_ARRAY: TrinketType[] = [];
const VANILLA_TRINKET_TYPES_SET = new Set<TrinketType>();

const MODDED_TRINKET_TYPES_ARRAY: TrinketType[] = [];
const MODDED_TRINKET_TYPES_SET = new Set<TrinketType>();

function lazyInitVanillaTrinketTypes() {
  if (VANILLA_TRINKET_TYPES_ARRAY.length > 0) {
    return;
  }

  const vanillaTrinketTypes = getVanillaTrinketTypes();
  for (const trinketType of vanillaTrinketTypes) {
    // Vanilla trinket types are contiguous, but we check every value just in case.
    const itemConfigItem = itemConfig.GetTrinket(trinketType);
    if (itemConfigItem !== undefined) {
      VANILLA_TRINKET_TYPES_ARRAY.push(trinketType);
      VANILLA_TRINKET_TYPES_SET.add(trinketType);
    }
  }
}

function lazyInitModdedTrinketTypes() {
  if (MODDED_TRINKET_TYPES_ARRAY.length > 0) {
    return;
  }

  lazyInitVanillaTrinketTypes();

  for (const trinketType of VANILLA_TRINKET_TYPES_ARRAY) {
    ALL_TRINKET_TYPES_ARRAY.push(trinketType);
    ALL_TRINKET_TYPES_SET.add(trinketType);
  }

  const moddedTrinketTypes = getModdedTrinketTypes();
  for (const trinketType of moddedTrinketTypes) {
    // Modded trinket types are contiguous, but we check every value just in case.
    const itemConfigItem = itemConfig.GetTrinket(trinketType);
    if (itemConfigItem !== undefined) {
      MODDED_TRINKET_TYPES_ARRAY.push(trinketType);
      MODDED_TRINKET_TYPES_SET.add(trinketType);

      ALL_TRINKET_TYPES_ARRAY.push(trinketType);
      ALL_TRINKET_TYPES_SET.add(trinketType);
    }
  }
}

/**
 * Returns an array containing every valid trinket type in the game, including modded trinkets.
 *
 * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups, then
 * use the `getTrinketSet` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getModdedTrinketArray(): readonly TrinketType[] {
  lazyInitModdedTrinketTypes();
  return MODDED_TRINKET_TYPES_ARRAY;
}

/**
 * Returns a set containing every valid trinket type in the game, including modded trinkets.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order, then
 * use the `getTrinketArray` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getModdedTrinketSet(): ReadonlySet<TrinketType> {
  lazyInitModdedTrinketTypes();
  return MODDED_TRINKET_TYPES_SET;
}

/**
 * Returns an array containing every modded trinket type in the game.
 *
 * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups, then
 * use the `getModdedTrinketSet` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getTrinketArray(): readonly TrinketType[] {
  lazyInitModdedTrinketTypes();
  return ALL_TRINKET_TYPES_ARRAY;
}

/**
 * Returns a set containing every modded trinket type in the game.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order, then
 * use the `getModdedTrinketArray` helper function instead.
 *
 * This function can only be called if at least one callback has been executed. This is because not
 * all trinkets will necessarily be present when a mod first loads (due to mod load order).
 */
export function getTrinketSet(): ReadonlySet<TrinketType> {
  lazyInitModdedTrinketTypes();
  return ALL_TRINKET_TYPES_SET;
}

/**
 * Returns an array containing every valid vanilla trinket type in the game.
 *
 * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups, then
 * use the `getVanillaTrinketSet` helper function instead.
 */
export function getVanillaTrinketArray(): readonly TrinketType[] {
  lazyInitVanillaTrinketTypes();
  return VANILLA_TRINKET_TYPES_ARRAY;
}

/**
 * Returns a set containing every valid vanilla trinket type in the game.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order, then
 * use the `getVanillaTrinketArray` helper function instead.
 */
export function getVanillaTrinketSet(): ReadonlySet<TrinketType> {
  lazyInitVanillaTrinketTypes();
  return VANILLA_TRINKET_TYPES_SET;
}
