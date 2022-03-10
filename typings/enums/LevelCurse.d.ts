declare enum LevelCurse {
  CURSE_NONE = 0,

  /** 1 << 0 */
  CURSE_OF_DARKNESS = 1 << 0,

  /** 1 << 1 */
  CURSE_OF_LABYRINTH = 1 << 1,

  /** 1 << 2 */
  CURSE_OF_THE_LOST = 1 << 2,

  /** 1 << 3 */
  CURSE_OF_THE_UNKNOWN = 1 << 3,

  /** 1 << 4 */
  CURSE_OF_THE_CURSED = 1 << 4,

  /** 1 << 5 */
  CURSE_OF_MAZE = 1 << 5,

  /** 1 << 6 */
  CURSE_OF_BLIND = 1 << 6,

  /** 1 << 7 */
  CURSE_OF_GIANT = 1 << 7,

  NUM_CURSES = 9,
}
