import { StageID } from "isaac-typescript-definitions";
import { newReadonlyColor } from "../functions/readOnly";

/** We arbitrarily specify a default color equal to that of Basement. */
const DEFAULT_COLOR = newReadonlyColor(26 / 255, 14 / 255, 12 / 255);

/** These values are taken from StageAPI. */
export const VERSUS_SCREEN_BACKGROUND_COLORS = {
  [StageID.SPECIAL_ROOMS]: DEFAULT_COLOR, // 0
  [StageID.BASEMENT]: newReadonlyColor(26 / 255, 14 / 255, 12 / 255), // 1
  [StageID.CELLAR]: newReadonlyColor(26 / 255, 17 / 255, 13 / 255), // 2
  [StageID.BURNING_BASEMENT]: newReadonlyColor(28 / 255, 12 / 255, 10 / 255), // 3
  [StageID.CAVES]: newReadonlyColor(18 / 255, 13 / 255, 8 / 255), // 4
  [StageID.CATACOMBS]: newReadonlyColor(15 / 255, 10 / 255, 8 / 255), // 5
  [StageID.FLOODED_CAVES]: newReadonlyColor(21 / 255, 28 / 255, 35 / 255), // 6
  [StageID.DEPTHS]: newReadonlyColor(8 / 255, 8 / 255, 8 / 255), // 7
  [StageID.NECROPOLIS]: newReadonlyColor(10 / 255, 6 / 255, 6 / 255), // 8
  [StageID.DANK_DEPTHS]: newReadonlyColor(8 / 255, 8 / 255, 8 / 255), // 9
  [StageID.WOMB]: newReadonlyColor(27 / 255, 3 / 255, 3 / 255), // 10
  [StageID.UTERO]: newReadonlyColor(22 / 255, 6 / 255, 5 / 255), // 11
  [StageID.SCARRED_WOMB]: newReadonlyColor(42 / 255, 19 / 255, 10 / 255), // 12
  [StageID.BLUE_WOMB]: newReadonlyColor(26 / 255, 32 / 255, 40 / 255), // 13
  [StageID.SHEOL]: newReadonlyColor(6 / 255, 6 / 255, 6 / 255), // 14
  [StageID.CATHEDRAL]: newReadonlyColor(6 / 255, 13 / 255, 17 / 255), // 15
  [StageID.DARK_ROOM]: newReadonlyColor(9 / 255, 4 / 255, 3 / 255), // 16
  [StageID.CHEST]: newReadonlyColor(15 / 255, 9 / 255, 6 / 255), // 17
  [StageID.VOID]: newReadonlyColor(0, 0, 0), // 26
  [StageID.DOWNPOUR]: newReadonlyColor(29 / 255, 30 / 255, 32 / 255), // 27
  [StageID.DROSS]: newReadonlyColor(35 / 255, 35 / 255, 29 / 255), // 28
  [StageID.MINES]: newReadonlyColor(17 / 255, 15 / 255, 12 / 255), // 29
  [StageID.ASHPIT]: newReadonlyColor(12 / 255, 10 / 255, 10 / 255), // 30
  [StageID.MAUSOLEUM]: newReadonlyColor(14 / 255, 10 / 255, 14 / 255), // 31
  [StageID.GEHENNA]: newReadonlyColor(15 / 255, 4 / 255, 4 / 255), // 32
  [StageID.CORPSE]: newReadonlyColor(13 / 255, 14 / 255, 12 / 255), // 33
  [StageID.MORTIS]: newReadonlyColor(13 / 255, 14 / 255, 12 / 255), // 34
  [StageID.HOME]: DEFAULT_COLOR, // 35
  [StageID.BACKWARDS]: DEFAULT_COLOR, // 36
} as const satisfies Record<StageID, Readonly<Color>>;
