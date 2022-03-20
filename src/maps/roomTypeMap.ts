/* cspell:disable */

/** Maps room type names to room types. */
export const ROOM_TYPE_MAP: ReadonlyMap<string, RoomType> = new Map([
  ["null", RoomType.ROOM_NULL], // 0
  ["default", RoomType.ROOM_DEFAULT], // 1
  ["shop", RoomType.ROOM_SHOP], // 2
  ["error", RoomType.ROOM_ERROR], // 3
  ["iamerror", RoomType.ROOM_ERROR], // 3
  ["treasure", RoomType.ROOM_TREASURE], // 4
  ["boss", RoomType.ROOM_BOSS], // 5
  ["miniboss", RoomType.ROOM_MINIBOSS], // 6
  ["secret", RoomType.ROOM_SECRET], // 7
  ["supersecret", RoomType.ROOM_SUPERSECRET], // 8
  ["arcade", RoomType.ROOM_ARCADE], // 9
  ["curse", RoomType.ROOM_CURSE], // 10
  ["challenge", RoomType.ROOM_CHALLENGE], // 11
  ["library", RoomType.ROOM_LIBRARY], // 12
  ["sacrifice", RoomType.ROOM_SACRIFICE], // 13
  ["devil", RoomType.ROOM_DEVIL], // 14
  ["angel", RoomType.ROOM_ANGEL], // 15
  ["dungeon", RoomType.ROOM_DUNGEON], // 16
  ["crawlspace", RoomType.ROOM_DUNGEON], // 16
  ["bossrush", RoomType.ROOM_BOSSRUSH], // 17
  ["isaacs", RoomType.ROOM_ISAACS], // 18
  ["bedroom", RoomType.ROOM_ISAACS], // 18
  ["cleanbedroom", RoomType.ROOM_ISAACS], // 18
  ["barren", RoomType.ROOM_BARREN], // 19
  ["dirtybedroom", RoomType.ROOM_BARREN], // 19
  ["chest", RoomType.ROOM_CHEST], // 20
  ["dice", RoomType.ROOM_DICE], // 21
  ["blackmarket", RoomType.ROOM_BLACK_MARKET], // 22
  ["greedexit", RoomType.ROOM_GREED_EXIT], // 23
  ["planetarium", RoomType.ROOM_PLANETARIUM], // 24
  ["teleporter", RoomType.ROOM_TELEPORTER], // 25
  ["teleporterexit", RoomType.ROOM_TELEPORTER_EXIT], // 26
  ["secretexit", RoomType.ROOM_SECRET_EXIT], // 27
  ["blue", RoomType.ROOM_BLUE], // 28
  ["ultrasecret", RoomType.ROOM_ULTRASECRET], // 29
]);
