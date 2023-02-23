/* eslint-disable sort-exports/sort-exports */

import { NPCState } from "../NPCState";

/** EntityType.FAMILIAR (3), FamiliarVariant.LOST_SOUL (211). */
export enum LostSoulState {
  ALIVE = 1,
  DEAD = 4,
}

/** For `EntityType.DEATH` (66). */
export const DeathState = {
  APPEAR: 1 as NPCState,
  SCYTHE_APPEAR: 3 as NPCState,

  /** Death will wander around in his idle state. */
  MAIN_IDLE: 4 as NPCState,

  JUMP_OFF_HORSE: 7 as NPCState,
  SLOW_ATTACK: 8 as NPCState,
  SUMMON_KNIGHTS: 13 as NPCState,
  SUMMON_SCYTHES: 14 as NPCState,
} as const;

/** For `EntityType.DADDY_LONG_LEGS` (101). */
export const DaddyLongLegsState = {
  /** Used at the end of the sequence of single stomp attacks. */
  SLAM_WITH_PROJECTILE_BURST: 4 as NPCState,

  /**
   * This is used for both the single stomp attack and the multi-stomp attack.
   *
   * When doing the multi-stomp attack, the main entity will go to state 9 and the child entities
   * will have state 7.
   */
  STOMP_ATTACK_LEG: 7 as NPCState,

  SPITTING_SPIDERS_ATTACK: 8 as NPCState,
  MULTI_STOMP_ATTACK_MAIN: 9 as NPCState,
} as const;

/** For `EntityType.BIG_HORN` (411), `BigHornVariant.BIG_HORN` (0). */
export const BigHornState = {
  IDLE: 3 as NPCState,
  HEAD_GOING_UP_OR_GOING_DOWN_INTO_HOLE: 4 as NPCState,
  HAND_GOING_DOWN_INTO_HOLE: 5 as NPCState,
  HAND_SLAM_ATTACK: 8 as NPCState,

  /**
   * This is used for all types of Troll Bomb attacks. Troll Bombs can randomly be Mega Troll Bombs
   * or Hot Bombs.
   */
  HAND_THROW_TROLL_BOMB_ATTACK: 9 as NPCState,

  HAND_THROW_TRIPLE_TROLL_BOMB_ATTACK: 10 as NPCState,

  /**
   * This is used for the attack where he spits out 1 ball, spits out 2 balls, and spits out 3
   * balls.
   */
  HEAD_BALL_ATTACK: 13 as NPCState,
} as const;

/** For `EntityType.REAP_CREEP` (900). */
export const ReapCreepState = {
  CRAWLING_FROM_SIDE_TO_SIDE: 3 as NPCState,
  JUMPING_TO_TOP_WALL: 6 as NPCState,
  WALL_SLAM_ATTACK: 7 as NPCState,
  PROJECTILE_SPIT_LINE_ATTACK: 8 as NPCState,
  PROJECTILE_SPIT_BURST_ATTACK: 9 as NPCState,

  /** This is used for both the single fat Brimstone attack and the quad-beam Brimstone attack. */
  BRIMSTONE_ATTACK: 10 as NPCState,

  SPAWNING_WALL_SPIDERS: 13 as NPCState,
  SPAWNING_SPIDERS: 14 as NPCState,

  /**
   * There are three phases, so Reap Creep will enter this state while going from phase 1 to phase 2
   * and when going from phase 2 to phase 3.
   */
  TRANSFORMING_TO_NEXT_PHASE: 16 as NPCState,
} as const;

/** For `EntityType.COLOSTOMIA` (917). */
export const ColostomiaState = {
  IDLE_PHASE_1: 3 as NPCState,
  IDLE_PHASE_2: 4 as NPCState,
  JUMP_ATTACK_WITH_PROJECTILE_SPLASH: 6 as NPCState,
  CHARGE_SLIDE: 8 as NPCState,
  SPIT_POOP_BOMB: 9 as NPCState,
  SPIT_TWO_POOP_BOMBS: 10 as NPCState,
  FART_ATTACK: 11 as NPCState,
  TRANSITION_TO_PHASE_2: 16 as NPCState,
} as const;
