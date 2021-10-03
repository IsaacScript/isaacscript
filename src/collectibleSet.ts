import { getMaxCollectibleID } from "./functions/collectibles";

const COLLECTIBLE_SET = new Set<CollectibleType | int>();

initSet();

function initSet() {
  const itemConfig = Isaac.GetItemConfig();

  for (
    let collectibleType = 1;
    collectibleType <= getMaxCollectibleID();
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
  return new Set(COLLECTIBLE_SET);
}
