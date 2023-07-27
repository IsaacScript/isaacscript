import type { CollectibleType } from "isaac-typescript-definitions";
import { ItemConfigTag } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";

export function collectibleHasTag(
  collectibleType: CollectibleType,
  tag: ItemConfigTag,
): boolean {
  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return false;
  }

  return itemConfigItem.HasTags(tag);
}

export function isQuestCollectible(collectibleType: CollectibleType): boolean {
  return collectibleHasTag(collectibleType, ItemConfigTag.QUEST);
}
