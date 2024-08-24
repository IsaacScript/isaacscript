// cspell:ignore STAGEAPI GRIDENTITY

/**
 * This is an enum for the third-party Stage API mod, which allows mods to create custom stages.
 *
 * @see https://steamcommunity.com/sharedfiles/filedetails/?id=1348031964
 */
export enum StageAPICallback {
  POST_CHANGE_ROOM_GFX = "POST_CHANGE_ROOM_GFX",

  /** Return false to invalidate a room layout; return integer to specify new weight. */
  POST_CHECK_VALID_ROOM = "POST_CHECK_VALID_ROOM",

  /**
   * Takes CustomDoorName as first callback parameter, and will only run if parameter not supplied
   * or matches current door.
   */
  POST_CUSTOM_DOOR_UPDATE = "POST_CUSTOM_DOOR_UPDATE",

  /**
   * Takes CustomGridTypeName as first callback parameter, and will only run if parameter not
   * supplied or matches current grid.
   */
  POST_CUSTOM_GRID_PROJECTILE_HELPER_UPDATE = "POST_CUSTOM_GRID_PROJECTILE_HELPER_UPDATE",

  /**
   * Takes CustomGridTypeName as first callback parameter, and will only run if parameter not
   * supplied or matches current grid.
   */
  POST_CUSTOM_GRID_PROJECTILE_UPDATE = "POST_CUSTOM_GRID_PROJECTILE_UPDATE",

  /**
   * Takes CustomGridTypeName as first callback parameter, and will only run if parameter not
   * supplied or matches current grid.
   */
  POST_CUSTOM_GRID_REMOVE = "POST_CUSTOM_GRID_REMOVE",

  /**
   * Takes CustomGridTypeName as first callback parameter, and will only run if parameter not
   * supplied or matches current grid.
   */
  POST_CUSTOM_GRID_UPDATE = "POST_CUSTOM_GRID_UPDATE",

  /**
   * Calls when the number of grids changes or grids are reprocessed. This is when room grid
   * graphics are changed.
   */
  POST_GRID_UPDATE = "POST_GRID_UPDATE",

  /**
   * Called when an overridden grid reaches its break state and is considered broken.
   *
   * @param justBrokenGridSpawns Contains all deleted spawns from the grid.
   *
   * Breaks on first non-undefined return.
   */
  POST_OVERRIDDEN_GRID_BREAK = "POST_OVERRIDDEN_GRID_BREAK",

  /**
   * Called when a room initializes. Can occur at two times, when a room is initially entered or
   * when a room is loaded from save data. Takes no return values.
   */
  POST_ROOM_INIT = "POST_ROOM_INIT",

  /** Called when a room is loaded. Takes no return value. */
  POST_ROOM_LOAD = "POST_ROOM_LOAD",

  /**
   * Takes CustomDoorName as first callback parameter, and will only run if parameter not supplied
   * or matches current door.
   */
  POST_SPAWN_CUSTOM_DOOR = "POST_SPAWN_CUSTOM_DOOR",

  /**
   * Takes CustomGridTypeName as first callback parameter, and will only run if parameter not
   * supplied or matches current grid.
   */
  POST_SPAWN_CUSTOM_GRID = "POST_SPAWN_CUSTOM_GRID",

  /**
   * All loading and processing of new room generation and old room loading is done, but the gfx has
   * not changed yet.
   */
  POST_STAGEAPI_NEW_ROOM = "POST_STAGEAPI_NEW_ROOM",

  /**
   * Allows returning justGenerated and currentRoom. Run after normal room generation but before
   * reloading old rooms.
   */
  POST_STAGEAPI_NEW_ROOM_GENERATION = "POST_STAGEAPI_NEW_ROOM_GENERATION",

  /** If a boss is returned, uses it instead. */
  PRE_BOSS_SELECT = "PRE_BOSS_SELECT",

  /** Allows returning room gfx to use in place of the stage's. */
  PRE_CHANGE_ROOM_GFX = "PRE_CHANGE_ROOM_GFX",

  /**
   * Takes 1 return value. If a table, uses it as the current room layout. Otherwise, chooses from
   * `roomsList` with seeded RNG. Breaks on first return.
   *
   * Called both on initial room load and when continuing game, before INIT.
   */
  PRE_ROOM_LAYOUT_CHOOSE = "PRE_ROOM_LAYOUT_CHOOSE",

  /**
   * - Takes 4 return values, AddEntities, EntityList, StillAddRandom, and NoBreak.
   * - If the first value is false, cancels selecting the list.
   * - AddEntities and EntityList are lists of EntityData tables, described below.
   * - Usually StageAPI will pick one entity from the EntityList to add to the AddEntities table at
   *   random, but that can be changed with this callback.
   * - If StillAddRandom is true, StageAPI will still add a random entity from the entityList to
   *   addEntities, alongside ones you returned.
   */
  PRE_SELECT_ENTITY_LIST = "PRE_SELECT_ENTITY_LIST",

  /**
   * Takes 1 return value. If false, cancels selecting the list. If GridData, selects it to spawn.
   * With no value, picks at random.
   */
  PRE_SELECT_GRIDENTITY_LIST = "PRE_SELECT_GRIDENTITY_LIST",

  /** Return a stage to go to instead of currentStage.NextStage or none. */
  PRE_SELECT_NEXT_STAGE = "PRE_SELECT_NEXT_STAGE",

  /**
   * Takes 1 return value. If false, cancels spawning the entity info. If a table, uses it as the
   * entity info. Any return value breaks out of future callbacks.
   */
  PRE_SPAWN_ENTITY = "PRE_SPAWN_ENTITY",

  /**
   * Takes 1 return value. If false, cancels spawning the entity list. If a table, uses it as the
   * entity list. Any return value breaks out of future callbacks. Every entity in the final entity
   * list is spawned. Note that this entity list contains EntityInfo tables rather than EntityData,
   * which contain persistent room-specific data. Both detailed below.
   */
  PRE_SPAWN_ENTITY_LIST = "PRE_SPAWN_ENTITY_LIST",

  /**
   * Takes 1 return value. If `false`, cancels spawning the grid. If a table, uses it as the grid
   * data.
   *
   * Any return value breaks out of future callbacks.
   */
  PRE_SPAWN_GRID = "PRE_SPAWN_GRID",

  /**
   * Runs before most but not all stageapi room functionality. Guaranteed to run before any room
   * loads.
   */
  PRE_STAGEAPI_NEW_ROOM = "PRE_STAGEAPI_NEW_ROOM",

  /**
   * Called before the custom room transition would render, for effects that should render before
   * it.
   */
  PRE_TRANSITION_RENDER = "PRE_TRANSITION_RENDER",

  /** Allows returning grid gfx to use in place of the stage's. */
  PRE_UPDATE_GRID_GFX = "PRE_UPDATE_GRID_GFX",
}

/**
 * This is an enum for the third-party Stage API mod, which allows mods to create custom stages.
 *
 * @see https://steamcommunity.com/sharedfiles/filedetails/?id=1348031964
 */
export enum StageAPILayoutButtonVariant {
  ROOM_CLEAR = 0,
  REWARD = 1,
  GREED = 2,
  KILL = 9,
  RAIL = 3,
}

/**
 * This is an enum for the third-party Stage API mod, which allows mods to create custom stages.
 *
 * @see https://steamcommunity.com/sharedfiles/filedetails/?id=1348031964
 */
export enum StageAPILayoutCornyPoopSubtype {
  NORMAL = 0,
  NON_REPLACEABLE = 1,
}

/**
 * This is an enum for the third-party Stage API mod, which allows mods to create custom stages.
 *
 * @see https://steamcommunity.com/sharedfiles/filedetails/?id=1348031964
 */
export enum StageAPILayoutGridType {
  ROCK = 1000,
  ROCK_ALT = 1002,
  ROCK_BOMB = 1001,
  ROCK_SPIKE = 1010,
  ROCK_GOLD = 1011,
  MARKED_SKULL = 1008,
  BLOCK_METAL = 1900,
  BLOCK_METAL_TALL = 1901,
  BLOCK_INVISIBLE = 1999,
  BLOCK_KEY = 4000,
  PIT = 3000,
  TNT = 1300,
  TNT_PUSHABLE = 292,
  SPIKES = 1930,
  SPIKES_ON_OFF = 1931,
  COBWEB = 1940,
  BUTTON = 4500,
  POOP = 1500,
  POOP_CORNY = 1495,
  POOP_RED = 1490,
  POOP_GOLD = 1496,
  POOP_RAINBOW = 1494,
  POOP_BLACK = 1497,
  POOP_HOLY = 1498,
  POOP_CHARMING = 1501,
  GRAVITY = 10_000,
  PITFALL = 291,
  PROP_A = 10,
  PROP_B = 20,
  PROP_C = 30,
}

/**
 * This is an enum for the third-party Stage API mod, which allows mods to create custom stages.
 *
 * @see https://steamcommunity.com/sharedfiles/filedetails/?id=1348031964
 */
export enum StageAPILayoutPitfallVariant {
  NORMAL = 0,
  SUCTION = 1,
  TELEPORT = 2,
}

/**
 * This is an enum for the third-party Stage API mod, which allows mods to create custom stages.
 *
 * @see https://steamcommunity.com/sharedfiles/filedetails/?id=1348031964
 */
export enum StageAPILayoutPoopSubtype {
  NORMAL = 0,
  NON_REPLACEABLE = 1,
}

/**
 * This is an enum for the third-party Stage API mod, which allows mods to create custom stages.
 *
 * @see https://steamcommunity.com/sharedfiles/filedetails/?id=1348031964
 */
export enum StageAPILayoutRockSubtype {
  NORMAL = 0,
  NON_REPLACEABLE = 1,
}

/**
 * This is an enum for the third-party Stage API mod, which allows mods to create custom stages.
 *
 * @see https://steamcommunity.com/sharedfiles/filedetails/?id=1348031964
 */
export enum StageAPILayoutSpikesOnOffVariant {
  NORMAL = 0,
  DOWN_1_FIFTH = 1,
  DOWN_2_FIFTHS = 2,
  DOWN_3_FIFTHS = 3,
  DOWN_4_FIFTHS = 4,
  DOWN_5_FIFTHS = 5,
  UP_1_FIFTH = 6,
  UP_2_FIFTHS = 7,
  UP_3_FIFTHS = 8,
  UP_4_FIFTHS = 9,
  UP_5_FIFTHS = 10,
}

/**
 * This is an enum for the third-party Stage API mod, which allows mods to create custom stages.
 *
 * @see https://steamcommunity.com/sharedfiles/filedetails/?id=1348031964
 */
export enum StageAPIPickupRandomGroupVariant {
  ANY = 0,
  NOT_CHEST_ITEM = 1,
  NOT_ITEM = 2,
  NOT_CHEST_ITEM_COIN = 3,
  NOT_CHEST_ITEM_TRINKET = 4,
}
