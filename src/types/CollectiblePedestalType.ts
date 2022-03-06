/** Corresponds to the overlay frame number in "005.100_collectible.anm2". */
export enum CollectiblePedestalType {
  /**
   * Used for e.g. shop collectibles. In the "005.100_collectible.anm2" file, this is represented by
   * the final frame.
   */
  NONE = -1,

  /** The normal grey pedestal. */
  NORMAL,

  /** From SlotVariant.FORTUNE_TELLING_MACHINE (3) */
  FORTUNE_TELLING_MACHINE,

  /** From SlotVariant.BLOOD_DONATION_MACHINE (2) */
  BLOOD_DONATION_MACHINE,

  /** From SlotVariant.SLOT_MACHINE (1) */
  SLOT_MACHINE,

  /** From PickupVariant.LOCKEDCHEST (60) */
  LOCKEDCHEST,

  /** From PickupVariant.PICKUP_REDCHEST (360) */
  REDCHEST,

  /** From PickupVariant.PICKUP_BOMBCHEST (51) */
  BOMBCHEST,

  /** From PickupVariant.PICKUP_SPIKEDCHEST (52) */
  SPIKEDCHEST,

  /** From PickupVariant.PICKUP_ETERNALCHEST (53) */
  ETERNALCHEST,

  /** From SlotVariant.MOMS_DRESSING_TABLE (12) */
  MOMS_DRESSING_TABLE,

  /** From PickupVariant.PICKUP_CHEST (50) */
  CHEST,

  /** From PickupVariant.PICKUP_MOMSCHEST (390) */
  MOMSCHEST,

  /** From PickupVariant.PICKUP_OLDCHEST (55) */
  OLDCHEST,

  /** From PickupVariant.PICKUP_WOODENCHEST (56) */
  WOODENCHEST,

  /** From PickupVariant.PICKUP_MEGACHEST (57) */
  MEGACHEST,
}
