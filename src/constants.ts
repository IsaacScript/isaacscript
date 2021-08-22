export const DISTANCE_OF_GRID_TILE = 40;
export const DOOR_HITBOX_DISTANCE = 11;

/**
 * The random items that appear when the player has TMTRAINER are generated on the fly as they are
 * encountered by the player. The first TMTRAINER item takes the final possible 32 bit number. The
 * second TMTRAINER item subtracts one from that, and so on.
 */
export const FIRST_GLITCHED_COLLECTIBLE_TYPE = (1 << 32) - 1;

export const EXCLUDED_CHARACTERS = [
  PlayerType.PLAYER_ESAU, // 20
  PlayerType.PLAYER_THESOUL_B, // 40
];

// Glitched items start at id 4294967295 (the final 32-bit integer) and increment backwards
export const GLITCHED_ITEM_THRESHOLD = 4000000000;

/** In a 2x2 room, there can be 8 doors. */
export const MAX_NUM_DOORS = 8;

/** The game can only handle up to four different players. */
export const MAX_NUM_INPUTS = 4;

export const MAX_VANILLA_COLLECTIBLE_TYPE =
  CollectibleType.COLLECTIBLE_DECAP_ATTACK;

/**
 * As the player continues to move in a direction, they will accelerate. When going from one wall to
 * another in a 2x2 room at 2.0 speed (the maximum that the speed stat can rise to), the amount of
 * units moved per update frame will climb to around 9.797 as they hit the opposite wall. The
 * constant specifies a value of 9.8 to be safe.
 */
export const MAX_PLAYER_SPEED_IN_UNITS = 9.8;

/**
 * This is the ShiftIdx that Blade recommended after having reviewing the game's internal functions.
 * Any value between 0 and 80 should work equally well.
 * https://www.jstatsoft.org/article/view/v008i14/xorshift.pdf
 */
export const RECOMMENDED_SHIFT_IDX = 35;

const GRID_ENTITIES_BETWEEN_RENDER_SURFACES = Vector(17, 11); // 17 on the x axis, 11 on the y axis
const GRID_ENTITY_RENDER_SIZE = Vector(26, 26);
export const SCREEN_SIZE_BETWEEN_RENDER_SURFACES = GRID_ENTITY_RENDER_SIZE.mul(
  GRID_ENTITIES_BETWEEN_RENDER_SURFACES,
);

export const SURROUNDING_GRID_INDEXES_DELTA = [
  -16, // Above-left
  -15, // Above
  -14, // Above-right
  -1, // Left
  1, // Right
  14, // Below-left
  15, // Below
  16, // Below-right
];
