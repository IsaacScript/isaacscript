/** For EntityType.ENTITY_DADDYLONGLEGS (101) */
declare const enum DaddyLongLegsState {
  /** Used at the end of the sequence of single stomp attacks. */
  TEAR_BURST = 4,
  /**
   * This is used for both the single stomp attack and the multi-stomp attack.
   * When doing the multi-stomp attack, the main entity will go to state 9 and the child entities
   * will have state 7.
   */
  STOMP_ATTACK_LEG = 7,
  SPITTING_SPIDERS_ATTACK = 8,
  MULTI_STOMP_ATTACK_MAIN = 9,
}
