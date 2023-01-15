/** This is used in the `POST_SLOT_DESTROYED` custom callback. */
export enum SlotDestructionType {
  /**
   * When a machine or a beggar is blown up by a bomb or is otherwise removed without spawning a
   * collectible.
   *
   * Note that the destruction type for a Crane Game will be `SlotDestructionType.NORMAL`, even if
   * it destroyed via spawning three separate collectibles.
   */
  NORMAL,

  /**
   * When a machine or a beggar is removed while spawning a collectible reward.
   *
   * Note that the destruction type for a Crane Game will be `SlotDestructionType.NORMAL`, even if
   * it destroyed via spawning three separate collectibles.
   */
  COLLECTIBLE_PAYOUT,
}
