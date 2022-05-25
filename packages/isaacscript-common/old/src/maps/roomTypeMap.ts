/* cspell:disable */

import { RoomType } from "isaac-typescript-definitions";

/** Maps room type names to room types. */
export const ROOM_TYPE_MAP: ReadonlyMap<string, RoomType> = new Map([
  ["null", RoomType.NULL], // 0
  ["default", RoomType.DEFAULT], // 1
  ["shop", RoomType.SHOP], // 2
  ["error", RoomType.ERROR], // 3
  ["iamerror", RoomType.ERROR], // 3
  ["treasure", RoomType.TREASURE], // 4
  ["boss", RoomType.BOSS], // 5
  ["miniboss", RoomType.MINI_BOSS], // 6
  ["secret", RoomType.SECRET], // 7
  ["supersecret", RoomType.SUPER_SECRET], // 8
  ["arcade", RoomType.ARCADE], // 9
  ["curse", RoomType.CURSE], // 10
  ["challenge", RoomType.CHALLENGE], // 11
  ["library", RoomType.LIBRARY], // 12
  ["sacrifice", RoomType.SACRIFICE], // 13
  ["devil", RoomType.DEVIL], // 14
  ["angel", RoomType.ANGEL], // 15
  ["dungeon", RoomType.DUNGEON], // 16
  ["crawlspace", RoomType.DUNGEON], // 16
  ["bossrush", RoomType.BOSS_RUSH], // 17
  ["isaacs", RoomType.CLEAN_BEDROOM], // 18
  ["bedroom", RoomType.CLEAN_BEDROOM], // 18
  ["cleanbedroom", RoomType.CLEAN_BEDROOM], // 18
  ["barren", RoomType.DIRTY_BEDROOM], // 19
  ["dirtybedroom", RoomType.DIRTY_BEDROOM], // 19
  ["chest", RoomType.CHEST], // 20
  ["dice", RoomType.DICE], // 21
  ["blackmarket", RoomType.BLACK_MARKET], // 22
  ["greedexit", RoomType.GREED_EXIT], // 23
  ["planetarium", RoomType.PLANETARIUM], // 24
  ["teleporter", RoomType.TELEPORTER], // 25
  ["teleporterexit", RoomType.TELEPORTER_EXIT], // 26
  ["secretexit", RoomType.SECRET_EXIT], // 27
  ["blue", RoomType.BLUE], // 28
  ["ultrasecret", RoomType.ULTRA_SECRET], // 29
]);
