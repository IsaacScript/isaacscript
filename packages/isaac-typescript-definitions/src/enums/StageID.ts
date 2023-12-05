/**
 * Corresponds to the filename used in the XML/STB file for the room. It also matches the "id"
 * attribute in the "stages.xml" file.
 *
 * This enum is not contiguous. In other words, the enum ranges from `StageID.SPECIAL_ROOMS` (0) to
 * `StageID.BACKWARDS` (36), but there is no corresponding `StageID` with the following values:
 *
 * - 18 (corresponds to Afterbirth+ "18.greed special.stb")
 * - 19 (corresponds to Afterbirth+ "19.greed basement.stb")
 * - 20 (corresponds to Afterbirth+ "20.greed caves.stb")
 * - 21 (corresponds to Afterbirth+ "21.greed depths.stb")
 * - 22 (corresponds to Afterbirth+ "22.greed womb.stb")
 * - 23 (corresponds to Afterbirth+ "23.greed sheol.stb")
 *
 * (These values are now unused in Repentance.)
 */
export enum StageID {
  SPECIAL_ROOMS = 0,
  BASEMENT = 1,
  CELLAR = 2,
  BURNING_BASEMENT = 3,
  CAVES = 4,
  CATACOMBS = 5,
  FLOODED_CAVES = 6,
  DEPTHS = 7,
  NECROPOLIS = 8,
  DANK_DEPTHS = 9,
  WOMB = 10,
  UTERO = 11,
  SCARRED_WOMB = 12,
  BLUE_WOMB = 13,
  SHEOL = 14,
  CATHEDRAL = 15,
  DARK_ROOM = 16,
  CHEST = 17,

  // The values from 18 to 23 are commented out in the "stages.xml" file.

  // - SPECIAL_ROOMS_GREED_MODE = 18,
  // - BASEMENT_GREED_MODE = 19,
  // - CAVES_GREED_MODE = 20,
  // - DEPTHS_GREED_MODE = 21,
  // - WOMB_GREED_MODE = 22,
  // - SHEOL_GREED_MODE = 23,

  SHOP = 24,
  ULTRA_GREED = 25,
  VOID = 26,
  DOWNPOUR = 27,
  DROSS = 28,
  MINES = 29,
  ASHPIT = 30,
  MAUSOLEUM = 31,
  GEHENNA = 32,
  CORPSE = 33,
  MORTIS = 34,
  HOME = 35,
  BACKWARDS = 36,
}
