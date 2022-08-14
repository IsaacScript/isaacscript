import { TrinketType } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import { getModdedTrinketTypes } from "../features/firstLast";
import { getVanillaTrinketTypes } from "./trinkets";

const ALL_TRINKETS_ARRAY: TrinketType[] = [];
const ALL_TRINKETS_SET = new Set<TrinketType>();

const VANILLA_TRINKETS_ARRAY: TrinketType[] = [];
const VANILLA_TRINKETS_SET = new Set<TrinketType>();

const MODDED_TRINKETS_ARRAY: TrinketType[] = [];
const MODDED_TRINKETS_SET = new Set<TrinketType>();

function lazyInitVanillaTrinkets() {
  if (VANILLA_TRINKETS_ARRAY.length > 0) {
    return;
  }

  const vanillaTrinketTypes = getVanillaTrinketTypes();
  for (const trinketType of vanillaTrinketTypes) {
    // Vanilla trinket types are contiguous, but we check every value just in case.
    const itemConfigItem = itemConfig.GetTrinket(trinketType);
    if (itemConfigItem !== undefined) {
      VANILLA_TRINKETS_ARRAY.push(trinketType);
      VANILLA_TRINKETS_SET.add(trinketType);
    }
  }
}

function lazyInitModdedTrinkets() {
  if (MODDED_TRINKETS_ARRAY.length > 0) {
    return;
  }

  lazyInitVanillaTrinkets();

  for (const trinketType of VANILLA_TRINKETS_ARRAY) {
    ALL_TRINKETS_ARRAY.push(trinketType);
    ALL_TRINKETS_SET.add(trinketType);
  }

  const moddedTrinketTypes = getModdedTrinketTypes();
  for (const trinketType of moddedTrinketTypes) {
    // Modded trinket types are contiguous, but we check every value just in case.
    const itemConfigItem = itemConfig.GetTrinket(trinketType);
    if (itemConfigItem !== undefined) {
      MODDED_TRINKETS_ARRAY.push(trinketType);
      MODDED_TRINKETS_SET.add(trinketType);

      ALL_TRINKETS_ARRAY.push(trinketType);
      ALL_TRINKETS_SET.add(trinketType);
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
  lazyInitModdedTrinkets();
  return MODDED_TRINKETS_ARRAY;
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
  lazyInitModdedTrinkets();
  return MODDED_TRINKETS_SET;
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
  lazyInitModdedTrinkets();
  return ALL_TRINKETS_ARRAY;
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
  lazyInitModdedTrinkets();
  return ALL_TRINKETS_SET;
}

/**
 * Returns an array containing every valid vanilla trinket type in the game.
 *
 * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups, then
 * use the `getVanillaTrinketSet` helper function instead.
 */
export function getVanillaTrinketArray(): readonly TrinketType[] {
  lazyInitVanillaTrinkets();
  return VANILLA_TRINKETS_ARRAY;
}

/**
 * Returns a set containing every valid vanilla trinket type in the game.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order, then
 * use the `getVanillaTrinketArray` helper function instead.
 */
export function getVanillaTrinketSet(): ReadonlySet<TrinketType> {
  lazyInitVanillaTrinkets();
  return VANILLA_TRINKETS_SET;
}
