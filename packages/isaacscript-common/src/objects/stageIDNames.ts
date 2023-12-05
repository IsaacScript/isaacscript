import { StageID } from "isaac-typescript-definitions";

/**
 * Derived from "stages.xml". Note that unlike "stages.xml":
 *
 * - `StageID.BLUE_WOMB` (13) is specified with a name of "Blue Womb" instead of "???".
 * - `StageID.StageID.BACKWARDS` (36) is specified with a name of "The Ascent" instead of "???".
 */
export const STAGE_ID_NAMES = {
  [StageID.SPECIAL_ROOMS]: "Special Rooms", // 0
  [StageID.BASEMENT]: "Basement", // 1
  [StageID.CELLAR]: "Cellar", // 2
  [StageID.BURNING_BASEMENT]: "Burning Basement", // 3
  [StageID.CAVES]: "Caves", // 4
  [StageID.CATACOMBS]: "Catacombs", // 5
  [StageID.FLOODED_CAVES]: "Flooded Caves", // 6
  [StageID.DEPTHS]: "Depths", // 7
  [StageID.NECROPOLIS]: "Necropolis", // 8
  [StageID.DANK_DEPTHS]: "Dank Depths", // 9
  [StageID.WOMB]: "Womb", // 10
  [StageID.UTERO]: "Utero", // 11
  [StageID.SCARRED_WOMB]: "Scarred Womb", // 12
  [StageID.BLUE_WOMB]: "Blue Womb", // 13
  [StageID.SHEOL]: "Sheol", // 14
  [StageID.CATHEDRAL]: "Cathedral", // 15
  [StageID.DARK_ROOM]: "Dark Room", // 16
  [StageID.CHEST]: "Chest", // 17
  [StageID.SHOP]: "The Shop", // 24
  [StageID.ULTRA_GREED]: "Ultra Greed", // 25
  [StageID.VOID]: "The Void", // 26
  [StageID.DOWNPOUR]: "Downpour", // 27
  [StageID.DROSS]: "Dross", // 28
  [StageID.MINES]: "Mines", // 29
  [StageID.ASHPIT]: "Ashpit", // 30
  [StageID.MAUSOLEUM]: "Mausoleum", // 31
  [StageID.GEHENNA]: "Gehenna", // 32
  [StageID.CORPSE]: "Corpse", // 33
  [StageID.MORTIS]: "Mortis", // 34
  [StageID.HOME]: "Home", // 35
  [StageID.BACKWARDS]: "The Ascent", // 36
} as const satisfies Record<StageID, string>;
