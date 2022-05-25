export enum GridEntityType {
  NULL = 0,
  DECORATION = 1,
  ROCK = 2,
  BLOCK = 3,
  ROCK_TINTED = 4,
  ROCK_BOMB = 5,

  /** A pot, mushroom, or skull, depending on the stage and room type. */
  ROCK_ALT = 6,

  PIT = 7,
  SPIKES = 8,
  SPIKES_ON_OFF = 9,
  SPIDER_WEB = 10,

  /** A key block. */
  LOCK = 11,

  TNT = 12,
  FIREPLACE = 13,
  POOP = 14,
  WALL = 15,
  DOOR = 16,
  TRAPDOOR = 17,
  CRAWL_SPACE = 18,
  GRAVITY = 19,
  PRESSURE_PLATE = 20,
  STATUE = 21,

  /** A super tinted rock that yields double rewards. */
  ROCK_SUPER_SPECIAL = 22,

  TELEPORTER = 23,
  PILLAR = 24,
  ROCK_SPIKED = 25,

  /** A marked skull (that always drops a Fool card). */
  ROCK_ALT_2 = 26,

  ROCK_GOLD = 27,
}
