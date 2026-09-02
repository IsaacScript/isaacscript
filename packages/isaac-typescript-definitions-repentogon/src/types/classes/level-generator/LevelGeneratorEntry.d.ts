import type { DoorSlotFlag } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface LevelGeneratorEntry extends IsaacAPIClass {
    readonly SetAllowedDoors: (doors: DoorSlotFlag | BitFlags<DoorSlotFlag>) => void;

    readonly SetColIdx: (columnIndex: int) => void;
    readonly SetLineIdx: (lineIndex: int) => void;
  }
}
