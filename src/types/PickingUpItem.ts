import {
  CollectibleType,
  ItemType,
  TrinketType,
} from "isaac-typescript-definitions";

export interface PickingUpItem {
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  itemType: ItemType;

  /** Equal to either the collectible type or the trinket type. */
  subType: CollectibleType | TrinketType;
}

const DEFAULT_ITEM_TYPE = ItemType.NULL;
const DEFAULT_SUB_TYPE = CollectibleType.NULL;

export function newPickingUpItem(): PickingUpItem {
  return {
    itemType: DEFAULT_ITEM_TYPE,
    subType: DEFAULT_SUB_TYPE,
  };
}

export function resetPickingUpItem(pickingUpItem: PickingUpItem): void {
  pickingUpItem.itemType = DEFAULT_ITEM_TYPE;
  pickingUpItem.subType = DEFAULT_SUB_TYPE;
}
