export enum RoomTransitionAnim {
  /** Mostly when using doors. */
  WALK = 0,

  /** The fade-in / fade-out used for Mom's Hand. */
  FADE = 1,

  /** The fade + pixelation effect used for secret item dungeon. */
  PIXELATION = 2,

  TELEPORT = 3,

  /** For Curse of the Maze. */
  MAZE = 4,

  ANKH = 5,
  DEAD_CAT = 6,
  ONE_UP = 7,
  COLLAR = 8,
  JUDAS_SHADOW = 9,
  LAZARUS = 10,

  /** For the Ventricle Razor teleport. */
  WOMB_TELEPORT = 11,

  /** For the Glowing Hour Glass teleport. */
  GLOWING_HOURGLASS = 12,

  D7 = 13,
  MISSING_POSTER = 14,

  /** No transition; goes directly to the boss intro cutscene (for the Backasswards challenge). */
  BOSS_FORCED = 15,

  /** For a Card Reading teleport. */
  PORTAL_TELEPORT = 16,

  /** For the Forgotten's Birthright effect. */
  FORGOTTEN_TELEPORT = 17,

  FADE_MIRROR = 18,
  MINECART = 19,
  DEATH_CERTIFICATE = 20,
}
