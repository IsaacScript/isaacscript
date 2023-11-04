export enum StageType {
  /** e.g. Basement, Caves, Depths, and so on. */
  ORIGINAL = 0,

  /** e.g. Cellar, Catacombs, Necropolis, and so on. */
  WRATH_OF_THE_LAMB = 1,

  /** e.g. Burning Basement, Flooded Caves, Dank Depths, and so on. */
  AFTERBIRTH = 2,

  /**
   * Deprecated; no longer used. (Greed Mode stages now use the normal stage types in Repentance.)
   */
  GREED_MODE = 3,

  /** e.g. Downpour, Mines, Mausoleum, and so on. */
  REPENTANCE = 4,

  /** e.g. Dross, Ashpit, Gehenna, and so on. */
  REPENTANCE_B = 5,
}
