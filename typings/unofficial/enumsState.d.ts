/** For EntityType.ENTITY_DADDYLONGLEGS (101) */
declare const enum DaddyLongLegsState {
  /** Used at the end of the sequence of single stomp attacks. */
  SLAM_WITH_PROJECTILE_BURST = 4,
  /**
   * This is used for both the single stomp attack and the multi-stomp attack.
   * When doing the multi-stomp attack, the main entity will go to state 9 and the child entities
   * will have state 7.
   */
  STOMP_ATTACK_LEG = 7,
  SPITTING_SPIDERS_ATTACK = 8,
  MULTI_STOMP_ATTACK_MAIN = 9,
}

/* For EntityType.ENTITY_REAP_CREEP (900) */
declare const enum ReapCreepState {
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
