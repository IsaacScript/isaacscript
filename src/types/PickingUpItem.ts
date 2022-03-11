export interface PickingUpItem {
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  itemType: ItemType;

  /** Equal to either the collectible type or the trinket type. */
  subType: CollectibleType | TrinketType | int;
}

const DEFAULT_ITEM_TYPE = ItemType.ITEM_NULL;
const DEFAULT_SUB_TYPE = CollectibleType.COLLECTIBLE_NULL;

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
