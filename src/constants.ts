export const CHARACTERS_WITH_NO_RED_HEARTS = new Set<PlayerType>([
  PlayerType.PLAYER_BLUEBABY, // 4
  PlayerType.PLAYER_BLACKJUDAS, // 12
  PlayerType.PLAYER_JUDAS_B, // 24
  PlayerType.PLAYER_BLUEBABY_B, // 25
  PlayerType.PLAYER_THEFORGOTTEN_B, // 35
  PlayerType.PLAYER_BETHANY_B, // 36
]);

/** This is also the distance that a player spawns from the door that they enter a room from. */
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

/**
 * This maps the GridEntityXMLType (i.e. the type contained in the room XML/STB file) to the
 * GridEntityType and the variant used by the game.
 */
export const GRID_ENTITY_XML_MAP = new Map<
  GridEntityXMLType,
  [GridEntityType, int]
>([
  [GridEntityXMLType.ROCK, [GridEntityType.GRID_ROCK, RockVariant.NORMAL]],
  [GridEntityXMLType.ROCK_BOMB, [GridEntityType.GRID_ROCK_BOMB, 0]],
  [GridEntityXMLType.ROCK_ALT, [GridEntityType.GRID_ROCK_ALT, 0]],
  [GridEntityXMLType.ROCKT, [GridEntityType.GRID_ROCKT, 0]],
  [GridEntityXMLType.ROCK_ALT2, [GridEntityType.GRID_ROCK_ALT2, 0]],
  [
    GridEntityXMLType.ROCK_EVENT,
    [GridEntityType.GRID_ROCK_ALT2, RockVariant.EVENT],
  ],
  [GridEntityXMLType.ROCK_SPIKED, [GridEntityType.GRID_ROCK_SPIKED, 0]],
  [GridEntityXMLType.ROCK_GOLD, [GridEntityType.GRID_ROCK_GOLD, 0]],
  [GridEntityXMLType.TNT, [GridEntityType.GRID_TNT, 0]],
  // GridEntityXMLType.FIREPLACE (1400) and GridEntityXMLType.RED_FIREPLACE (1410) are intentionally
  // not mapped; the game converts these to EntityType.ENTITY_FIREPLACE (33)
  // Manually spawning the grid version of the fireplace will result in a bugged entity
  [
    GridEntityXMLType.POOP_RED,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.RED],
  ],
  [
    GridEntityXMLType.POOP_RAINBOW,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.RAINBOW],
  ],
  [
    GridEntityXMLType.POOP_CORN,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.CORN],
  ],
  [
    GridEntityXMLType.POOP_GOLDEN,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.GOLDEN],
  ],
  [
    GridEntityXMLType.POOP_BLACK,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.BLACK],
  ],
  [
    GridEntityXMLType.POOP_WHITE,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.WHITE],
  ],
  // GridEntityXMLType.POOP_GIGA (1499) is intentionally not mapped;
  // the game converts this to four different grid entities that are all next to each other:
  // - PoopVariant.GIGA_TOP_LEFT (7)
  // - PoopVariant.GIGA_TOP_RIGHT (8)
  // - PoopVariant.GIGA_BOTTOM_LEFT (9)
  // - PoopVariant.GIGA_BOTTOM_RIGHT (10)
  [
    GridEntityXMLType.POOP,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.NORMAL],
  ],
  [
    GridEntityXMLType.POOP_CHARMING,
    [GridEntityType.GRID_POOP, PoopGridEntityVariant.CHARMING],
  ],
  [GridEntityXMLType.ROCKB, [GridEntityType.GRID_ROCKB, 0]],
  [GridEntityXMLType.PILLAR, [GridEntityType.GRID_PILLAR, 0]],
  [GridEntityXMLType.SPIKES, [GridEntityType.GRID_SPIKES, 0]],
  [GridEntityXMLType.SPIKES_ONOFF, [GridEntityType.GRID_SPIKES_ONOFF, 0]],
  [GridEntityXMLType.SPIDERWEB, [GridEntityType.GRID_SPIDERWEB, 0]],
  [GridEntityXMLType.WALL, [GridEntityType.GRID_WALL, 0]],
  [GridEntityXMLType.PIT, [GridEntityType.GRID_PIT, PitVariant.NORMAL]],
  [
    GridEntityXMLType.FISSURE_SPAWNER,
    [GridEntityType.GRID_PIT, PitVariant.FISSURE_SPAWNER],
  ],
  // GridEntityXMLType.PIT_EVENT (3009) spawns as a normal pit with VarData equal to 1;
  // VarData must be manually handled by any code that uses this mapping
  [GridEntityXMLType.PIT_EVENT, [GridEntityType.GRID_PIT, PitVariant.NORMAL]],
  [GridEntityXMLType.LOCK, [GridEntityType.GRID_LOCK, 0]],
  [
    GridEntityXMLType.PRESSURE_PLATE,
    [GridEntityType.GRID_PRESSURE_PLATE, PressurePlateVariant.PRESSURE_PLATE],
  ],
  [
    GridEntityXMLType.STATUE_DEVIL,
    [GridEntityType.GRID_STATUE, StatueVariant.DEVIL],
  ],
  [
    GridEntityXMLType.STATUE_ANGEL,
    [GridEntityType.GRID_STATUE, StatueVariant.ANGEL],
  ],
  [GridEntityXMLType.TELEPORTER, [GridEntityType.GRID_TELEPORTER, 0]],
  [
    GridEntityXMLType.TRAPDOOR,
    [GridEntityType.GRID_TRAPDOOR, TrapdoorVariant.NORMAL],
  ],
  [
    GridEntityXMLType.STAIRS,
    [GridEntityType.GRID_STAIRS, StairsVariant.NORMAL],
  ],
  [GridEntityXMLType.GRAVITY, [GridEntityType.GRID_GRAVITY, 0]],
]);

export const GRID_INDEX_CENTER_OF_1X1_ROOM = 67;
export const GAME_FRAMES_PER_SECOND = 30;
export const ISAAC_FRAMES_PER_SECOND = 60;

/** In a 2x2 room, there can be 8 doors. */
export const MAX_NUM_DOORS = 8;

/** The game can only handle up to four different players. */
export const MAX_NUM_INPUTS = 4;

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

export const MAX_VANILLA_COLLECTIBLE_TYPE =
  CollectibleType.COLLECTIBLE_MOMS_RING;

export const ONE_BY_ONE_ROOM_GRID_SIZE = 135;

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
