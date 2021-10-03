import { getMaxCollectibleID } from "./functions/collectibles";

export const COLLECTIBLE_SET = new Set<CollectibleType | int>();

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
