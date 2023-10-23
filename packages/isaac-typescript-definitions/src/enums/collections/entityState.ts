/* eslint-disable sort-exports/sort-exports */

/** EntityType.FAMILIAR (3), FamiliarVariant.LOST_SOUL (211). */
export enum LostSoulState {
  ALIVE = 1,
  DEAD = 4,
}

/** For `EntityType.DEATH` (66). */
export enum DeathState {
  APPEAR = 1,
  SCYTHE_APPEAR = 3,

  /** Death will wander around in his idle state. */
  MAIN_IDLE = 4,

  JUMP_OFF_HORSE = 7,
  SLOW_ATTACK = 8,
  SUMMON_KNIGHTS = 13,
  SUMMON_SCYTHES = 14,
}

/** For `EntityType.DADDY_LONG_LEGS` (101). */
export enum DaddyLongLegsState {
  /** Used at the end of the sequence of single stomp attacks. */
  SLAM_WITH_PROJECTILE_BURST = 4,

  /**
   * This is used for both the single stomp attack and the multi-stomp attack.
   *
   * When doing the multi-stomp attack, the main entity will go to state 9 and the child entities
   * will have state 7.
   */
  STOMP_ATTACK_LEG = 7,

  SPITTING_SPIDERS_ATTACK = 8,
  MULTI_STOMP_ATTACK_MAIN = 9,
}

/** For `EntityType.BIG_HORN` (411), `BigHornVariant.BIG_HORN` (0). */
export enum BigHornState {
  IDLE = 3,
  HEAD_GOING_UP_OR_GOING_DOWN_INTO_HOLE = 4,
  HAND_GOING_DOWN_INTO_HOLE = 5,
  HAND_SLAM_ATTACK = 8,

  /**
   * This is used for all types of Troll Bomb attacks. Troll Bombs can randomly be Mega Troll Bombs
   * or Hot Bombs.
   */
  HAND_THROW_TROLL_BOMB_ATTACK = 9,

  HAND_THROW_TRIPLE_TROLL_BOMB_ATTACK = 10,

  /**
   * This is used for the attack where he spits out 1 ball, spits out 2 balls, and spits out 3
   * balls.
   */
  HEAD_BALL_ATTACK = 13,
}

/** For `EntityType.REAP_CREEP` (900). */
export enum ReapCreepState {
  CRAWLING_FROM_SIDE_TO_SIDE = 3,
  JUMPING_TO_TOP_WALL = 6,
  WALL_SLAM_ATTACK = 7,
  PROJECTILE_SPIT_LINE_ATTACK = 8,
  PROJECTILE_SPIT_BURST_ATTACK = 9,

  /** This is used for both the single fat Brimstone attack and the quad-beam Brimstone attack. */
  BRIMSTONE_ATTACK = 10,

  SPAWNING_WALL_SPIDERS = 13,
  SPAWNING_SPIDERS = 14,

  /**
   * There are three phases, so Reap Creep will enter this state while going from phase 1 to phase 2
   * and when going from phase 2 to phase 3.
   */
  TRANSFORMING_TO_NEXT_PHASE = 16,
}

/** For `EntityType.COLOSTOMIA` (917). */
export enum ColostomiaState {
  IDLE_PHASE_1 = 3,
  IDLE_PHASE_2 = 4,
  JUMP_ATTACK_WITH_PROJECTILE_SPLASH = 6,
  CHARGE_SLIDE = 8,
  SPIT_POOP_BOMB = 9,
  SPIT_TWO_POOP_BOMBS = 10,
  FART_ATTACK = 11,
  TRANSITION_TO_PHASE_2 = 16,
}

/** For `EntityType.ULTRA_GREED` (406), `UltraGreedVariant.ULTRA_GREED` (0). */
export enum UltraGreedState {
  HANGING = 2,
  IDLE = 3,
  MOVE = 4,
  GOLD_STATUE_BREAKING_OUT = 16,
  EYES_SPINNING = 100,

  /** This creates Keepers (i.e. Greed Heads). */
  STOMPING = 200,

  BLOCKING_WITH_ARMS = 400,
  SPIN_ATTACK = 510,
  SHOOT_4_COINS = 600,
  DYING = 9000,

  /**
   * He only goes to this state on Greed Mode when the fight is completed. On Greedier Mode, this
   * state will never be entered, and he will instead go to state
   * `UltraGreedState.GOLD_STATUE_BREAKING_OUT` (16).
   */
  GOLD_STATUE = 9001,
}

/** For `EntityType.ULTRA_GREED` (406), `UltraGreedVariant.ULTRA_GREEDIER` (1). */
export enum UltraGreedierState {
  IDLE = 3,
  MOVE = 4,
  JUMP = 6,

  /** This creates bomb coins. */
  STOMPING = 200,

  SHOOT_4_COINS = 600,
  FIST_POUND = 700,
  FIST_POUND_TRIPLE = 710,
  DYING = 9000,
  POST_EXPLOSION = 9001,
}
