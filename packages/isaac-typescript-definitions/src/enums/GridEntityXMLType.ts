/**
 * The type of a grid entity as represented in a room XML/STB file.
 *
 * This is converted by the game to the GridEntityType enum.
 *
 * The `gridspawn` console command accepts `GridEntityXMLType` instead of `GridEntityType`.
 */
export enum GridEntityXMLType {
  /** Corresponds to `GridEntityType.DECORATION` (1). */
  DECORATION = 0,

  /** Corresponds to `EntityType.EFFECT` (1000). */
  EFFECT = 999,

  /** Corresponds to `GridEntityType.ROCK` (2). */
  ROCK = 1000,

  /** Corresponds to `GridEntityType.ROCK_BOMB` (5). */
  ROCK_BOMB = 1001,

  /**
   * An urn, mushroom, skull, polyp, or bucket, depending on what the backdrop type. For more
   * information, see the `getRockAltType` helper function.
   *
   * (Contrary to popular belief, the stage does not matter for the purposes of determining what the
   * `RockAltType` is.)
   *
   * Corresponds to `GridEntityType.ROCK_ALT` (6).
   */
  ROCK_ALT = 1002,

  /**
   * The rocks with an "X" on them that produce soul hearts and other rewards when destroyed.
   *
   * Corresponds to `GridEntityType.ROCK_TINTED` (4).
   */
  ROCK_TINTED = 1003,

  /**
   * A marked skull that will always drop a Fool card.
   *
   * Corresponds to `GridEntityType.ROCK_ALT_2` (26).
   */
  ROCK_ALT_2 = 1008,

  /**
   * Rocks that will be destroyed when other nearby rocks are. In-game, it will be a
   * `GridEntityType.ROCK` (2) with a `VarData` of 1.
   */
  ROCK_EVENT = 1009,

  /** Corresponds to `GridEntityType.ROCK_SPIKED` (25). */
  ROCK_SPIKED = 1010,

  /** Corresponds to `GridEntityType.ROCK_GOLD` (27). */
  ROCK_GOLD = 1011,

  /** Corresponds to `GridEntityType.TNT` (12). */
  TNT = 1300,

  /** Corresponds to `GridEntityType.FIREPLACE` (13), `FireplaceGridEntityVariant.NORMAL` (0). */
  FIREPLACE = 1400,

  /** Corresponds to `GridEntityType.FIREPLACE` (13), `FireplaceGridEntityVariant.RED` (1). */
  RED_FIREPLACE = 1410,

  /** Corresponds to `GridEntityType.POOP` (14), `PoopGridEntityVariant.RED` (1). */
  POOP_RED = 1490,

  /** Corresponds to `GridEntityType.POOP` (14), `PoopGridEntityVariant.RAINBOW` (4). */
  POOP_RAINBOW = 1494,

  /** Corresponds to `GridEntityType.POOP` (14), `PoopGridEntityVariant.CORNY` (2). */
  POOP_CORNY = 1495,

  /** Corresponds to `GridEntityType.POOP` (14), `PoopGridEntityVariant.GOLDEN` (3). */
  POOP_GOLDEN = 1496,

  /** Corresponds to `GridEntityType.POOP` (14), `PoopGridEntityVariant.BLACK` (5). */
  POOP_BLACK = 1497,

  /** Corresponds to `GridEntityType.POOP` (14), `PoopGridEntityVariant.WHITE` (6). */
  POOP_WHITE = 1498,

  /**
   * Corresponds to `GridEntityType.POOP` (14) and the four "GIGA" variants of
   * `PoopGridEntityVariant`.
   */
  POOP_GIGA = 1499,

  /** Corresponds to `GridEntityType.POOP` (14), `PoopGridEntityVariant.NORMAL` (0). */
  POOP = 1500,

  /** Corresponds to `GridEntityType.POOP` (14), `PoopGridEntityVariant.CHARMING` (11). */
  POOP_CHARMING = 1501,

  /** Corresponds to `GridEntityType.BLOCK` (3). */
  BLOCK = 1900,

  /** Corresponds to `GridEntityType.PILLAR` (24). */
  PILLAR = 1901,

  /** Corresponds to `GridEntityType.SPIKES` (8). */
  SPIKES = 1930,

  /** Corresponds to `GridEntityType.SPIKES_ON_OFF` (9). */
  SPIKES_ON_OFF = 1931,

  /** Corresponds to `GridEntityType.SPIDER_WEB` (10). */
  SPIDER_WEB = 1940,

  /** Corresponds to `GridEntityType.WALL` (15). */
  WALL = 1999,

  /** Corresponds to `GridEntityType.PIT` (7). */
  PIT = 3000,

  /** Corresponds to `EntityType.EFFECT` (1000), `EffectVariant.FISSURE_SPAWNER` (192). */
  FISSURE_SPAWNER = 3001,

  /**
   * Pits that will be filled in when nearby rocks are destroyed. In-game, it will be a
   * `GridEntityType.PIT` (7) with a `VarData` of 1.
   */
  PIT_EVENT = 3009,

  /**
   * A key block.
   *
   * Corresponds to `GridEntityType.LOCK` (11).
   */
  LOCK = 4000,

  /** Corresponds to `GridEntityType.PRESSURE_PLATE` (20). */
  PRESSURE_PLATE = 4500,

  /** Corresponds to `GridEntityType.STATUE` (21), `StatueVariant.DEVIL` (0). */
  STATUE_DEVIL = 5000,

  /** Corresponds to `GridEntityType.STATUE` (21), `StatueVariant.ANGEL` (1). */
  STATUE_ANGEL = 5001,

  /** Corresponds to `GridEntityType.TELEPORTER` (23). */
  TELEPORTER = 6100,

  /** Corresponds to `GridEntityType.TRAPDOOR` (17). */
  TRAPDOOR = 9000,

  /** Corresponds to `GridEntityType.CRAWL_SPACE` (18). */
  CRAWL_SPACE = 9100,

  /** Corresponds to `GridEntityType.GRAVITY` (19). */
  GRAVITY = 10_000,
}
