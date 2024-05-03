export enum ActiveSlot {
  /**
   * Used for Repentogon, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  NONE = -1,

  /** The main slot for active items, in the top-left-hand corner. */
  PRIMARY = 0,

  /** The Schoolbag slot, to the top-left of the active item. */
  SECONDARY = 1,

  /** The permanent card/pill slot. Several Tainted characters use this slot. */
  POCKET = 2,

  /** A single use card/pill slot. Used by Dice Bag. */
  POCKET_SINGLE_USE = 3,
}
