declare enum RoomType {
  ROOM_NULL = 0,
  ROOM_DEFAULT = 1,
  ROOM_SHOP = 2,
  ROOM_ERROR = 3,
  ROOM_TREASURE = 4,
  ROOM_BOSS = 5,
  ROOM_MINIBOSS = 6,
  ROOM_SECRET = 7,
  ROOM_SUPERSECRET = 8,
  ROOM_ARCADE = 9,
  ROOM_CURSE = 10,

  /** This includes both normal Challenge Rooms and Boss Challenge Rooms. */
  ROOM_CHALLENGE = 11,

  ROOM_LIBRARY = 12,
  ROOM_SACRIFICE = 13,
  ROOM_DEVIL = 14,
  ROOM_ANGEL = 15,

  /** This is the room type of a crawlspace. */
  ROOM_DUNGEON = 16,

  ROOM_BOSSRUSH = 17,

  /** A clean bedroom. */
  ROOM_ISAACS = 18,

  /** A dirty bedroom. */
  ROOM_BARREN = 19,

  ROOM_CHEST = 20,
  ROOM_DICE = 21,
  ROOM_BLACK_MARKET = 22,
  ROOM_GREED_EXIT = 23,
  ROOM_PLANETARIUM = 24,

  /** The Mausoleum teleporter entrance. Currently unused. */
  ROOM_TELEPORTER = 25,

  /** The Mausoleum teleporter exit. Currently unused. */
  ROOM_TELEPORTER_EXIT = 26,

  /**
   * The room with a trapdoor to the Repentance floors. This also includes the "strange room" on
   * Depths 2.
   */
  ROOM_SECRET_EXIT = 27,

  /** The Blue Womb rooms spawned by the Blue Key. */
  ROOM_BLUE = 28,

  ROOM_ULTRASECRET = 29,

  NUM_ROOMTYPES = 30,
}
