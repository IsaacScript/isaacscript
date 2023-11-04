import { StageID } from "isaac-typescript-definitions";
import { newReadonlyColor } from "../functions/readOnly";

/** We arbitrarily specify a default color equal to that of Basement. */
const DEFAULT_COLOR = newReadonlyColor(201 / 255, 114 / 255, 96 / 255);

/** These values are taken from StageAPI. */
export const VERSUS_SCREEN_DIRT_SPOT_COLORS = {
  [StageID.SPECIAL_ROOMS]: DEFAULT_COLOR, // 0
  [StageID.BASEMENT]: newReadonlyColor(201 / 255, 114 / 255, 96 / 255), // 1
  [StageID.CELLAR]: newReadonlyColor(229 / 255, 157 / 255, 111 / 255), // 2
  [StageID.BURNING_BASEMENT]: newReadonlyColor(252 / 255, 108 / 255, 90 / 255), // 3
  [StageID.CAVES]: newReadonlyColor(167 / 255, 111 / 255, 75 / 255), // 4
  [StageID.CATACOMBS]: newReadonlyColor(135 / 255, 90 / 255, 80 / 255), // 5
  [StageID.FLOODED_CAVES]: newReadonlyColor(111 / 255, 147 / 255, 180 / 255), // 6
  [StageID.DEPTHS]: newReadonlyColor(70 / 255, 70 / 255, 72 / 255), // 7
  [StageID.NECROPOLIS]: newReadonlyColor(88 / 255, 67 / 255, 54 / 255), // 8
  [StageID.DANK_DEPTHS]: newReadonlyColor(70 / 255, 70 / 255, 72 / 255), // 9
  [StageID.WOMB]: newReadonlyColor(241 / 255, 28 / 255, 28 / 255), // 10
  [StageID.UTERO]: newReadonlyColor(199 / 255, 60 / 255, 48 / 255), // 11
  [StageID.SCARRED_WOMB]: newReadonlyColor(247 / 255, 152 / 255, 88 / 255), // 12
  [StageID.BLUE_WOMB]: newReadonlyColor(157 / 255, 209 / 255, 255 / 255), // 13
  [StageID.SHEOL]: newReadonlyColor(60 / 255, 54 / 255, 54 / 255), // 14
  [StageID.CATHEDRAL]: newReadonlyColor(44 / 255, 100 / 255, 111 / 255), // 15
  [StageID.DARK_ROOM]: newReadonlyColor(80 / 255, 38 / 255, 20 / 255), // 16
  [StageID.CHEST]: newReadonlyColor(175 / 255, 108 / 255, 72 / 255), // 17
  [StageID.VOID]: newReadonlyColor(70 / 255, 5 / 255, 5 / 255), // 26
  [StageID.DOWNPOUR]: newReadonlyColor(149 / 255, 157 / 255, 167 / 255), // 27
  [StageID.DROSS]: newReadonlyColor(179 / 255, 179 / 255, 143 / 255), // 28
  [StageID.MINES]: newReadonlyColor(93 / 255, 85 / 255, 72 / 255), // 29
  [StageID.ASHPIT]: newReadonlyColor(106 / 255, 102 / 255, 94 / 255), // 30
  [StageID.MAUSOLEUM]: newReadonlyColor(70 / 255, 59 / 255, 72 / 255), // 31
  [StageID.GEHENNA]: newReadonlyColor(59 / 255, 41 / 255, 41 / 255), // 32
  [StageID.CORPSE]: newReadonlyColor(124 / 255, 134 / 255, 111 / 255), // 33
  [StageID.MORTIS]: newReadonlyColor(124 / 255, 134 / 255, 111 / 255), // 34
  [StageID.HOME]: DEFAULT_COLOR, // 35
  [StageID.BACKWARDS]: DEFAULT_COLOR, // 36
} as const satisfies Record<StageID, Readonly<Color>>;
