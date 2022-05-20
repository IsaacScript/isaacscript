import { CollectibleType } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import { getCollectibleTypeRange } from "./collectibles";
import { copySet } from "./set";

const COLLECTIBLE_SET = new Set<CollectibleType>();

function initCollectibleSet() {
  for (const collectibleType of getCollectibleTypeRange()) {
    const itemConfigItem = itemConfig.GetCollectible(collectibleType);
    if (itemConfigItem !== undefined) {
      COLLECTIBLE_SET.add(collectibleType);
    }
  }
}

/** Returns a set containing every valid collectible type in the game, including modded items. */
export function getCollectibleSet(): Set<CollectibleType> {
  // Lazy initialize the set.
  if (COLLECTIBLE_SET.size === 0) {
    initCollectibleSet();
  }

  return copySet(COLLECTIBLE_SET);
}

/**
 * Helper function to get the number of valid collectibles that exist. (This is not simply equal to
 * the highest collectible type, because collectible types are not contiguous.)
 *
 * Note that there is no corresponding `getTrinketsNum` function because trinket types are
 * contiguous. Use the `NUM_TRINKET_TYPES` constant instead.
 */
export function getCollectiblesNum(): int {
  // Lazy initialize the set.
  if (COLLECTIBLE_SET.size === 0) {
    initCollectibleSet();
  }

  return COLLECTIBLE_SET.size;
}
