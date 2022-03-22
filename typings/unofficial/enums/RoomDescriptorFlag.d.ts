/**
 * Matches the RoomDescriptor.FLAG_* members of the RoomDescriptor class.
 *
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 */
declare const enum RoomDescriptorFlag {
  /**
   * Room is clear, don't spawn enemies when visiting.
   *
   * 1 << 0
   */
  CLEAR = 1 << 0,

  /**
   * All pressure plates have been triggered in this room. This won't be set if there are no trigger
   * pressure plates in the first place.
   *
   * 1 << 1
   */
  PRESSURE_PLATES_TRIGGERED = 1 << 1,

  /**
   * A Sacrifice Room has paid out.
   *
   * 1 << 2
   */
  SACRIFICE_DONE = 1 << 2,

  /**
   * A Challenge Room has finished.
   *
   * 1 << 3
   */
  CHALLENGE_DONE = 1 << 3,

  /**
   * Load Greed/Krampus instead of the room specified by the type & variant.
   *
   * 1 << 4
   */
  SURPRISE_MINIBOSS = 1 << 4,

  /**
   * Pits in this room contain water.
   *
   * 1 << 5
   */
  HAS_WATER = 1 << 5,

  /**
   * Play alternate boss music in this room.
   *
   * 1 << 6
   */
  ALT_BOSS_MUSIC = 1 << 6,

  /**
   * Don't pay out with a reward when clearing this room. Used for traps that lock the player in the
   * room when triggered.
   *
   * 1 << 7
   */
  NO_REWARD = 1 << 7,

  /**
   * Was flooded by an item (i.e. Flush).
   *
   * 1 << 8
   */
  FLOODED = 1 << 8,

  /**
   * Complete darkness.
   *
   * 1 << 9
   */
  PITCH_BLACK = 1 << 9,

  /**
   * Room spawned by Red Key.
   *
   * 1 << 10
   */
  RED_ROOM = 1 << 10,

  /**
   * Treasure room transformed by Devil's Crown.
   *
   * 1 << 11
   */
  DEVIL_TREASURE = 1 << 11,

  /**
   * Use an alternate backdrop. (This is used by some floors such as Dross and Ashpit.)
   *
   * 1 << 12
   */
  USE_ALTERNATE_BACKDROP = 1 << 12,

  /**
   * The room is covered in cursed mist; the player is temporarily reduced to base items and stats.
   *
   * 1 << 13
   */
  CURSED_MIST = 1 << 13,

  /**
   * Mama Mega has activated in this room.
   *
   * 1 << 14
   */
  MAMA_MEGA = 1 << 14,

  /**
   * Don't generate walls (for Beast arena).
   *
   * 1 << 15
   */
  NO_WALLS = 1 << 15,

  /**
   * Rotgut's heart was killed, immediately play Rotgut's death animation when reentering this room.
   *
   * 1 << 16
   */
  ROTGUT_CLEARED = 1 << 16,

  /**
   * A portal spawned by Lil Portal now links to this room; don't create more portals that link to
   * it.
   *
   * 1 << 17
   */
  PORTAL_LINKED = 1 << 17,

  /**
   * If walking into this room through a door, redirect to a Blue Womb room instead. (This is used
   * by Blue Key.)
   *
   * 1 << 18
   */
  BLUE_REDIRECT = 1 << 18,
}
