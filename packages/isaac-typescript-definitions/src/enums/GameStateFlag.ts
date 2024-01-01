/** Used with the `Game.GetStateFlag` and `Game.SetStateFlag` methods. */
export enum GameStateFlag {
  FAMINE_SPAWNED = 0,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  PESTILENCE_SPAWNED = 1,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  WAR_SPAWNED = 2,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  DEATH_SPAWNED = 3,

  BOSS_POOL_SWITCHED = 4,
  DEVIL_ROOM_SPAWNED = 5,
  DEVIL_ROOM_VISITED = 6,
  BOOK_REVELATIONS_USED = 7,
  BOOK_PICKED_UP = 8,
  WRATH_SPAWNED = 9,
  GLUTTONY_SPAWNED = 10,
  LUST_SPAWNED = 11,
  SLOTH_SPAWNED = 12,
  ENVY_SPAWNED = 13,
  PRIDE_SPAWNED = 14,
  GREED_SPAWNED = 15,
  SUPER_GREED_SPAWNED = 16,
  DONATION_SLOT_BROKEN = 17,
  DONATION_SLOT_JAMMED = 18,

  /**
   * Is set when the player uses the beam of light on Womb 2 to go to Cathedral. This does not get
   * unset if Womb 2 is replayed and a trapdoor is taken instead.
   */
  HEAVEN_PATH = 19,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  REBIRTH_BOSS_SWITCHED = 20,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  HAUNT_SELECTED = 21,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  ADVERSARY_SELECTED = 22,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  MR_FRED_SELECTED = 23,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  MAMA_GURDY_SELECTED = 24,

  URIEL_SPAWNED = 25,
  GABRIEL_SPAWNED = 26,
  FALLEN_SPAWNED = 27,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  HEADLESS_HORSEMAN_SPAWNED = 28,

  KRAMPUS_SPAWNED = 29,
  DONATION_SLOT_BLOWN = 30,
  SHOPKEEPER_KILLED = 31,
  ULTRA_PRIDE_SPAWNED = 32,
  BOSS_RUSH_DONE = 33,
  GREED_SLOT_JAMMED = 34,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  AFTERBIRTH_BOSS_SWITCHED = 35,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  BROWNIE_SELECTED = 36,

  SUPER_BUM_APPEARED = 37,
  BOSS_RUSH_DOOR_SPAWNED = 38,
  BLUE_WOMB_DOOR_SPAWNED = 39,
  BLUE_WOMB_DONE = 40,
  HEART_BOMB_COIN_PICKED = 41,

  /** @deprecated This only works in Afterbirth+, not Repentance. */
  AFTERBIRTH_PLUS_BOSS_SWITCHED = 42,

  /** Set when reaching 99 coins. Used to check for the Golden Razor achievement. */
  MAX_COINS_OBTAINED = 43,

  /** Set when entering a trapdoor that leads to the alternate path. */
  SECRET_PATH = 44,

  /** Set when Perfection has dropped from a boss. */
  PERFECTION_SPAWNED = 45,

  /** Set when Mom's Heart has been killed in the Mausoleum. */
  MAUSOLEUM_HEART_KILLED = 46,

  /**
   * Set when entering Mausoleum/Gehenna II through the photo door. Causes Dad's Note to spawn
   * instead of the Mom boss room. The "backwards path" refers to the Ascent.
   */
  BACKWARDS_PATH_INIT = 47,

  /** Set when the player takes Dad's Note. The "backwards path" refers to the Ascent. */
  BACKWARDS_PATH = 48,
}
