export default class PickingUpItem {
  id: CollectibleType | TrinketType = CollectibleType.COLLECTIBLE_NULL;
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  type = ItemType.ITEM_NULL;
}
