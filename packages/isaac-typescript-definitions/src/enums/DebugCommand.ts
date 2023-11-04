/** The values accepted by the `debug` console command. */
export enum DebugCommand {
  /** Draws a marker on the screen at the position of each entity. */
  ENTITY_POSITIONS = 1,

  /**
   * Shows the grid cost of the corresponding grid tile. (The grid cost is used when calculating
   * pathing and collision.)
   */
  GRID_COST = 2,

  /** Taking damage does not decrease the player's health. */
  INFINITE_HP = 3,

  /** +40 damage */
  HIGH_DAMAGE = 4,

  /** Displays text at the bottom of the screen about the current room. */
  SHOW_ROOM_INFO = 5,

  /** Draws red circles on the screen that represent an entity's damage hitbox. */
  SHOW_HITSPHERES = 6,

  /**
   * Displays how much damage is taken by entities. (This is similar to the Spider Mod effect, but
   * it leaves the damage as the raw values and also includes player damage.)
   */
  SHOW_DAMAGE_VALUES = 7,

  /** The player's active item is always fully charged. */
  INFINITE_ITEM_CHARGES = 8,

  /** +50 luck */
  HIGH_LUCK = 9,

  /** All enemies take constant and rapid damage. */
  QUICK_KILL = 10,

  /** Displays the coordinates for each tile on the grid. */
  GRID_INFO = 11,

  /** Displays held collectibles and temporary collectible effects. */
  PLAYER_ITEM_INFO = 12,

  /** Draws red circles on the screen that represent an entity's collision hitbox. */
  SHOW_GRID_COLLISION_POINTS = 13,
}
