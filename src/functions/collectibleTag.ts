import { CollectibleType, ItemConfigTag } from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import { FIRST_COLLECTIBLE_TYPE, MAX_COLLECTIBLE_TYPE } from "../constantsMax";
import { getEnumValues } from "./enums";
import { getFlagName } from "./flag";
import { getPlayerCollectibleCount } from "./player";
import { copySet } from "./set";
import { irange } from "./utils";

const TAG_TO_COLLECTIBLE_TYPES_MAP = new Map<
  ItemConfigTag,
  Set<CollectibleType>
>();

function initTagMap() {
  // The tag to collectible types map should be valid for every tag, so we initialize it with empty
  // sets.
  for (const itemConfigTag of getEnumValues(ItemConfigTag)) {
    TAG_TO_COLLECTIBLE_TYPES_MAP.set(itemConfigTag, new Set());
  }

  for (const collectibleTypeInt of irange(
    FIRST_COLLECTIBLE_TYPE,
    MAX_COLLECTIBLE_TYPE,
  )) {
    const collectibleType = collectibleTypeInt as CollectibleType;

    for (const itemConfigTag of getEnumValues(ItemConfigTag)) {
      if (!collectibleHasTag(collectibleType, itemConfigTag)) {
        continue;
      }

      const collectibleTypesSet =
        TAG_TO_COLLECTIBLE_TYPES_MAP.get(itemConfigTag);
      if (collectibleTypesSet === undefined) {
        const flagName = getFlagName(itemConfigTag, ItemConfigTag);
        error(`Failed to get the collectible types for item tag: ${flagName}`);
      }
      collectibleTypesSet.add(collectibleType);
    }
  }
}

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

/**
 * Helper function to get all of the collectible types in the game that have a certain tag.
 *
 * For example, to get all of the collectible types that count as offensive for the purposes of
 * Tainted Lost:
 *
 * ```ts
 * const offensiveCollectibleTypes = getCollectibleTypesWithTag(ItemConfigTag.OFFENSIVE);
 * ```
 */
export function getCollectibleTypesWithTag(
  itemConfigTag: ItemConfigTag,
): Set<CollectibleType> {
  // Lazy initialize the map.
  if (TAG_TO_COLLECTIBLE_TYPES_MAP.size === 0) {
    initTagMap();
  }

  const collectibleTypes = TAG_TO_COLLECTIBLE_TYPES_MAP.get(itemConfigTag);
  if (collectibleTypes === undefined) {
    error(
      `The item config tag of ${itemConfigTag} is not a valid value of the ItemConfigTag enum.`,
    );
  }

  return copySet(collectibleTypes);
}

/** Returns the number of items that a player has towards a particular transformation. */
export function getPlayerNumCollectiblesWithTag(
  player: EntityPlayer,
  itemConfigTag: ItemConfigTag,
): int {
  const collectibleTypesSet = getCollectibleTypesWithTag(itemConfigTag);
  return getPlayerCollectibleCount(player, ...collectibleTypesSet.values());
}

export function isQuestCollectible(collectibleType: CollectibleType): boolean {
  return collectibleHasTag(collectibleType, ItemConfigTag.QUEST);
}
