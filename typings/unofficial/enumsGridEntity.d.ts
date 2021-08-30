/**
 * The type of a grid entity as represented in a room XML/STB file.
 * This is converted by the game to the GridEntityType enum.
 * The `gridspawn` console command accepts GridEntityXMLType instead of GridEntityType.
 */
declare const enum GridEntityXMLType {
  ROCK = 1000,
  ROCK_BOMB = 1001,
  /** A pot, mushroom, or skull, depending on the stage and room type. */
  ROCK_ALT = 1002,
  /** A tinted rock. */
  ROCKT = 1003,
  /** A marked skull that will drop a Fool card. */
  ROCK_ALT2 = 1008,
  /** Rocks that will be destroyed when other nearby rocks are. */
  ROCK_CHAIN_BREAKING = 1009 ,
  ROCK_SPIKED = 1010,
  TNT = 1300,
  FIREPLACE = 1400,
  RED_FIREPLACE = 1410,
  POOP_RED = 1490,
  POOP_RAINBOW = 1494,
  POOP_CORN = 1495,
  POOP_GOLDEN = 1496,
  POOP_BLACK = 1497,
  POOP_WHITE = 1498,
  POOP_GIGA = 1499,
  POOP = 1500,
  POOP_CHARMING = 1501,
  ROCKB = 1900,
  PILLAR = 1901,
  SPIKES = 1930,
  SPIKES_ONOFF = 1931,
  SPIDERWEB = 1940,
  WALL = 1999,
  PIT = 3000,
  FISSURE_SPAWNER = 3001,
  PIT_EVENT = 3009,
  LOCK = 4000,
  PRESSURE_PLATE = 4500,
  STATUE_DEVIL = 5000,
  STATUE_ANGEL = 5001,
  TELEPORTER = 6100,
  TRAPDOOR = 9000,
  STAIRS = 9100,
  GRAVITY = 10000,
}

/** For GridEntityType.GRID_DOOR (16) */
declare const enum DoorSlotFlag {
  LEFT0 = 1 << DoorSlot.LEFT0,
  UP0 = 1 << DoorSlot.UP0,
  RIGHT0 = 1 << DoorSlot.RIGHT0,
  DOWN0 = 1 << DoorSlot.DOWN0,
  LEFT1 = 1 << DoorSlot.LEFT1,
  UP1 = 1 << DoorSlot.UP1,
  RIGHT1 = 1 << DoorSlot.RIGHT1,
  DOWN1 = 1 << DoorSlot.DOWN1,
}

/** For GridEntityType.GRID_TRAPDOOR (17)  */
declare const enum TrapdoorState {
  CLOSED = 0,
  OPEN = 1,
}

/** For GridEntityType.GRID_PRESSURE_PLATE (20) */
declare const enum PressurePlateState {
  UNPRESSED = 0,
  STATE_1_UNKNOWN = 1,
  STATE_2_UNKNOWN = 2,
  PRESSURE_PLATE_PRESSED = 3,
  REWARD_PLATE_PRESSED = 4,
}

/** For GridEntityType.GRID_TELEPORTER (23) */
declare const enum TeleporterState {
  NORMAL = 0,
  ACTIVATED = 1,
  /**
   * Set when a player stands on a teleport pad that has no corresponding pad for the player to be
   * sent to. When this happens, the pad turns black and deactivates.
   */
  DISABLED = 2,
}

/**
 * GridPath is not an enum, but rather a variable integer that represents the cost it would take for
 * an entity to pass through a grid entity. This enum lists some standard cost values.
 */
declare const enum GridPath {
  NONE = 0,
  FIREPLACE = 950,
  ROCK = 1000,
  PIT = 3000,
}
