/* eslint-disable sort-exports/sort-exports */

/**
 * For `GridEntityType.ROCK` (2).
 *
 * Note that this does not always apply to `GridEntityRock`, since that class can be equal to other
 * grid entity types.
 */
export enum RockVariant {
  NORMAL = 0,
  EVENT = 1,
}

/**
 * For GridEntityType.ROCK_ALT (6), RockAltType.URN.
 *
 * Note that you are unable to spawn specific urn variants. The game will pick a random variant
 * regardless of which one you select.
 */
export enum UrnVariant {
  NORMAL = 0,
  CHIPPED_TOP_LEFT = 1,
  NARROW = 2,
}

/**
 * For GridEntityType.ROCK_ALT (6), RockAltType.MUSHROOM.
 *
 * Note that you are unable to spawn specific mushroom variants. The game will pick a random variant
 * regardless of which one you select.
 */
export enum MushroomVariant {
  NORMAL = 0,
  CHIPPED_TOP_RIGHT = 1,
  NARROW = 2,
}

/**
 * For GridEntityType.ROCK_ALT (6), RockAltType.SKULL.
 *
 * Note that you are unable to spawn specific skull variants. The game will pick a random variant
 * regardless of which one you select.
 */
export enum SkullVariant {
  NORMAL = 0,
  FACING_RIGHT = 1,
  FACING_LEFT = 2,
}

/**
 * For GridEntityType.ROCK_ALT (6), RockAltType.POLYP.
 *
 * Note that you are unable to spawn specific polyp variants. The game will pick a random variant
 * regardless of which one you select.
 */
export enum PolypVariant {
  NORMAL = 0,
  MANY_FINGERS = 1,
  FLIPPED_AND_SHIFTED_UPWARDS = 2,
}

/**
 * For GridEntityType.ROCK_ALT (6), RockAltType.BUCKET.
 *
 * Note that you are unable to spawn specific bucket variants. The game will pick a random variant
 * regardless of which one you select.
 */
export enum BucketVariant {
  EMPTY = 0,
  FULL = 1,
  EMPTY_AND_SHIFTED_UPWARDS = 2,
}

/** For `GridEntityType.PIT` (7). */
export enum PitVariant {
  NORMAL = 0,
  FISSURE_SPAWNER = 16,
}

/**
 * For `GridEntityType.FIREPLACE` (13).
 *
 * This only partially corresponds to the `FireplaceVariant` for non-grid entities. (Spawning a grid
 * entity fireplace with a variant higher than 1 will result in a normal fireplace.)
 */
export enum FireplaceGridEntityVariant {
  NORMAL = 0,
  RED = 1,
}

/** For `GridEntityType.POOP` (14). */
export enum PoopGridEntityVariant {
  NORMAL = 0,
  RED = 1,
  CORNY = 2,
  GOLDEN = 3,
  RAINBOW = 4,
  BLACK = 5,
  WHITE = 6,
  GIANT_TOP_LEFT = 7,
  GIANT_TOP_RIGHT = 8,
  GIANT_BOTTOM_LEFT = 9,
  GIANT_BOTTOM_RIGHT = 10,
  CHARMING = 11,
}

/** For `GridEntityType.DOOR` (16). */
export enum DoorVariant {
  UNSPECIFIED = 0,
  LOCKED = 1,
  LOCKED_DOUBLE = 2,
  LOCKED_CRACKED = 3,
  LOCKED_BARRED = 4,

  /** The Mega Satan door, which is unlocked with the Key Piece familiars. */
  LOCKED_KEY_FAMILIAR = 5,

  LOCKED_GREED = 6,
  HIDDEN = 7,
  UNLOCKED = 8,
}

/** For `GridEntityType.TRAPDOOR` (17). */
export enum TrapdoorVariant {
  NORMAL = 0,

  /**
   * Void Portals will have a `VarData` of 0 if they are part of the grid layout and a `VarData` of
   * 1 if they are spawned after defeating a boss.
   *
   * Manually spawning a trapdoor with a variant of a Void Portal will work, but the sprite will
   * have the appearance of a normal trapdoor; you must replace the sprite sheet with
   * "gfx/grid/voidtrapdoor.anm2".
   */
  VOID_PORTAL = 1,
}

/** For `GridEntityType.CRAWL_SPACE` (18). */
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

/** For `GridEntityType.PRESSURE_PLATE` (20). */
export enum PressurePlateVariant {
  PRESSURE_PLATE = 0,
  REWARD_PLATE = 1,
  GREED_PLATE = 2,
  RAIL_PLATE = 3,
  KILL_ALL_ENEMIES_PLATE = 9,
  SPAWN_ROCKS_PLATE = 10,
}

/** For `GridEntityType.STATUE` (21). */
export enum StatueVariant {
  DEVIL = 0,
  ANGEL = 1,
}
