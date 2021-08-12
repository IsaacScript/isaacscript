export default interface PickingUpItem {
  id: CollectibleType | TrinketType;
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  type: ItemType;
}
