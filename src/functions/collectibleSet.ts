import { CollectibleType } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import { LAST_VANILLA_COLLECTIBLE_TYPE } from "../constantsMax";
import { getCollectibleTypeRange } from "./collectibles";
import { copySet } from "./set";

const ALL_COLLECTIBLES_SET = new Set<CollectibleType>();
const VANILLA_COLLECTIBLES_SET = new Set<CollectibleType>();
const MODDED_COLLECTIBLES_SET = new Set<CollectibleType>();

function initCollectibleSets() {
  for (const collectibleType of getCollectibleTypeRange()) {
    const itemConfigItem = itemConfig.GetCollectible(collectibleType);
    if (itemConfigItem !== undefined) {
      ALL_COLLECTIBLES_SET.add(collectibleType);
      if (collectibleType <= LAST_VANILLA_COLLECTIBLE_TYPE) {
        VANILLA_COLLECTIBLES_SET.add(collectibleType);
      } else {
        MODDED_COLLECTIBLES_SET.add(collectibleType);
      }
    }
  }
}

/**
 * Returns a set containing every valid collectible type in the game, including modded collectibles.
 */
export function getCollectibleSet(): Set<CollectibleType> {
  // Lazy initialize the set.
  if (ALL_COLLECTIBLES_SET.size === 0) {
    initCollectibleSets();
  }

  return copySet(ALL_COLLECTIBLES_SET);
}

/** Returns a set containing every modded collectible type in the game. */
export function getModdedCollectibleSet(): Set<CollectibleType> {
  // Lazy initialize the set.
  if (ALL_COLLECTIBLES_SET.size === 0) {
    initCollectibleSets();
  }

  return copySet(MODDED_COLLECTIBLES_SET);
}

/** Returns a set containing every valid vanilla collectible type in the game. */
export function getVanillaCollectibleSet(): Set<CollectibleType> {
  // Lazy initialize the set.
  if (ALL_COLLECTIBLES_SET.size === 0) {
    initCollectibleSets();
  }

  return copySet(VANILLA_COLLECTIBLES_SET);
}
