import { CollectibleType } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import { FIRST_COLLECTIBLE_TYPE, MAX_COLLECTIBLE_TYPE } from "../constantsMax";
import { copySet } from "./set";
import { irange } from "./utils";

const COLLECTIBLE_SET = new Set<CollectibleType>();

function initCollectibleSet() {
  for (const collectibleTypeInt of irange(
    FIRST_COLLECTIBLE_TYPE,
    MAX_COLLECTIBLE_TYPE,
  )) {
    const collectibleType = collectibleTypeInt as CollectibleType;
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
