export enum RoomTransitionAnim {
  /**
   * Mostly from using doors.
   *
   * Will play the correct walk animation regardless of the direction you use, as long as the
   * direction is in the same axis as the room you are traveling to.
   *
   * For example, if the room is on the left, it will play the correct animation whether you use
   * `Direction.LEFT` or `Direction.RIGHT`. If you use the wrong direction, it will just fade to the
   * next room (not fade to black, just fade). If you use `Direction.NO_DIRECTION`, it will perform
   * a fade to black.
   */
  WALK = 0,

  /**
   * The fade-in / fade-out used for Mom's Hand. If the direction is `Direction.NO_DIRECTION`, the
   * fade will be shorter.
   */
  FADE = 1,

  /**
   * The fade + pixelation effect used for secret item dungeon. (Direction does not affect the
   * pixelation length.)
   */
  PIXELATION = 2,

  /**
   * Will play the teleport animation and sound, then the walk animation using the specified
   * direction. If `Direction.NO_DIRECTION` is used, it will perform a fade to white.
   */
  TELEPORT = 3,

  /**
   * For Curse of the Maze.
   *
   * This is like `RoomTransitionAnim.WALK`, but better, since it will always play the walk
   * animation that you provide. Like `RoomTransitionAnim.WALK`, if you use
   * `Direction.NO_DIRECTION`, it will perform a fade to black.
   */
  MAZE = 4,

  /** Works like `RoomTransitionAnim.MAZE` with respect to the direction used. */
  ANKH = 5,

  /** Works like `RoomTransitionAnim.MAZE` with respect to the direction used. */
  DEAD_CAT = 6,

  /**
   * Plays `SoundEffect.ONE_UP` upon entering the room.
   *
   * Works like `RoomTransitionAnim.MAZE` with respect to the direction used.
   */
  ONE_UP = 7,

  /** Works like `RoomTransitionAnim.MAZE` with respect to the direction used. */
  COLLAR = 8,

  /** Works like `RoomTransitionAnim.MAZE` with respect to the direction used. */
  JUDAS_SHADOW = 9,

  /** Works like `RoomTransitionAnim.MAZE` with respect to the direction used. */
  LAZARUS = 10,

  /**
   * For the Ventricle Razor teleport.
   *
   * Makes the player invisible during the transition. If used to change into the same room, the
   * player's visibility won't be restored. If the direction is `Direction.NO_DIRECTION`, the fade
   * will be shorter.
   */
  WOMB_TELEPORT = 11,

  /**
   * For the Glowing Hourglass teleport.
   *
   * Using this animation will ignore the room index and the direction provided.
   */
  GLOWING_HOURGLASS = 12,

  /** Works like `RoomTransitionAnim.MAZE` with respect to the direction used. */
  D7 = 13,

  /** Works like `RoomTransitionAnim.MAZE` with respect to the direction used. */
  MISSING_POSTER = 14,

  /** No transition; goes directly to the boss intro cutscene (for the Backasswards challenge). */
  BOSS_FORCED = 15,

  /**
   * For a Card Reading teleport.
   *
   * Works like `RoomTransitionAnim.WOMB_TELEPORT`.
   */
  PORTAL_TELEPORT = 16,

  /**
   * For the Forgotten's Birthright effect.
   *
   * Works like `RoomTransitionAnim.FADE`.
   */
  FORGOTTEN_TELEPORT = 17,

  /**
   * Plays the mirror exit sound and a fade to white animation.
   *
   * If the direction is `Direction.NO_DIRECTION`, the fade will be shorter.
   */
  FADE_MIRROR = 18,

  /** Works like `RoomTransitionAnim.FADE`. */
  MINECART = 19,

  /**
   * The player lies down, the screen fades to black, and the player lies down and gets up.
   *
   * Ignores the direction, but using `Direction.NO_DIRECTION` will make the fade shorter.
   *
   * The game is paused during the lying down and getting up animation.
   */
  DEATH_CERTIFICATE = 20,
}
