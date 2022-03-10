declare enum GridEntityType {
  GRID_NULL = 0,
  GRID_DECORATION = 1,
  GRID_ROCK = 2,

  /** A block. */
  GRID_ROCKB = 3,

  /** A tinted rock. */
  GRID_ROCKT = 4,

  GRID_ROCK_BOMB = 5,

  /** A pot, mushroom, or skull, depending on the stage and room type. */
  GRID_ROCK_ALT = 6,

  GRID_PIT = 7,
  GRID_SPIKES = 8,
  GRID_SPIKES_ONOFF = 9,
  GRID_SPIDERWEB = 10,

  /** A key block. */
  GRID_LOCK = 11,

  GRID_TNT = 12,
  GRID_FIREPLACE = 13,
  GRID_POOP = 14,
  GRID_WALL = 15,
  GRID_DOOR = 16,
  GRID_TRAPDOOR = 17,
  GRID_STAIRS = 18,
  GRID_GRAVITY = 19,
  GRID_PRESSURE_PLATE = 20,
  GRID_STATUE = 21,

  /** A super tinted rock that yields double rewards. */
  GRID_ROCK_SS = 22,

  GRID_TELEPORTER = 23,
  GRID_PILLAR = 24,
  GRID_ROCK_SPIKED = 25,

  /** A tinted skull (that always drops a Fool card). */
  GRID_ROCK_ALT2 = 26,

  GRID_ROCK_GOLD = 27,
}
