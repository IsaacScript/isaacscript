import type { DoorSlotFlag } from "isaac-typescript-definitions";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare global {
  interface LevelGeneratorEntry {
    SetAllowedDoors: (
      room: LevelGeneratorRoom,
      doors: BitFlags<DoorSlotFlag>,
    ) => void;

    SetColIdx: (room: LevelGeneratorRoom, columnIndex: int) => void;

    SetLineIdx: (room: LevelGeneratorRoom, columnIndex: int) => void;
  }
}
