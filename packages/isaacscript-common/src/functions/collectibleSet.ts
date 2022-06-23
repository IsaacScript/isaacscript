import { CollectibleType } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import { LAST_VANILLA_COLLECTIBLE_TYPE } from "../constantsFirstLast";
import { getCollectibleTypeRange } from "./collectibles";

const ALL_COLLECTIBLES_SET = new Set<CollectibleType>();
const VANILLA_COLLECTIBLES_SET = new Set<CollectibleType>();
const MODDED_COLLECTIBLES_SET = new Set<CollectibleType>();

function initCollectibleSets() {
  for (const collectibleType of getCollectibleTypeRange()) {
    const itemConfigItem = itemConfig.GetCollectible(collectibleType);
    if (itemConfigItem === undefined) {
      continue;
    }

    ALL_COLLECTIBLES_SET.add(collectibleType);
    if (collectibleType <= LAST_VANILLA_COLLECTIBLE_TYPE) {
      VANILLA_COLLECTIBLES_SET.add(collectibleType);
    } else {
      MODDED_COLLECTIBLES_SET.add(collectibleType);
    }
  }
}

/**
 * Returns a set containing every valid collectible type in the game, including modded collectibles.
 */
export function getCollectibleSet(): ReadonlySet<CollectibleType> {
  // Lazy initialize the sets.
  if (ALL_COLLECTIBLES_SET.size === 0) {
    initCollectibleSets();
  }

  return ALL_COLLECTIBLES_SET;
}

/** Returns a set containing every modded collectible type in the game. */
export function getModdedCollectibleSet(): ReadonlySet<CollectibleType> {
  // Lazy initialize the sets.
  if (ALL_COLLECTIBLES_SET.size === 0) {
    initCollectibleSets();
  }

  return MODDED_COLLECTIBLES_SET;
}

/** Returns a set containing every valid vanilla collectible type in the game. */
export function getVanillaCollectibleSet(): ReadonlySet<CollectibleType> {
  // Lazy initialize the sets.
  if (ALL_COLLECTIBLES_SET.size === 0) {
    initCollectibleSets();
  }

  return VANILLA_COLLECTIBLES_SET;
}
