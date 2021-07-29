export const EXCLUDED_CHARACTERS = [
  PlayerType.PLAYER_ESAU, // 20
  PlayerType.PLAYER_THESOUL_B, // 40
];

export const MAX_DAMAGE_FLAG_SHIFT = 32;
export const MAX_ENTITY_FLAG_SHIFT = 59;
export const MAX_PROJECTILE_FLAG_SHIFT = 57;
export const MAX_USE_FLAG_SHIFT = 10;

/** The game can only handle up to four different players. */
export const NUM_INPUTS = 4;

/**
 * This is the ShiftIdx that Blade recommended after having reviewing the game's internal functions.
 * Any value between 0 and 80 should work equally well.
 * https://www.jstatsoft.org/article/view/v008i14/xorshift.pdf
 */
export const RECOMMENDED_SHIFT_IDX = 35;
