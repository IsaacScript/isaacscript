export default interface PickingUpItem {
  id: int;
  /** Needed so that we can distinguish between picking up a collectible and a trinket. */
  type: ItemType;
}
