import { StageID } from "isaac-typescript-definitions";
import { newReadonlyColor } from "../functions/readOnly";

const BASEMENT_COLOR = newReadonlyColor(26 / 255, 14 / 255, 12 / 255);
const CAVES_COLOR = newReadonlyColor(18 / 255, 13 / 255, 8 / 255);
const DEPTHS_COLOR = newReadonlyColor(8 / 255, 8 / 255, 8 / 255);
const WOMB_COLOR = newReadonlyColor(27 / 255, 3 / 255, 3 / 255);
const SHEOL_COLOR = newReadonlyColor(6 / 255, 6 / 255, 6 / 255);

/** We arbitrarily specify a default color equal to that of Basement. */
const DEFAULT_COLOR = BASEMENT_COLOR;

/** These values are taken from StageAPI. */
export const VERSUS_SCREEN_BACKGROUND_COLORS = {
  [StageID.SPECIAL_ROOMS]: DEFAULT_COLOR, // 0
  [StageID.BASEMENT]: BASEMENT_COLOR, // 1
  [StageID.CELLAR]: newReadonlyColor(26 / 255, 17 / 255, 13 / 255), // 2
  [StageID.BURNING_BASEMENT]: newReadonlyColor(28 / 255, 12 / 255, 10 / 255), // 3
  [StageID.CAVES]: CAVES_COLOR, // 4
  [StageID.CATACOMBS]: newReadonlyColor(15 / 255, 10 / 255, 8 / 255), // 5
  [StageID.FLOODED_CAVES]: newReadonlyColor(21 / 255, 28 / 255, 35 / 255), // 6
  [StageID.DEPTHS]: DEPTHS_COLOR, // 7
  [StageID.NECROPOLIS]: newReadonlyColor(10 / 255, 6 / 255, 6 / 255), // 8
  [StageID.DANK_DEPTHS]: DEPTHS_COLOR, // 9
  [StageID.WOMB]: WOMB_COLOR, // 10
  [StageID.UTERO]: newReadonlyColor(22 / 255, 6 / 255, 5 / 255), // 11
  [StageID.SCARRED_WOMB]: newReadonlyColor(42 / 255, 19 / 255, 10 / 255), // 12
  [StageID.BLUE_WOMB]: newReadonlyColor(26 / 255, 32 / 255, 40 / 255), // 13
  [StageID.SHEOL]: SHEOL_COLOR, // 14
  [StageID.CATHEDRAL]: newReadonlyColor(6 / 255, 13 / 255, 17 / 255), // 15
  [StageID.DARK_ROOM]: newReadonlyColor(9 / 255, 4 / 255, 3 / 255), // 16
  [StageID.CHEST]: newReadonlyColor(15 / 255, 9 / 255, 6 / 255), // 17
  [StageID.SPECIAL_ROOMS_GREED_MODE]: DEFAULT_COLOR, // 18
  [StageID.BASEMENT_GREED_MODE]: BASEMENT_COLOR, // 19
  [StageID.CAVES_GREED_MODE]: CAVES_COLOR, // 20
  [StageID.DEPTHS_GREED_MODE]: DEPTHS_COLOR, // 21
  [StageID.WOMB_GREED_MODE]: WOMB_COLOR, // 22
  [StageID.SHEOL_GREED_MODE]: SHEOL_COLOR, // 23
  [StageID.SHOP_GREED_MODE]: DEFAULT_COLOR, // 24
  [StageID.ULTRA_GREED_GREED_MODE]: DEFAULT_COLOR, // 25
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
