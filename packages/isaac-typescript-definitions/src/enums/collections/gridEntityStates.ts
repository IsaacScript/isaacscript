/* eslint-disable sort-exports/sort-exports */

/**
 * Used by the following grid entity types:
 * - GridEntityType.ROCK (2)
 * - GridEntityType.ROCK_TINTED (4)
 * - GridEntityType.ROCK_BOMB (5)
 * - GridEntityType.ROCK_ALT (6)
 * - GridEntityType.STATUE (21) (only for Angel Statues)
 * - GridEntityType.ROCK_SS (22)
 * - GridEntityType.ROCK_SPIKED (25)
 * - GridEntityType.ROCK_ALT2 (26)
 * - GridEntityType.ROCK_GOLD (27)
 */
export enum RockState {
  UNBROKEN = 1,
  BROKEN = 2,

  /**
   * Only applies for `GridEntityType.ROCK_BOMB` (5). After being bombed, the rock stays in this
   * state for 4 frames, then changes to `RockState.BROKEN`.
   */
  EXPLODING = 3,

  /** Only applies for `GridEntityType.ROCK_SS` (22), since it takes two bombs to break. */
  HALF_BROKEN = 4,
}

/** For `GridEntityType.PIT` (7). */
export enum PitState {
  NORMAL = 0,

  /**
   * Pits can become filled when nearby rocks are bombed into them.
   *
   * Note that the ladder collectible does not change the state to this.
   */
  FILLED = 1,
}

/** For `GridEntityType.SPIKES_ON_OFF` (9). */
export enum SpikesOnOffState {
  ON = 0,
  OFF = 1,
}

/** For `GridEntityType.SPIDERWEB` (10). */
export enum SpiderWebState {
  UNBROKEN = 0,
  BROKEN = 1,
}

/** For `GridEntityType.LOCK` (11). */
export enum LockState {
  LOCKED = 0,

  /**
   * Note that the locked block will turn to this state as soon as the key is inserted and stays
   * this state after disappearing. Thus, unlike the `RockState.BROKEN` enum, you cannot use this
   * state as a proxy for being able to move through the grid entity.
   */
  UNLOCKED = 1,
}

/**
 * For `GridEntityType.TNT` (12).
 *
 * The health of a TNT barrel is represented by its state. It starts at 0 and climbs upwards in
 * increments of 1. Once the state reaches 4, the barrel explodes, and remains at state 4.
 *
 * Breaking a TNT barrel usually takes 4 tears. However, it is possible to take less than that if
 * the players damage is high enough. (High damage causes the tear to do two or more increments at
 * once.)
 */
export enum TNTState {
  UNDAMAGED = 0,
  ONE_QUARTER_DAMAGED = 1,
  TWO_QUARTERS_DAMAGED = 2,
  THREE_QUARTERS_DAMAGED = 3,
  EXPLODED = 4,
}

/**
 * For `GridEntityType.POOP` (14).
 *
 * The health of a poop is represented by its state. It starts at 0 and climbs upwards in increments
 * of 250. Once the state reaches 1000, the poop is completely broken.
 *
 * Breaking a poop usually takes 4 tears. However, it is possible to take less than that if the
 * players damage is high enough. (High damage causes the tear to do two or more increments at
 * once.)
 *
 * Giga Poops increment by 20 instead of 250. Thus, they take around 50 tears to destroy.
 */
export enum PoopState {
  UNDAMAGED = 0,
  ONE_QUARTER_DAMAGED = 250,
  TWO_QUARTERS_DAMAGED = 500,
  THREE_QUARTERS_DAMAGED = 750,
  COMPLETELY_DESTROYED = 1000,
}

/** For `GridEntityType.DOOR` (16). */
export enum DoorState {
  INIT = 0,
  CLOSED = 1,
  OPEN = 2,
  ONE_CHAIN = 3,
  HALF_CRACKED = 4,
}

/** For `GridEntityType.TRAPDOOR` (17). */
export enum TrapdoorState {
  CLOSED = 0,
  OPEN = 1,
}

/** For `GridEntityType.CRAWL_SPACE` (18). */
export enum CrawlSpaceState {
  CLOSED = 0,
  OPEN = 1,
}

/** For `GridEntityType.PRESSURE_PLATE` (20). */
export enum PressurePlateState {
  UNPRESSED = 0,
  STATE_1_UNKNOWN = 1,
  STATE_2_UNKNOWN = 2,
  PRESSURE_PLATE_PRESSED = 3,
  REWARD_PLATE_PRESSED = 4,
}

/** For `GridEntityType.TELEPORTER` (23). */
export enum TeleporterState {
  NORMAL = 0,
  ACTIVATED = 1,

  /**
   * Set when a player stands on a teleport pad that has no corresponding pad for the player to be
   * sent to. When this happens, the pad turns black and deactivates.
   */
  DISABLED = 2,
}
