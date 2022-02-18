import { getMaxCollectibleID } from "./collectibles";
import { copySet } from "./set";

const COLLECTIBLE_SET = new Set<CollectibleType | int>();

function initCollectibleSet() {
  const itemConfig = Isaac.GetItemConfig();
  const maxCollectibleID = getMaxCollectibleID();

  for (
    let collectibleType = 1;
    collectibleType <= maxCollectibleID;
    collectibleType++
  ) {
    const itemConfigItem = itemConfig.GetCollectible(collectibleType);
    if (itemConfigItem !== undefined) {
      COLLECTIBLE_SET.add(collectibleType);
    }
  }
}

/** Returns a set containing every valid collectible type in the game, including modded items. */
export function getCollectibleSet(): Set<CollectibleType | int> {
  // Lazy initialize the set
  if (COLLECTIBLE_SET.size === 0) {
    initCollectibleSet();
  }

  return copySet(COLLECTIBLE_SET);
}
