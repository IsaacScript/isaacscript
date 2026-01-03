import { RoomType } from "isaac-typescript-definitions";

export const ROOM_TYPE_NAMES = {
  [RoomType.DEFAULT]: "Default Room", // 1
  [RoomType.SHOP]: "Shop", // 2
  [RoomType.ERROR]: "I AM ERROR Room", // 3
  [RoomType.TREASURE]: "Treasure Room", // 4
  [RoomType.BOSS]: "Boss Room", // 5
  [RoomType.MINI_BOSS]: "Miniboss Room", // 6
  [RoomType.SECRET]: "Secret Room", // 7
  [RoomType.SUPER_SECRET]: "Super Secret Room", // 8
  [RoomType.ARCADE]: "Arcade", // 9
  [RoomType.CURSE]: "Curse Room", // 10
  [RoomType.CHALLENGE]: "Challenge Room", // 11
  [RoomType.LIBRARY]: "Library", // 12
  [RoomType.SACRIFICE]: "Sacrifice Room", // 13
  [RoomType.DEVIL]: "Devil Room", // 14
  [RoomType.ANGEL]: "Angel Room", // 15
  [RoomType.DUNGEON]: "Crawl Space", // 16
  [RoomType.BOSS_RUSH]: "Boss Rush", // 17
  [RoomType.CLEAN_BEDROOM]: "Clean Bedroom", // 18
  [RoomType.DIRTY_BEDROOM]: "Dirty Bedroom", // 19
  [RoomType.VAULT]: "Vault", // 20
  [RoomType.DICE]: "Dice Room", // 21
  [RoomType.BLACK_MARKET]: "Black Market", // 22
  [RoomType.GREED_EXIT]: "Greed Exit Room", // 23
  [RoomType.PLANETARIUM]: "Planetarium", // 24
  [RoomType.TELEPORTER]: "Teleporter Room", // 25
  [RoomType.TELEPORTER_EXIT]: "Teleporter Exit Room", // 26
  [RoomType.SECRET_EXIT]: "Secret Exit", // 27
  [RoomType.BLUE]: "Blue Room", // 28
  [RoomType.ULTRA_SECRET]: "Ultra Secret Room", // 29
  [RoomType.DEATHMATCH]: "Deathmatch", // 30
} as const satisfies Record<RoomType, string>;
