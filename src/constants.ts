/**
 * This is the ShiftIdx that Blade recommended after having reviewing the game's internal functions.
 * Any value between 0 and 80 should work equally well.
 * https://www.jstatsoft.org/article/view/v008i14/xorshift.pdf
 */
export const RECOMMENDED_SHIFT_IDX = 35;

/** The game can only handle up to four different players. */
export const NUM_INPUTS = 4;
