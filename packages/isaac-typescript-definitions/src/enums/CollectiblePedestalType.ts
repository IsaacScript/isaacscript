/** Corresponds to the overlay frame number in "005.100_collectible.anm2". */
export enum CollectiblePedestalType {
  /**
   * Used for e.g. shop collectibles. In the "005.100_collectible.anm2" file, this is represented by
   * the final frame.
   */
  NONE = -1,

  /** The normal grey pedestal. */
  NORMAL = 0,

  /** From `SlotVariant.FORTUNE_TELLING_MACHINE` (3). */
  FORTUNE_TELLING_MACHINE = 1,

  /** From `SlotVariant.BLOOD_DONATION_MACHINE` (2). */
  BLOOD_DONATION_MACHINE = 2,

  /** From `SlotVariant.SLOT_MACHINE` (1). */
  SLOT_MACHINE = 3,

  /** From `PickupVariant.LOCKED_CHEST` (60). */
  LOCKED_CHEST = 4,

  /** From `PickupVariant.RED_CHEST` (360). */
  RED_CHEST = 5,

  /** From `PickupVariant.BOMB_CHEST` (51). */
  BOMB_CHEST = 6,

  /** From `PickupVariant.SPIKED_CHEST` (52). */
  SPIKED_CHEST = 7,

  /** From `PickupVariant.ETERNAL_CHEST` (53). */
  ETERNAL_CHEST = 8,

  /** From `SlotVariant.MOMS_DRESSING_TABLE` (12). */
  MOMS_DRESSING_TABLE = 9,

  /** From `PickupVariant.CHEST` (50). */
  CHEST = 10,

  /** From `PickupVariant.MOMS_CHEST` (390). */
  MOMS_CHEST = 11,

  /** From `PickupVariant.OLD_CHEST` (55). */
  OLD_CHEST = 12,

  /** From `PickupVariant.WOODEN_CHEST` (56). */
  WOODEN_CHEST = 13,

  /** From `PickupVariant.MEGA_CHEST` (57). */
  MEGA_CHEST = 14,
}
