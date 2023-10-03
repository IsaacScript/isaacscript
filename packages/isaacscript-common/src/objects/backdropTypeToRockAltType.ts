import { BackdropType } from "isaac-typescript-definitions";
import { RockAltType } from "../enums/RockAltType";

/** Used by the `getRockAltType` function. */
export const BACKDROP_TYPE_TO_ROCK_ALT_TYPE = {
  [BackdropType.BASEMENT]: RockAltType.URN, // 1
  [BackdropType.CELLAR]: RockAltType.URN, // 2
  [BackdropType.BURNING_BASEMENT]: RockAltType.URN, // 3
  [BackdropType.CAVES]: RockAltType.MUSHROOM, // 4
  [BackdropType.CATACOMBS]: RockAltType.MUSHROOM, // 5
  [BackdropType.FLOODED_CAVES]: RockAltType.MUSHROOM, // 6
  [BackdropType.DEPTHS]: RockAltType.SKULL, // 7
  [BackdropType.NECROPOLIS]: RockAltType.SKULL, // 8
  [BackdropType.DANK_DEPTHS]: RockAltType.SKULL, // 9
  [BackdropType.WOMB]: RockAltType.POLYP, // 10
  [BackdropType.UTERO]: RockAltType.POLYP, // 11
  [BackdropType.SCARRED_WOMB]: RockAltType.POLYP, // 12
  [BackdropType.BLUE_WOMB]: RockAltType.POLYP, // 13
  [BackdropType.SHEOL]: RockAltType.SKULL, // 14
  [BackdropType.CATHEDRAL]: RockAltType.URN, // 15
  [BackdropType.DARK_ROOM]: RockAltType.SKULL, // 16
  [BackdropType.CHEST]: RockAltType.URN, // 17
  [BackdropType.MEGA_SATAN]: RockAltType.URN, // 18
  [BackdropType.LIBRARY]: RockAltType.URN, // 19
  [BackdropType.SHOP]: RockAltType.URN, // 20
  [BackdropType.CLEAN_BEDROOM]: RockAltType.URN, // 21
  [BackdropType.DIRTY_BEDROOM]: RockAltType.URN, // 22
  [BackdropType.SECRET]: RockAltType.MUSHROOM, // 23
  [BackdropType.DICE]: RockAltType.URN, // 24
  [BackdropType.ARCADE]: RockAltType.URN, // 25
  [BackdropType.ERROR_ROOM]: RockAltType.URN, // 26
  [BackdropType.BLUE_WOMB_PASS]: RockAltType.POLYP, // 27
  [BackdropType.GREED_SHOP]: RockAltType.URN, // 28
  [BackdropType.DUNGEON]: RockAltType.URN, // 29
  [BackdropType.SACRIFICE]: RockAltType.SKULL, // 30
  [BackdropType.DOWNPOUR]: RockAltType.BUCKET_DOWNPOUR, // 31
  [BackdropType.MINES]: RockAltType.MUSHROOM, // 32
  [BackdropType.MAUSOLEUM]: RockAltType.SKULL, // 33
  [BackdropType.CORPSE]: RockAltType.POLYP, // 34
  [BackdropType.PLANETARIUM]: RockAltType.URN, // 35
  [BackdropType.DOWNPOUR_ENTRANCE]: RockAltType.BUCKET_DOWNPOUR, // 36
  [BackdropType.MINES_ENTRANCE]: RockAltType.MUSHROOM, // 37
  [BackdropType.MAUSOLEUM_ENTRANCE]: RockAltType.SKULL, // 38
  [BackdropType.CORPSE_ENTRANCE]: RockAltType.SKULL, // 39
  [BackdropType.MAUSOLEUM_2]: RockAltType.SKULL, // 40
  [BackdropType.MAUSOLEUM_3]: RockAltType.SKULL, // 41
  [BackdropType.MAUSOLEUM_4]: RockAltType.SKULL, // 42
  [BackdropType.CORPSE_2]: RockAltType.POLYP, // 43
  [BackdropType.CORPSE_3]: RockAltType.POLYP, // 44
  [BackdropType.DROSS]: RockAltType.BUCKET_DROSS, // 45
  [BackdropType.ASHPIT]: RockAltType.MUSHROOM, // 46
  [BackdropType.GEHENNA]: RockAltType.SKULL, // 47
  [BackdropType.MORTIS]: RockAltType.POLYP, // 48
  [BackdropType.ISAACS_BEDROOM]: RockAltType.URN, // 49
  [BackdropType.HALLWAY]: RockAltType.URN, // 50
  [BackdropType.MOMS_BEDROOM]: RockAltType.URN, // 51
  [BackdropType.CLOSET]: RockAltType.URN, // 52
  [BackdropType.CLOSET_B]: RockAltType.URN, // 53
  [BackdropType.DOGMA]: RockAltType.URN, // 54
  [BackdropType.DUNGEON_GIDEON]: RockAltType.URN, // 55
  [BackdropType.DUNGEON_ROTGUT]: RockAltType.URN, // 56
  [BackdropType.DUNGEON_BEAST]: RockAltType.URN, // 57
  [BackdropType.MINES_SHAFT]: RockAltType.MUSHROOM, // 58
  [BackdropType.ASHPIT_SHAFT]: RockAltType.MUSHROOM, // 59
  [BackdropType.DARK_CLOSET]: RockAltType.SKULL, // 60
} as const satisfies Record<BackdropType, RockAltType>;
