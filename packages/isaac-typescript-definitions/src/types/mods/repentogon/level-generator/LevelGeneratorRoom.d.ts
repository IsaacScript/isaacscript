import type { RoomShape } from "../../../../enums/RoomShape";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface LevelGeneratorRoom extends IsaacAPIClass {
    /** Returns the column of the room slot on the level grid. The index is 0 based. */
    Column: () => int;

    /**
     * Returns a mask of the available doors of the room slot. In order to check if a door at a
     * given slot is available, use the `DoorSlot` enum.
     */
    DoorMask: () => int;

    /**
     * Returns the index of the room during generation. The index is zero based. For example, if the
     * room was the first to generate, 0 is returned. If the room was the second one to generate, 2
     * is returned, and so on.
     */
    GenerationIndex: () => int;

    /** Returns the row of the room slot on the level grid. The index is 0 based. */
    Row: () => int;

    Shape: () => RoomShape;
  }
}
