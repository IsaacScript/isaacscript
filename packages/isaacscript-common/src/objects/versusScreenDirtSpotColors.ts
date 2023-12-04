import { StageID } from "isaac-typescript-definitions";
import { newReadonlyColor } from "../functions/readOnly";

const BASEMENT_COLOR = newReadonlyColor(201 / 255, 114 / 255, 96 / 255);
const CAVES_COLOR = newReadonlyColor(167 / 255, 111 / 255, 75 / 255);
const DEPTHS_COLOR = newReadonlyColor(70 / 255, 70 / 255, 72 / 255);
const WOMB_COLOR = newReadonlyColor(241 / 255, 28 / 255, 28 / 255);
const SHEOL_COLOR = newReadonlyColor(60 / 255, 54 / 255, 54 / 255);

/** We arbitrarily specify a default color equal to that of Basement. */
const DEFAULT_COLOR = BASEMENT_COLOR;

/** These values are taken from StageAPI. */
export const VERSUS_SCREEN_DIRT_SPOT_COLORS = {
  [StageID.SPECIAL_ROOMS]: DEFAULT_COLOR, // 0
  [StageID.BASEMENT]: BASEMENT_COLOR, // 1
  [StageID.CELLAR]: newReadonlyColor(229 / 255, 157 / 255, 111 / 255), // 2
  [StageID.BURNING_BASEMENT]: newReadonlyColor(252 / 255, 108 / 255, 90 / 255), // 3
  [StageID.CAVES]: CAVES_COLOR, // 4
  [StageID.CATACOMBS]: newReadonlyColor(135 / 255, 90 / 255, 80 / 255), // 5
  [StageID.FLOODED_CAVES]: newReadonlyColor(111 / 255, 147 / 255, 180 / 255), // 6
  [StageID.DEPTHS]: DEPTHS_COLOR, // 7
  [StageID.NECROPOLIS]: newReadonlyColor(88 / 255, 67 / 255, 54 / 255), // 8
  [StageID.DANK_DEPTHS]: DEPTHS_COLOR, // 9
  [StageID.WOMB]: WOMB_COLOR, // 10
  [StageID.UTERO]: newReadonlyColor(199 / 255, 60 / 255, 48 / 255), // 11
  [StageID.SCARRED_WOMB]: newReadonlyColor(247 / 255, 152 / 255, 88 / 255), // 12
  [StageID.BLUE_WOMB]: newReadonlyColor(157 / 255, 209 / 255, 255 / 255), // 13
  [StageID.SHEOL]: SHEOL_COLOR, // 14
  [StageID.CATHEDRAL]: newReadonlyColor(44 / 255, 100 / 255, 111 / 255), // 15
  [StageID.DARK_ROOM]: newReadonlyColor(80 / 255, 38 / 255, 20 / 255), // 16
  [StageID.CHEST]: newReadonlyColor(175 / 255, 108 / 255, 72 / 255), // 17
  [StageID.SPECIAL_ROOMS_GREED_MODE]: DEFAULT_COLOR, // 18
  [StageID.BASEMENT_GREED_MODE]: BASEMENT_COLOR, // 19
  [StageID.CAVES_GREED_MODE]: CAVES_COLOR, // 20
  [StageID.DEPTHS_GREED_MODE]: DEPTHS_COLOR, // 21
  [StageID.WOMB_GREED_MODE]: WOMB_COLOR, // 22
  [StageID.SHEOL_GREED_MODE]: SHEOL_COLOR, // 23
  [StageID.SHOP_GREED_MODE]: DEFAULT_COLOR, // 24
  [StageID.ULTRA_GREED_GREED_MODE]: DEFAULT_COLOR, // 25
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
