export const CHARACTERS_WITH_NO_RED_HEARTS = new Set<PlayerType>([
  PlayerType.PLAYER_XXX, // 4
  PlayerType.PLAYER_BLACKJUDAS, // 12
  PlayerType.PLAYER_JUDAS_B, // 24
  PlayerType.PLAYER_XXX_B, // 25
  PlayerType.PLAYER_THEFORGOTTEN_B, // 35
  PlayerType.PLAYER_BETHANY_B, // 36
]);

export const DISTANCE_OF_GRID_TILE = 40;
export const DOOR_HITBOX_DISTANCE = 11;

/**
 * The random items that appear when the player has TMTRAINER are generated on the fly as they are
 * encountered by the player. The first TMTRAINER item takes the final possible 32 bit number. The
 * second TMTRAINER item subtracts one from that, and so on.
 */
export const FIRST_GLITCHED_COLLECTIBLE_TYPE = (1 << 32) - 1;

export const GENESIS_ROOM_VARIANT = 1000;
export const GOLDEN_TRINKET_SHIFT = 1 << 15;
export const GRID_INDEX_CENTER_OF_1X1_ROOM = 67;

export const GAME_FRAMES_PER_SECOND = 30;
export const ISAAC_FRAMES_PER_SECOND = 60;

/** In a 2x2 room, there can be 8 doors. */
export const MAX_NUM_DOORS = 8;

/** The game can only handle up to four different players. */
export const MAX_NUM_INPUTS = 4;

export const MAX_PLAYER_POCKET_ITEM_SLOTS = 4;

/**
 * The floor is represented by a 13x13 grid. Room indexes start at 0. The first row is represented
 * by grid indexes from 0 to 12. The second row is represented by grid indexes from 13 to 25, and so
 * on. The maximum room index possible is 168. (It is not 169 because we start at 0 instead of 1.)
 */
export const MAX_ROOM_INDEX = 168;

/**
 * As the player continues to move in a direction, they will accelerate. When going from one wall to
 * another in a 2x2 room at 2.0 speed (the maximum that the speed stat can rise to), the amount of
 * units moved per update frame will climb to around 9.797 as they hit the opposite wall. The
 * constant specifies a value of 9.8 to be safe.
 */
export const MAX_PLAYER_SPEED_IN_UNITS = 9.8;

export const MAX_PLAYER_TRINKET_SLOTS = 2;

export const MAX_VANILLA_COLLECTIBLE_TYPE =
  CollectibleType.COLLECTIBLE_DECAP_ATTACK;

export const SINGLE_USE_ACTIVE_COLLECTIBLE_TYPES = new Set<CollectibleType>([
  CollectibleType.COLLECTIBLE_FORGET_ME_NOW, // 127
  CollectibleType.COLLECTIBLE_EDENS_SOUL, // 490
  CollectibleType.COLLECTIBLE_ALABASTER_BOX, // 585
  CollectibleType.COLLECTIBLE_PLAN_C, // 475
  CollectibleType.COLLECTIBLE_MAMA_MEGA, // 483
  CollectibleType.COLLECTIBLE_SACRIFICIAL_ALTAR, // 536
  CollectibleType.COLLECTIBLE_DEATH_CERTIFICATE, // 628
  CollectibleType.COLLECTIBLE_R_KEY, // 636
]);

export const TSTL_MAP_BRAND = "__TSTL_MAP";
export const TSTL_SET_BRAND = "__TSTL_SET";
export const TSTL_CLASS_BRAND = "__TSTL_CLASS";
export const TSTL_OBJECT_WITH_NUMBER_KEYS_BRAND =
  "__TSTL_OBJECT_WITH_NUMBER_KEYS";
export const VECTOR_BRAND = "__VECTOR";
