/** For `EntityType.EFFECT` (1000), `EffectVariant.DICE_FLOOR` (76) */
export enum DiceFloorSubType {
  /** Has the same effect as using a D4. */
  ONE_PIP = 0,

  /** Has the same effect as using a D20. */
  TWO_PIP = 1,

  /**
   * Rerolls all pickups and trinkets on the floor, including items inside of a shop, excluding
   * collectibles.
   */
  THREE_PIP = 2,

  /** Rerolls all collectibles on the floor. */
  FOUR_PIP = 3,

  /** Has the same effect as using a Forget Me Now. */
  FIVE_PIP = 4,

  /** Has the combined effect of a 1-pip, 3-pip and 4-pip dice room. */
  SIX_PIP = 5,
}
