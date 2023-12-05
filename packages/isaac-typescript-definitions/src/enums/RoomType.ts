/** This enum is contiguous. (Every value is satisfied between 1 and 29, inclusive.) */
export enum RoomType {
  // The value of "NULL" is removed, since there are no vanilla rooms with this value and it should
  // be impossible to retrieve this value from the API.

  DEFAULT = 1,
  SHOP = 2,
  ERROR = 3,
  TREASURE = 4,
  BOSS = 5,
  MINI_BOSS = 6,
  SECRET = 7,
  SUPER_SECRET = 8,
  ARCADE = 9,
  CURSE = 10,

  /** This includes both normal Challenge Rooms and Boss Challenge Rooms. */
  CHALLENGE = 11,

  LIBRARY = 12,
  SACRIFICE = 13,
  DEVIL = 14,
  ANGEL = 15,

  /** This is the room type of a crawl space. */
  DUNGEON = 16,

  BOSS_RUSH = 17,
  CLEAN_BEDROOM = 18,
  DIRTY_BEDROOM = 19,
  VAULT = 20,
  DICE = 21,
  BLACK_MARKET = 22,
  GREED_EXIT = 23,
  PLANETARIUM = 24,

  /** The Mausoleum teleporter entrance. Currently unused. */
  TELEPORTER = 25,

  /** The Mausoleum teleporter exit. Currently unused. */
  TELEPORTER_EXIT = 26,

  /**
   * The room with a trapdoor to the Repentance floors. This also includes the "strange room" on
   * Depths 2.
   */
  SECRET_EXIT = 27,

  /** The Blue Womb rooms spawned by the Blue Key. */
  BLUE = 28,

  ULTRA_SECRET = 29,
}
