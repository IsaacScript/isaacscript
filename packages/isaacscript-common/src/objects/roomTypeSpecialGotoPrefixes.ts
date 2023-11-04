import { RoomType } from "isaac-typescript-definitions";

export const ROOM_TYPE_SPECIAL_GOTO_PREFIXES = {
  [RoomType.DEFAULT]: "default", // 1
  [RoomType.SHOP]: "shop", // 2
  [RoomType.ERROR]: "error", // 3
  [RoomType.TREASURE]: "treasure", // 4
  [RoomType.BOSS]: "boss", // 5
  [RoomType.MINI_BOSS]: "miniboss", // 6
  [RoomType.SECRET]: "secret", // 7
  [RoomType.SUPER_SECRET]: "supersecret", // 8
  [RoomType.ARCADE]: "arcade", // 9
  [RoomType.CURSE]: "curse", // 10
  [RoomType.CHALLENGE]: "challenge", // 11
  [RoomType.LIBRARY]: "library", // 12
  [RoomType.SACRIFICE]: "sacrifice", // 13
  [RoomType.DEVIL]: "devil", // 14
  [RoomType.ANGEL]: "angel", // 15
  [RoomType.DUNGEON]: "itemdungeon", // 16
  [RoomType.BOSS_RUSH]: "bossrush", // 17
  [RoomType.CLEAN_BEDROOM]: "isaacs", // 18
  [RoomType.DIRTY_BEDROOM]: "barren", // 19
  [RoomType.VAULT]: "chest", // 20
  [RoomType.DICE]: "dice", // 21
  [RoomType.BLACK_MARKET]: "blackmarket", // 22
  [RoomType.GREED_EXIT]: "greedexit", // 23
  [RoomType.PLANETARIUM]: "planetarium", // 24
  [RoomType.TELEPORTER]: "teleporter", // 25
  [RoomType.TELEPORTER_EXIT]: "teleporterexit", // 26
  [RoomType.SECRET_EXIT]: "secretexit", // 27
  [RoomType.BLUE]: "blue", // 28
  [RoomType.ULTRA_SECRET]: "ultrasecret", // 29
} as const satisfies Record<RoomType, string>;
