/**
 * Corresponds to the filename used in the XML/STB file for the room.
 *
 * This enum is not contiguous. In other words, the enum ranges from `StageID.SPECIAL_ROOMS` (0) to
 * `StageID.BACKWARDS` (36), but there are no values corresponding to 18 through 25.
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
