export const CHARACTERS_WITH_NO_RED_HEARTS: PlayerType[] = [
  PlayerType.PLAYER_XXX, // 4
  PlayerType.PLAYER_BLACKJUDAS, // 12
  PlayerType.PLAYER_JUDAS_B, // 24
  PlayerType.PLAYER_XXX_B, // 25
  PlayerType.PLAYER_THEFORGOTTEN_B, // 35
  PlayerType.PLAYER_BETHANY_B, // 36
];

export const DISTANCE_OF_GRID_TILE = 40;
export const DOOR_HITBOX_DISTANCE = 11;

/**
 * The random items that appear when the player has TMTRAINER are generated on the fly as they are
 * encountered by the player. The first TMTRAINER item takes the final possible 32 bit number. The
 * second TMTRAINER item subtracts one from that, and so on.
 */
export const FIRST_GLITCHED_COLLECTIBLE_TYPE = (1 << 32) - 1;

export const GENESIS_ROOM_VARIANT = 1000;
export const GRID_INDEX_CENTER_OF_1X1_ROOM = 67;

/** In a 2x2 room, there can be 8 doors. */
export const MAX_NUM_DOORS = 8;

/** The game can only handle up to four different players. */
export const MAX_NUM_INPUTS = 4;

/**
 * As the player continues to move in a direction, they will accelerate. When going from one wall to
 * another in a 2x2 room at 2.0 speed (the maximum that the speed stat can rise to), the amount of
 * units moved per update frame will climb to around 9.797 as they hit the opposite wall. The
 * constant specifies a value of 9.8 to be safe.
 */
export const MAX_PLAYER_SPEED_IN_UNITS = 9.8;

export const MAX_VANILLA_COLLECTIBLE_TYPE =
  CollectibleType.COLLECTIBLE_DECAP_ATTACK;

export const TSTL_MAP_WITH_NUMBER_KEYS_IDENTIFIER =
  "__TSTL_MAP_WITH_NUMBER_KEYS";
