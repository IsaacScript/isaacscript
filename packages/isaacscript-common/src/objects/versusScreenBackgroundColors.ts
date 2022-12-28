import { StageID } from "isaac-typescript-definitions";

/** We arbitrarily specify a default color equal to that of Basement. */
const DEFAULT_COLOR: Readonly<Color> = Color(26 / 255, 14 / 255, 12 / 255);

/** These values are taken from StageAPI. */
// We need the colors to be read-only, so we specify the type instead of using the `satisfies`
// operator.
export const VERSUS_SCREEN_BACKGROUND_COLORS: {
  readonly [Key in StageID]: Readonly<Color>;
} = {
  [StageID.SPECIAL_ROOMS]: DEFAULT_COLOR, // 0
  [StageID.BASEMENT]: Color(26 / 255, 14 / 255, 12 / 255), // 1
  [StageID.CELLAR]: Color(26 / 255, 17 / 255, 13 / 255), // 2
  [StageID.BURNING_BASEMENT]: Color(28 / 255, 12 / 255, 10 / 255), // 3
  [StageID.CAVES]: Color(18 / 255, 13 / 255, 8 / 255), // 4
  [StageID.CATACOMBS]: Color(15 / 255, 10 / 255, 8 / 255), // 5
  [StageID.FLOODED_CAVES]: Color(21 / 255, 28 / 255, 35 / 255), // 6
  [StageID.DEPTHS]: Color(8 / 255, 8 / 255, 8 / 255), // 7
  [StageID.NECROPOLIS]: Color(10 / 255, 6 / 255, 6 / 255), // 8
  [StageID.DANK_DEPTHS]: Color(8 / 255, 8 / 255, 8 / 255), // 9
  [StageID.WOMB]: Color(27 / 255, 3 / 255, 3 / 255), // 10
  [StageID.UTERO]: Color(22 / 255, 6 / 255, 5 / 255), // 11
  [StageID.SCARRED_WOMB]: Color(42 / 255, 19 / 255, 10 / 255), // 12
  [StageID.BLUE_WOMB]: Color(26 / 255, 32 / 255, 40 / 255), // 13
  [StageID.SHEOL]: Color(6 / 255, 6 / 255, 6 / 255), // 14
  [StageID.CATHEDRAL]: Color(6 / 255, 13 / 255, 17 / 255), // 15
  [StageID.DARK_ROOM]: Color(9 / 255, 4 / 255, 3 / 255), // 16
  [StageID.CHEST]: Color(15 / 255, 9 / 255, 6 / 255), // 17
  [StageID.VOID]: Color(0, 0, 0), // 26
  [StageID.DOWNPOUR]: Color(29 / 255, 30 / 255, 32 / 255), // 27
  [StageID.DROSS]: Color(35 / 255, 35 / 255, 29 / 255), // 28
  [StageID.MINES]: Color(17 / 255, 15 / 255, 12 / 255), // 29
  [StageID.ASHPIT]: Color(12 / 255, 10 / 255, 10 / 255), // 30
  [StageID.MAUSOLEUM]: Color(14 / 255, 10 / 255, 14 / 255), // 31
  [StageID.GEHENNA]: Color(15 / 255, 4 / 255, 4 / 255), // 32
  [StageID.CORPSE]: Color(13 / 255, 14 / 255, 12 / 255), // 33
  [StageID.MORTIS]: Color(13 / 255, 14 / 255, 12 / 255), // 34
  [StageID.HOME]: DEFAULT_COLOR, // 35
  [StageID.BACKWARDS]: DEFAULT_COLOR, // 36
} as const;
