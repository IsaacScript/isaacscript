/* eslint-disable isaacscript/member-ordering */

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

  /** From PickupVariant.LOCKED_CHEST (60) */
  LOCKED_CHEST,

  /** From PickupVariant.RED_CHEST (360) */
  RED_CHEST,

  /** From PickupVariant.BOMB_CHEST (51) */
  BOMB_CHEST,

  /** From PickupVariant.SPIKED_CHEST (52) */
  SPIKED_CHEST,

  /** From PickupVariant.ETERNAL_CHEST (53) */
  ETERNAL_CHEST,

  /** From SlotVariant.MOMS_DRESSING_TABLE (12) */
  MOMS_DRESSING_TABLE,

  /** From PickupVariant.CHEST (50) */
  CHEST,

  /** From PickupVariant.MOMS_CHEST (390) */
  MOMS_CHEST,

  /** From PickupVariant.OLD_CHEST (55) */
  OLD_CHEST,

  /** From PickupVariant.WOODEN_CHEST (56) */
  WOODEN_CHEST,

  /** From PickupVariant.MEGA_CHEST (57) */
  MEGA_CHEST,
}
