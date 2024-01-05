/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface LevelGeneratorEntry {
  SetAllowedDoors: (room: LevelGeneratorRoom, doors: int) => void;
  SetColIdx: (room: LevelGeneratorRoom, doors: int) => void;
  SetLineIdx: (room: LevelGeneratorRoom, doors: int) => void;
}
