export enum FadeoutTarget {
  /**
   * With this value, the game will fade to black and then just immediately return to the game at
   * normal opacity.
   */
  NONE = 0,

  /** The screen that has the three rectangles for the three different save files. */
  FILE_SELECT = 1,

  /** The screen that lists "New Run", "Continue", "Challenges", and so on. */
  MAIN_MENU = 2,

  /** The screen that shows "The Binding of Isaac: Repentance". */
  TITLE_SCREEN = 3,

  RESTART_RUN = 4,
}
