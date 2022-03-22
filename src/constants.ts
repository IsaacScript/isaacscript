/**
 * The distance of the laser when Azazel does not have any range up items yet.
 * For more info, see the documentation for the `getAzazelBrimstoneDistance` function.
 */
export const AZAZEL_DEFAULT_BRIMSTONE_DISTANCE = 75.125;

/**
 * The path to the png file for collectible items during Curse of the Blind, making them appear with
 * a red question mark.
 */
export const BLIND_ITEM_PNG_PATH = "gfx/items/collectibles/questionmark.png";

/** Bombs explode when their frame count is equal to this value. */
export const BOMB_EXPLODE_FRAME = 45;

export const DEFAULT_ITEM_POOL_TYPE = ItemPoolType.POOL_TREASURE;

/** This is also the distance that a player spawns from the door that they enter a room from. */
export const DISTANCE_OF_GRID_TILE = 40;

export const DOOR_HITBOX_DISTANCE = 11;

/**
 * When Eggies take fatal damage, they go into NpcState.STATE_SUICIDE and spawn 14 Swarm Spiders
 * while their StateFrame ticks upwards. The 14th spider appears when the StateFrame is at this
 * value.
 */
export const EGGY_STATE_FRAME_OF_FINAL_SPIDER = 45;

/**
 * A non-existent or completely transparent PNG file for use in clearing sprites. For more
 * information, see the documentation for the `clearSprite` helper function.
 */
export const EMPTY_PNG_PATH = "gfx/none.png";

/** As of Repentance, the final stage is floor 13 (which is the Home floor). */
export const FINAL_STAGE = LevelStage.NUM_STAGES - 1;

/**
 * The random items that appear when the player has TMTRAINER are generated on the fly as they are
 * encountered by the player. The first TMTRAINER item takes the final possible 32 bit number. The
 * second TMTRAINER item subtracts one from that, and so on.
 */
export const FIRST_GLITCHED_COLLECTIBLE_TYPE = (1 << 32) - 1;

export const GAME_FRAMES_PER_SECOND = 30;
export const GRID_INDEX_CENTER_OF_1X1_ROOM = 67;
export const ISAAC_FRAMES_PER_SECOND = 60;

/** In a 2x2 room, there can be 8 doors. */
export const MAX_NUM_DOORS = 8;

/**
 * The game has a limit on the number of currently spawned familiars and will refuse to spawn any
 * more if it reaches the limit. Blue flies and blue spiders have a lower priority and will be
 * deleted to make room for other familiars.
 */
export const MAX_NUM_FAMILIARS = 64;

/** The game can only handle up to four different players. */
export const MAX_NUM_INPUTS = 4;

/** With Birthright, it is possible for Magdalene to have 18 heart containers. */
export const MAX_PLAYER_HEART_CONTAINERS = 18;

export const MAX_PLAYER_POCKET_ITEM_SLOTS = 4;

/**
 * As the player continues to move in a direction, they will accelerate. When going from one wall to
 * another in a 2x2 room at 2.0 speed (the maximum that the speed stat can rise to), the amount of
 * units moved per update frame will climb to around 9.797 as they hit the opposite wall. The
 * constant specifies a value of 9.8 to be safe.
 */
export const MAX_PLAYER_SPEED_IN_UNITS = 9.8;

export const MAX_PLAYER_TRINKET_SLOTS = 2;

/**
 * The floor is represented by a 13x13 grid. Room indexes start at 0. The first row is represented
 * by grid indexes from 0 to 12. The second row is represented by grid indexes from 13 to 25, and so
 * on. The maximum room index possible is 168. (It is not 169 because we start at 0 instead of 1.)
 */
export const MAX_ROOM_INDEX = 168;

/**
 * The maximum speed stat that a player can have. Any additional speed beyond this will not take
 * effect.
 */
export const MAX_SPEED_STAT = 2.0;

export const MAX_VANILLA_CHARACTER = PlayerType.NUM_PLAYER_TYPES - 1;
export const MAX_VANILLA_COLLECTIBLE_TYPE =
  CollectibleType.NUM_COLLECTIBLES - 1;

export const NUM_DIMENSIONS = 3;

export const SECOND_IN_MILLISECONDS = 1000;
export const MINUTE_IN_MILLISECONDS = 60 * SECOND_IN_MILLISECONDS; // eslint-disable-line sort-exports/sort-exports

export const ONE_BY_ONE_ROOM_GRID_SIZE = 135;

/**
 * In vanilla, this is part of the `PillColor` enum, but we implement it as a constant in
 * IsaacScript since it is not a real pill color.
 *
 * (1 << 11) - 1
 */
export const PILL_COLOR_MASK = 2047;

/**
 * In vanilla, this is part of the `PillColor` enum, but we implement it as a constant in
 * IsaacScript since it is not a real pill color.
 *
 * 1 << 11
 */
export const PILL_GIANT_FLAG = 2048;

/**
 * Add this to a `TrinketType` to get the corresponding golden trinket type.
 *
 * In vanilla, this is part of the `TrinketType` enum, but we implement it as a constant in
 * IsaacScript since it is not a real trinket type.
 *
 * 1 << 15
 */
export const TRINKET_GOLDEN_FLAG = 32768;

/**
 * In vanilla, this is part of the `TrinketType` enum, but we implement it as a constant in
 * IsaacScript since it is not a real trinket type.
 *
 * (1 << 15) - 1
 */
export const TRINKET_ID_MASK = 32767;

/**
 * This is the number of draw coordinates that each heart spans on the UI in the upper left hand
 * corner.
 */
export const UI_HEART_WIDTH = 12;
