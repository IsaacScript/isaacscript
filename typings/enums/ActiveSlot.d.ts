declare enum ActiveSlot {
  /** The main slot for active items, in the top-left-hand corner. */
  SLOT_PRIMARY = 0,

  /** The Schoolbag slot, to the top-left of the active item. */
  SLOT_SECONDARY = 1,

  /** The permanent card/pill slot. (Several Tainted characters use this slot.) */
  SLOT_POCKET = 2,

  /** A single use card/pill slot (used by Dice Bag). */
  SLOT_POCKET2 = 3,
}
