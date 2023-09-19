import type { CollectibleType } from "isaac-typescript-definitions";
import { ItemConfigTag } from "isaac-typescript-definitions";
import { itemConfig } from "../core/cachedClasses";
import { isInteger } from "./types";

export function collectibleHasTag(
  collectibleOrCollectibleType: EntityPickupCollectible | CollectibleType,
  tag: ItemConfigTag,
): boolean {
  const collectibleType = isInteger(collectibleOrCollectibleType)
    ? collectibleOrCollectibleType
    : collectibleOrCollectibleType.SubType;

  const itemConfigItem = itemConfig.GetCollectible(collectibleType);
  if (itemConfigItem === undefined) {
    return false;
  }

  return itemConfigItem.HasTags(tag);
}

export function isQuestCollectible(
  collectibleOrCollectibleType: EntityPickupCollectible | CollectibleType,
): boolean {
  const collectibleType = isInteger(collectibleOrCollectibleType)
    ? collectibleOrCollectibleType
    : collectibleOrCollectibleType.SubType;

  return collectibleHasTag(collectibleType, ItemConfigTag.QUEST);
}
