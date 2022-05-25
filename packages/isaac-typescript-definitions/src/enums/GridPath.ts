/**
 * GridPath is not an enum, but rather a variable integer that represents the cost it would take for
 * an entity to pass through a grid entity. This enum lists some standard cost values that the
 * vanilla game uses.
 */
export enum GridPath {
  NONE = 0,

  /**
   * Set by some enemies when they pass through a tile. De-prioritizes the tile for pathfinders.
   * Degrades over time in steps of 100.
   */
  WALKED_TILE = 900,

  /** De-prioritizes the tile for pathfinders. Does not degrade. */
  FIREPLACE = 950,

  /**
   * Set by grid entities. Invalidates the tile for pathfinders. Impedes grounded player movement.
   * Does not degrade.
   */
  ROCK = 1000,

  /** Invalidates the tile for pathfinders. Impedes grounded player movement. Does not degrade. */
  PIT = 3000,

  /**
   * Invalidates the tile for pathfinders. Impedes grounded player movement. Drops to 900 and then
   * degrades over time in steps of 100. (Grimaces reset the value every frame.)
   */
  GRIMACE = 3999,
}
