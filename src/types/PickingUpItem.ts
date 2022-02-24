export interface PickingUpItem {
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  itemType: ItemType;

  /** Equal to either the collectible type or the trinket type. */
  subType: CollectibleType | TrinketType | int;
}
