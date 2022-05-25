/* eslint-disable sort-exports/sort-exports */

/** For GridEntityType.ROCK (2) */
export enum RockVariant {
  NORMAL = 0,
  EVENT = 1,
}

/** For GridEntityType.PIT (7) */
export enum PitVariant {
  NORMAL = 0,
  FISSURE_SPAWNER = 16,
}

/** For GridEntityType.POOP (14) */
export enum PoopGridEntityVariant {
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

/** For GridEntityType.DOOR (16) */
export enum DoorVariant {
  UNSPECIFIED = 0,
  LOCKED = 1,
  LOCKED_DOUBLE = 2,
  LOCKED_CRACKED = 3,
  LOCKED_BARRED = 4,
  LOCKED_KEY_FAMILIAR = 5,
  LOCKED_GREED = 6,
  HIDDEN = 7,
  UNLOCKED = 8,
}

/** For GridEntityType.TRAPDOOR (17) */
export enum TrapdoorVariant {
  NORMAL = 0,

  /**
   * Void Portals will have a VarData of 0 if they are part of the grid layout and a VarData of 1 if
   * they are spawned after defeating a boss.
   *
   * Manually spawning a trapdoor with a variant of a Void Portal will work, but the sprite will
   * have the appearance of a normal trapdoor; you must replace the sprite sheet with
   * "gfx/grid/voidtrapdoor.anm2".
   */
  VOID_PORTAL = 1,
}

/** For GridEntityType.CRAWL_SPACE (18) */
export enum CrawlSpaceVariant {
  NORMAL = 0,

  /** Found by throwing a Chaos Card at Great Gideon. */
  GREAT_GIDEON = 1,

  /** Found in shops when the player has the Member Card item. */
  SECRET_SHOP = 2,

  /** Found when using Genesis on a "final" floor. */
  PASSAGE_TO_BEGINNING_OF_FLOOR = 3,

  /**
   * This variant is not used by the game.
   *
   * Any variant with a value of 4 or higher will not interact with the player.
   */
  NULL = 4,
}

/** For GridEntityType.PRESSURE_PLATE (20) */
export enum PressurePlateVariant {
  PRESSURE_PLATE = 0,
  REWARD_PLATE = 1,
  GREED_PLATE = 2,
  RAIL_PLATE = 3,
  KILL_ALL_ENEMIES_PLATE = 9,
  SPAWN_ROCKS_PLATE = 10,
}

/** For GridEntityType.STATUE (21) */
export enum StatueVariant {
  DEVIL = 0,
  ANGEL = 1,
}
