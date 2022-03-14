export const DEFAULT_ROOM_TYPE_NAME = "Unknown";

export const ROOM_TYPE_NAME_MAP: { readonly [key in RoomType]: string } = {
  [RoomType.ROOM_NULL]: "null room", // 0
  [RoomType.ROOM_DEFAULT]: "default room", // 1
  [RoomType.ROOM_SHOP]: "shop", // 2
  [RoomType.ROOM_ERROR]: "IAMERROR Room", // 3
  [RoomType.ROOM_TREASURE]: "Treasure Room", // 4
  [RoomType.ROOM_BOSS]: "Boss Room", // 5
  [RoomType.ROOM_MINIBOSS]: "Miniboss Room", // 6
  [RoomType.ROOM_SECRET]: "Secret Room", // 7
  [RoomType.ROOM_SUPERSECRET]: "Super Secret Room", // 8
  [RoomType.ROOM_ARCADE]: "Arcade", // 9
  [RoomType.ROOM_CURSE]: "Curse Room", // 10
  [RoomType.ROOM_CHALLENGE]: "Challenge Room", // 11
  [RoomType.ROOM_LIBRARY]: "Library", // 12
  [RoomType.ROOM_SACRIFICE]: "Sacrifice Room", // 13
  [RoomType.ROOM_DEVIL]: "Devil Room", // 14
  [RoomType.ROOM_ANGEL]: "Angel Room", // 15
  [RoomType.ROOM_DUNGEON]: "Crawlspace", // 16
  [RoomType.ROOM_BOSSRUSH]: "Boss Rush", // 17
  [RoomType.ROOM_ISAACS]: "Clean Bedroom", // 18
  [RoomType.ROOM_BARREN]: "Dirty Bedroom", // 19
  [RoomType.ROOM_CHEST]: "Chest Room", // 20
  [RoomType.ROOM_DICE]: "Dice Room", // 21
  [RoomType.ROOM_BLACK_MARKET]: "Black Market", // 22
  [RoomType.ROOM_GREED_EXIT]: "Greed Exit Room", // 23
  [RoomType.ROOM_PLANETARIUM]: "Planetarium", // 24
  [RoomType.ROOM_TELEPORTER]: "Teleporter Room", // 25
  [RoomType.ROOM_TELEPORTER_EXIT]: "Teleporter Exit Room", // 26
  [RoomType.ROOM_SECRET_EXIT]: "Secret Exit", // 27
  [RoomType.ROOM_BLUE]: "Blue Room", // 28
  [RoomType.ROOM_ULTRASECRET]: "Ultra Secret Room", // 29
  [RoomType.NUM_ROOMTYPES]: DEFAULT_ROOM_TYPE_NAME,
};
