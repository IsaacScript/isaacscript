declare const enum StageCallback {
  /**
   * Takes 1 return value. If `false`, cancels spawning the grid.
   * If a table, uses it as the grid data.
   *
   * Any return value breaks out of future callbacks.
   */
  PRE_SPAWN_GRID = "PRE_SPAWN_GRID",

  /**
   * Takes 1 return value. If a table, uses it as the current room layout.
   * Otherwise, chooses from `roomsList` with seeded RNG. Breaks on first return.
   *
   * Called both on initial room load and when continuing game, before INIT.
   */
  PRE_ROOM_LAYOUT_CHOOSE = "PRE_ROOM_LAYOUT_CHOOSE",

  /**
   * Called when an overridden grid reaches its break state and is considered broken.
   *
   * @param justBrokenGridSpawns Contains all deleted spawns from the grid.
   *
   * Breaks on first non-undefined return.
   */
  POST_OVERRIDDEN_GRID_BREAK = "POST_OVERRIDDEN_GRID_BREAK",

  POST_CHANGE_ROOM_GFX = "POST_CHANGE_ROOM_GFX",

  /**
   * Runs before most but not all StageAPI room functionality.
   * Guaranteed to run before any room loads.
   */
  PRE_STAGEAPI_NEW_ROOM = "PRE_STAGEAPI_NEW_ROOM",
}

declare type CustomRoomConfig = LuaTable<
  number | string,
  LuaRoomGenericEntity | number | string
>;

declare interface LuaRoomGenericEntity {
  ISDOOR: boolean;
  GRIDX: int;
  GRIDY: int;
}

declare interface LuaRoomDoor extends LuaRoomGenericEntity {
  SLOT: DoorSlot;
  EXISTS: boolean;
}

declare interface LuaRoomEntity extends LuaRoomGenericEntity {
  1: {
    TYPE: int;
    VARIANT: int;
    SUBTYPE: int;
    WEIGHT: float;
    METADATA?: unknown;
  };
}

// ----- Layout entity enums -----
declare const enum LayoutGridType {
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
  GRAVITY = 10000,
  PITFALL = 291,
  PROP_A = 10,
  PROP_B = 20,
  PROP_C = 30,
}

declare const enum LayoutRockSubtype {
  NORMAL = 0,
  NON_REPLACEABLE = 1,
}

declare const enum LayoutSpikesOnOffVariant {
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

declare const enum LayoutButtonVariant {
  ROOM_CLEAR = 0,
  REWARD = 1,
  GREED = 2,
  KILL = 9,
  RAIL = 3,
}

declare const enum LayoutPoopSubtype {
  NORMAL = 0,
  NON_REPLACEABLE = 1,
}

declare const enum LayoutCornyPoopSubtype {
  NORMAL = 0,
  NON_REPLACEABLE = 1,
}

declare const enum LayoutPitfallVariant {
  NORMAL = 0,
  SUCTION = 1,
  TELEPORT = 2,
}

declare const enum PickupRandomGroupVariant {
  ANY = 0,
  NOT_CHEST_ITEM = 1,
  NOT_ITEM = 2,
  NOT_CHEST_ITEM_COIN = 3,
  NOT_CHEST_ITEM_TRINKET = 4,
}
