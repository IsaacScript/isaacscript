import { TrinketType } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import {
  FIRST_TRINKET_TYPE,
  LAST_TRINKET_TYPE,
  LAST_VANILLA_TRINKET_TYPE,
} from "../core/constantsFirstLast";
import { irange } from "./utils";

const ALL_TRINKETS_ARRAY: TrinketType[] = [];
const VANILLA_TRINKETS_ARRAY: TrinketType[] = [];
const MODDED_TRINKETS_ARRAY: TrinketType[] = [];

const ALL_TRINKETS_SET = new Set<TrinketType>();
const VANILLA_TRINKETS_SET = new Set<TrinketType>();
const MODDED_TRINKETS_SET = new Set<TrinketType>();

function initTrinketArraysAndSets() {
  if (ALL_TRINKETS_ARRAY.length !== 0) {
    return;
  }

  const trinketTypeRange = irange(
    FIRST_TRINKET_TYPE,
    LAST_TRINKET_TYPE,
  ) as TrinketType[];
  for (const trinketType of trinketTypeRange) {
    const itemConfigItem = itemConfig.GetTrinket(trinketType);
    if (itemConfigItem === undefined) {
      continue;
    }

    ALL_TRINKETS_ARRAY.push(trinketType);
    if (trinketType <= LAST_VANILLA_TRINKET_TYPE) {
      VANILLA_TRINKETS_ARRAY.push(trinketType);
    } else {
      MODDED_TRINKETS_ARRAY.push(trinketType);
    }
  }

  ALL_TRINKETS_ARRAY.sort();
  for (const trinketType of ALL_TRINKETS_ARRAY) {
    ALL_TRINKETS_SET.add(trinketType);
  }

  VANILLA_TRINKETS_ARRAY.sort();
  for (const trinketType of VANILLA_TRINKETS_ARRAY) {
    VANILLA_TRINKETS_SET.add(trinketType);
  }

  MODDED_TRINKETS_ARRAY.sort();
  for (const trinketType of MODDED_TRINKETS_ARRAY) {
    MODDED_TRINKETS_SET.add(trinketType);
  }
}

/**
 * Returns an array containing every valid trinket type in the game, including modded trinkets.
 *
 * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups, then
 * use the `getTrinketSet` helper function instead.
 */
export function getModdedTrinketArray(): readonly TrinketType[] {
  // Lazy initialize the arrays/sets.
  initTrinketArraysAndSets();

  return MODDED_TRINKETS_ARRAY;
}

/**
 * Returns a set containing every valid trinket type in the game, including modded trinkets.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order, then
 * use the `getTrinketArray` helper function instead.
 */
export function getModdedTrinketSet(): ReadonlySet<TrinketType> {
  // Lazy initialize the arrays/sets.
  initTrinketArraysAndSets();

  return MODDED_TRINKETS_SET;
}

/**
 * Returns an array containing every modded trinket type in the game.
 *
 * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups, then
 * use the `getModdedTrinketSet` helper function instead.
 */
export function getTrinketArray(): readonly TrinketType[] {
  // Lazy initialize the arrays/sets.
  initTrinketArraysAndSets();

  return ALL_TRINKETS_ARRAY;
}

/**
 * Returns a set containing every modded trinket type in the game.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order, then
 * use the `getModdedTrinketArray` helper function instead.
 */
export function getTrinketSet(): ReadonlySet<TrinketType> {
  // Lazy initialize the arrays/sets.
  initTrinketArraysAndSets();

  return ALL_TRINKETS_SET;
}

/**
 * Returns an array containing every valid vanilla trinket type in the game.
 *
 * Use this if you need to iterate over the trinkets in order. If you need to do O(1) lookups, then
 * use the `getVanillaTrinketSet` helper function instead.
 */
export function getVanillaTrinketArray(): readonly TrinketType[] {
  // Lazy initialize the arrays/sets.
  initTrinketArraysAndSets();

  return VANILLA_TRINKETS_ARRAY;
}

/**
 * Returns a set containing every valid vanilla trinket type in the game.
 *
 * Use this if you need to do O(1) lookups. If you need to iterate over the trinkets in order, then
 * use the `getVanillaTrinketArray` helper function instead.
 */
export function getVanillaTrinketSet(): ReadonlySet<TrinketType> {
  // Lazy initialize the arrays/sets.
  initTrinketArraysAndSets();

  return VANILLA_TRINKETS_SET;
}
