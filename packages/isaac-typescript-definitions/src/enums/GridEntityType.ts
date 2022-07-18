export enum GridEntityType {
  NULL = 0,

  /** Does not correspond to any specific `GridEntity` class. */
  DECORATION = 1,

  /** Grid entities with this type can be converted to the `GridEntityRock` class. */
  ROCK = 2,

  /** Grid entities with this type can be converted to the `GridEntityRock` class. */
  BLOCK = 3,

  /** Grid entities with this type can be converted to the `GridEntityRock` class. */
  ROCK_TINTED = 4,

  /** Grid entities with this type can be converted to the `GridEntityRock` class. */
  ROCK_BOMB = 5,

  /**
   * An urn, mushroom, skull, polyp, or bucket, depending on what the backdrop type. For more
   * information, see the `getRockAltType` helper function.
   *
   * (Contrary to popular belief, the stage does not matter for the purposes of determining what the
   * `RockAltType` is.)
   *
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   */
  ROCK_ALT = 6,

  /** Grid entities with this type can be converted to the `GridEntityPit` class. */
  PIT = 7,

  /** Grid entities with this type can be converted to the `GridEntitySpikes` class. */
  SPIKES = 8,

  /** Grid entities with this type can be converted to the `GridEntitySpikes` class. */
  SPIKES_ON_OFF = 9,

  /** Does not correspond to any specific `GridEntity` class. */
  SPIDER_WEB = 10,

  /**
   * A key block.
   *
   * Does not correspond to any specific `GridEntity` class.
   */
  LOCK = 11,

  /** Grid entities with this type can be converted to the `GridEntityTNT` class. */
  TNT = 12,

  /** Does not correspond to any specific `GridEntity` class. */
  FIREPLACE = 13,

  /** Grid entities with this type can be converted to the `GridEntityPoop` class. */
  POOP = 14,

  /** Does not correspond to any specific `GridEntity` class. */
  WALL = 15,

  /** Grid entities with this type can be converted to the `GridEntityDoor` class. */
  DOOR = 16,

  /** Does not correspond to any specific `GridEntity` class. */
  TRAPDOOR = 17,

  /** Does not correspond to any specific `GridEntity` class. */
  CRAWL_SPACE = 18,

  /** Does not correspond to any specific `GridEntity` class. */
  GRAVITY = 19,

  /** Grid entities with this type can be converted to the `GridEntityPressurePlate` class. */
  PRESSURE_PLATE = 20,

  /** Does not correspond to any specific `GridEntity` class. */
  STATUE = 21,

  /**
   * A super tinted rock that yields double rewards.
   *
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   */
  ROCK_SUPER_SPECIAL = 22,

  /** Does not correspond to any specific `GridEntity` class. */
  TELEPORTER = 23,

  /** Grid entities with this type can be converted to the `GridEntityRock` class. */
  PILLAR = 24,

  /** Grid entities with this type can be converted to the `GridEntityRock` class. */
  ROCK_SPIKED = 25,

  /**
   * A marked skull (that always drops a Fool card).
   *
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   */
  ROCK_ALT_2 = 26,

  /** Grid entities with this type can be converted to the `GridEntityRock` class. */
  ROCK_GOLD = 27,
}
