import { RoomType } from "isaac-typescript-definitions";

export const ROOM_TYPE_GOTO_PREFIXES: {
  readonly [key in RoomType]: string;
} = {
  [RoomType.DEFAULT]: "d.", // 1
  [RoomType.SHOP]: "s.shop.", // 2
  [RoomType.ERROR]: "s.error.", // 3
  [RoomType.TREASURE]: "s.treasure.", // 4
  [RoomType.BOSS]: "s.boss.", // 5
  [RoomType.MINI_BOSS]: "s.miniboss.", // 6
  [RoomType.SECRET]: "s.secret.", // 7
  [RoomType.SUPER_SECRET]: "s.supersecret.", // 8
  [RoomType.ARCADE]: "s.arcade.", // 9
  [RoomType.CURSE]: "s.curse.", // 10
  [RoomType.CHALLENGE]: "s.challenge.", // 11
  [RoomType.LIBRARY]: "s.library.", // 12
  [RoomType.SACRIFICE]: "s.sacrifice.", // 13
  [RoomType.DEVIL]: "s.devil.", // 14
  [RoomType.ANGEL]: "s.angel.", // 15
  [RoomType.DUNGEON]: "s.itemdungeon.", // 16
  [RoomType.BOSS_RUSH]: "s.bossrush.", // 17
  [RoomType.CLEAN_BEDROOM]: "s.isaacs.", // 18
  [RoomType.DIRTY_BEDROOM]: "s.barren.", // 19
  [RoomType.CHEST]: "s.chest.", // 20
  [RoomType.DICE]: "s.dice.", // 21
  [RoomType.BLACK_MARKET]: "s.blackmarket.", // 22
  [RoomType.GREED_EXIT]: "s.greedexit.", // 23
  [RoomType.PLANETARIUM]: "s.planetarium.", // 24
  [RoomType.TELEPORTER]: "s.teleporter.", // 25
  [RoomType.TELEPORTER_EXIT]: "s.teleporterexit.", // 26
  [RoomType.SECRET_EXIT]: "s.secretexit.", // 27
  [RoomType.BLUE]: "s.blue.", // 28
  [RoomType.ULTRA_SECRET]: "s.ultrasecret.", // 29
} as const;
