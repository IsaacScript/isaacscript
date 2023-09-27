/**
 * Most rooms have a grid index corresponding to their position on the level layout grid. Valid grid
 * indexes range from 0 through 168 (because the grid is 13x13). However, some rooms are not part of
 * the level layout grid. For off-grid rooms, they are assigned special negative integers that
 * correspond to what kind of room they are. This enum contains all of the special negative values
 * that exist.
 */
export enum GridRoom {
  /** The Devil or Angel room for the floor. */
  DEVIL = -1,

  /** The I AM ERROR room for the floor. */
  ERROR = -2,

  /** Used by the "goto" console command. */
  DEBUG = -3,

  /** The crawl space for the floor. */
  DUNGEON = -4,

  BOSS_RUSH = -5,
  BLACK_MARKET = -6,

  /** Mega Satan's boss room. */
  MEGA_SATAN = -7,

  /** The room after defeating It Lives that leads to Blue Womb. */
  BLUE_WOMB = -8,

  /** The room after defeating Hush that leads to The Void. */
  VOID = -9,

  /**
   * The room that is connected to the Boss Room that leads to the next Repentance floor.
   *
   * Additionally, this grid index is also used for the room behind the strange door on Depths 2
   * that is connected to the starting room.
   */
  SECRET_EXIT = -10,

  /** The secret crawl space under Great Gideon that is only accessible with a Chaos Card. */
  GIDEON_DUNGEON = -11,

  /** The Genesis room where you get to take new collectibles. (It looks like a clean bedroom.) */
  GENESIS = -12,

  /** The shop that appears if you have Member Card. */
  SECRET_SHOP = -13,

  /** The boss room for the 2nd phase of Rotgut. */
  ROTGUT_DUNGEON_1 = -14,

  /** The boss room for the 3rd phase of Rotgut. */
  ROTGUT_DUNGEON_2 = -15,

  /** The room before a Treasure Room that appears if you have Blue Key. */
  BLUE_ROOM = -16,

  /** The room that you are teleported to when you use a Reverse Emperor card. */
  EXTRA_BOSS = -17,

  /** The shop that you go to when you climb the ladder from The Stairway. */
  ANGEL_SHOP = -18,
}
