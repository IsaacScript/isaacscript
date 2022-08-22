export enum GridEntityType {
  NULL = 0,

  /** Does not correspond to any specific `GridEntity` class. */
  DECORATION = 1,

  /**
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   *
   * Corresponds to `GridEntityXMLType.ROCK` (1000).
   */
  ROCK = 2,

  /**
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   *
   * Corresponds to `GridEntityXMLType.BLOCK` (1900).
   */
  BLOCK = 3,

  /**
   * The rocks with an "X" on them that produce soul hearts and other rewards when destroyed.
   *
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   *
   * Corresponds to `GridEntityXMLType.ROCK_TINTED` (1003).
   */
  ROCK_TINTED = 4,

  /**
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   *
   * Corresponds to `GridEntityXMLType.ROCK_BOMB` (1001).
   */
  ROCK_BOMB = 5,

  /**
   * An urn, mushroom, skull, polyp, or bucket, depending on what the backdrop type. For more
   * information, see the `getRockAltType` helper function.
   *
   * (Contrary to popular belief, the stage does not matter for the purposes of determining what the
   * `RockAltType` is.)
   *
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   *
   * Corresponds to `GridEntityXMLType.ROCK_ALT` (1002).
   */
  ROCK_ALT = 6,

  /**
   * Grid entities with this type can be converted to the `GridEntityPit` class.
   *
   * Corresponds to `GridEntityXMLType.PIT` (3000).
   */
  PIT = 7,

  /**
   * Grid entities with this type can be converted to the `GridEntitySpikes` class.
   *
   * Corresponds to `GridEntityXMLType.SPIKES` (1930).
   */
  SPIKES = 8,

  /**
   * Grid entities with this type can be converted to the `GridEntitySpikes` class.
   *
   * Corresponds to `GridEntityXMLType.SPIKES_ON_OFF` (1931).
   */
  SPIKES_ON_OFF = 9,

  /**
   * Does not correspond to any specific `GridEntity` class.
   *
   * Corresponds to `GridEntityXMLType.SPIDER_WEB` (1940).
   */
  SPIDER_WEB = 10,

  /**
   * A key block.
   *
   * Does not correspond to any specific `GridEntity` class.
   *
   * Corresponds to `GridEntityXMLType.LOCK` (4000).
   */
  LOCK = 11,

  /**
   * Grid entities with this type can be converted to the `GridEntityTNT` class.
   *
   * Corresponds to `GridEntityXMLType.TNT` (1300).
   */
  TNT = 12,

  /**
   * Does not correspond to any specific `GridEntity` class.
   *
   * Corresponds to `GridEntityXMLType.FIREPLACE` (1400) and `GridEntityXMLType.RED_FIREPLACE`
   * (1410).
   */
  FIREPLACE = 13,

  /**
   * Grid entities with this type can be converted to the `GridEntityPoop` class.
   *
   * Corresponds to many different `GridEntityXMLType` values.
   */
  POOP = 14,

  /**
   * Does not correspond to any specific `GridEntity` class.
   *
   * Corresponds to `GridEntityXMLType.WALL` (1999).
   */
  WALL = 15,

  /**
   * Grid entities with this type can be converted to the `GridEntityDoor` class.
   *
   * Does not correspond to any `GridEntityXMLType` value.
   */
  DOOR = 16,

  /**
   * Does not correspond to any specific `GridEntity` class.
   *
   * Corresponds to `GridEntityXMLType.TRAPDOOR` (9000).
   */
  TRAPDOOR = 17,

  /**
   * Does not correspond to any specific `GridEntity` class.
   *
   * Corresponds to `GridEntityXMLType.CRAWL_SPACE` (9100).
   */
  CRAWL_SPACE = 18,

  /**
   * Does not correspond to any specific `GridEntity` class.
   *
   * Corresponds to `GridEntityXMLType.GRAVITY` (10000).
   */
  GRAVITY = 19,

  /**
   * Grid entities with this type can be converted to the `GridEntityPressurePlate` class.
   *
   * Corresponds to `GridEntityXMLType.PRESSURE_PLATE` (4500).
   */
  PRESSURE_PLATE = 20,

  /**
   * Does not correspond to any specific `GridEntity` class.
   *
   * Corresponds to `GridEntityXMLType.STATUE_DEVIL` (5000) and `GridEntityXMLType.STATUE_ANGEL`
   * (5001).
   */
  STATUE = 21,

  /**
   * A super tinted rock that yields double rewards.
   *
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   *
   * Does not correspond to any `GridEntityXMLType` value.
   */
  ROCK_SUPER_SPECIAL = 22,

  /**
   * Does not correspond to any specific `GridEntity` class.
   *
   * Corresponds to `GridEntityXMLType.TELEPORTER` (6100).
   */
  TELEPORTER = 23,

  /**
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   *
   * Corresponds to `GridEntityXMLType.PILLAR` (1901).
   */
  PILLAR = 24,

  /**
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   *
   * Corresponds to `GridEntityXMLType.ROCK_SPIKED` (1010).
   */
  ROCK_SPIKED = 25,

  /**
   * A marked skull that will always drop a Fool card.
   *
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   *
   * Corresponds to `GridEntityXMLType.ROCK_ALT_2` (1008).
   */
  ROCK_ALT_2 = 26,

  /**
   * Grid entities with this type can be converted to the `GridEntityRock` class.
   *
   * Corresponds to `GridEntityXMLType.ROCK_GOLD` (1011).
   */
  ROCK_GOLD = 27,
}
