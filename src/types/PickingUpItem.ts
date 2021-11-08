export interface PickingUpItem {
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  type: ItemType;

  id: int;
}
