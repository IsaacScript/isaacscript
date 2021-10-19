/** For GridEntityType.GRID_ROCK (2) */
declare const enum RockVariant {
  NORMAL = 0,
  EVENT = 1,
}

/** For GridEntityType.GRID_POOP (14) */
declare const enum PoopVariant {
  NORMAL = 0,
  RED = 1,
  CORN = 2,
  GOLDEN = 3,
  RAINBOW = 4,
  BLACK = 5,
  WHITE = 6,
  GIGA_TOP_LEFT = 7,
  GIGA_TOP_RIGHT = 8,
  GIGA_BOTTOM_LEFT = 9,
  GIGA_BOTTOM_RIGHT = 10,
  CHARMING = 11,
}

/** GridEntityType.GRID_TRAPDOOR (17) */
declare const enum TrapdoorVariant {
  /** Trapdoors of non-zero variants will function equivalently to those of variant zero. */
  NORMAL = 0,
}

/** GridEntityType.GRID_STAIRS (18) */
declare const enum StairsVariant {
  NORMAL = 0,
  /** Found by throwing a Chaos Card at Great Gideon. */
  GREAT_GIDEON = 1,
  /** Found in shops when the player has the Member Card item. */
  SECRET_SHOP = 2,
  /** Found when using Genesis on a "final" floor. */
  PASSAGE_TO_BEGINNING_OF_FLOOR = 3,
  /**
   * This variant is not used by the game.
   * Any variant with a value of 4 or higher will not interact with the player.
   */
  NULL = 4,
}

/** For GridEntityType.GRID_PRESSURE_PLATE (20) */
declare const enum PressurePlateVariant {
  PRESSURE_PLATE = 0,
  REWARD_PLATE = 1,
  GREED_PLATE = 2,
  MINECART_PLATE = 3,
  KILL_ALL_ENEMIES_PLATE = 9,
  SPAWN_ROCKS_PLATE = 10,
}

/** For GridEntityType.GRID_STATUE (21) */
declare const enum StatueVariant {
  DEVIL = 0,
  ANGEL = 1,
}
