import { RoomType } from "isaac-typescript-definitions";
import { ReadonlyMap } from "../types/ReadonlyMap";

/** Maps room names to the values of the `RoomType` enum. */
export const ROOM_NAME_TO_TYPE_MAP = new ReadonlyMap<string, RoomType>([
  ["default", RoomType.DEFAULT], // 1
  ["shop", RoomType.SHOP], // 2
  ["error", RoomType.ERROR], // 3
  ["iAmError", RoomType.ERROR], // 3
  ["treasure", RoomType.TREASURE], // 4
  ["boss", RoomType.BOSS], // 5
  ["miniBoss", RoomType.MINI_BOSS], // 6
  ["secret", RoomType.SECRET], // 7
  ["superSecret", RoomType.SUPER_SECRET], // 8
  ["arcade", RoomType.ARCADE], // 9
  ["curse", RoomType.CURSE], // 10
  ["challenge", RoomType.CHALLENGE], // 11
  ["library", RoomType.LIBRARY], // 12
  ["sacrifice", RoomType.SACRIFICE], // 13
  ["devil", RoomType.DEVIL], // 14
  ["angel", RoomType.ANGEL], // 15
  ["dungeon", RoomType.DUNGEON], // 16
  ["crawlSpace", RoomType.DUNGEON], // 16
  ["bossRush", RoomType.BOSS_RUSH], // 17
  ["isaacs", RoomType.CLEAN_BEDROOM], // 18
  ["bedroom", RoomType.CLEAN_BEDROOM], // 18
  ["cleanBedroom", RoomType.CLEAN_BEDROOM], // 18
  ["dirtyBedroom", RoomType.DIRTY_BEDROOM], // 19
  ["barren", RoomType.DIRTY_BEDROOM], // 19
  ["vault", RoomType.VAULT], // 20
  ["chest", RoomType.VAULT], // 20
  ["dice", RoomType.DICE], // 21
  ["blackMarket", RoomType.BLACK_MARKET], // 22
  ["greedExit", RoomType.GREED_EXIT], // 23
  ["planetarium", RoomType.PLANETARIUM], // 24
  ["teleporter", RoomType.TELEPORTER], // 25
  ["teleporterExit", RoomType.TELEPORTER_EXIT], // 26
  ["secretExit", RoomType.SECRET_EXIT], // 27
  ["blue", RoomType.BLUE], // 28
  ["ultraSecret", RoomType.ULTRA_SECRET], // 29
]);
