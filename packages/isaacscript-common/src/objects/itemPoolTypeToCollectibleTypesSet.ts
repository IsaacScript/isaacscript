import type {
  CollectibleType,
  ItemPoolType,
} from "isaac-typescript-definitions";
import { ITEM_POOL_TYPE_VALUES } from "../cachedEnumValues";
import * as itemPoolsJSON from "../data/itempools.json";
import { asCollectibleType, parseIntSafe } from "../functions/types";
import { ITEM_POOL_TYPE_TO_ITEM_POOL_NAME } from "../maps/itemPoolTypeToItemPoolName";

export const ITEM_POOL_TYPE_TO_COLLECTIBLE_TYPES_SET: Readonly<
  Record<ItemPoolType, ReadonlySet<CollectibleType>>
> = (() => {
  const itemPoolTypeToCollectibleTypes: Partial<
    Record<ItemPoolType, ReadonlySet<CollectibleType>>
  > = {};

  for (const itemPoolType of ITEM_POOL_TYPE_VALUES) {
    const itemPoolJSON = getItemPoolJSON(itemPoolType);
    if (itemPoolJSON === undefined) {
      itemPoolTypeToCollectibleTypes[itemPoolType] = new Set();
    } else {
      const collectibleTypesSet = new Set<CollectibleType>();

      for (const itemPoolJSONElement of itemPoolJSON.Item) {
        const collectibleTypeInt = parseIntSafe(itemPoolJSONElement.$.Id);
        if (collectibleTypeInt === undefined) {
          error(
            `Failed to parse a collectible type in the "itempools.json" file: ${itemPoolJSONElement.$.Id}`,
          );
        }

        const collectibleType = asCollectibleType(collectibleTypeInt);
        collectibleTypesSet.add(collectibleType);
      }

      itemPoolTypeToCollectibleTypes[itemPoolType] = collectibleTypesSet;
    }
  }

  return itemPoolTypeToCollectibleTypes as Record<
    ItemPoolType,
    ReadonlySet<CollectibleType>
  >;
})();

function getItemPoolJSON(itemPoolType: ItemPoolType) {
  const itemPoolName = ITEM_POOL_TYPE_TO_ITEM_POOL_NAME[itemPoolType];

  const itemPoolsJSONArray = itemPoolsJSON.ItemPools.Pool;

  return itemPoolsJSONArray.find(
    (itemPoolJSON) => itemPoolJSON.$.Name === itemPoolName,
  );
}
