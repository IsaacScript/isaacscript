import type { DoorSlotFlag } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface LevelGeneratorEntry extends IsaacAPIClass {
    SetAllowedDoors: (doors: DoorSlotFlag | BitFlags<DoorSlotFlag>) => void;

    SetColIdx: (columnIndex: int) => void;
    SetLineIdx: (lineIndex: int) => void;
  }
}
