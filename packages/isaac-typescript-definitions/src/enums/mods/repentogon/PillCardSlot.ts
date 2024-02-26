/**
 * This enum is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export enum PillCardSlot {
  PRIMARY = 0,
  SECONDARY = 1,

  /** Offset by 2 of: Pocket Item, Dice Bag Item, Pill-card (Otherwise unused). */
  TERTIARY = 2,

  /** Offset by Pocket Item and Dice Bag Item and Pill-card (Otherwise unused). */
  QUATERNARY = 3,
}
