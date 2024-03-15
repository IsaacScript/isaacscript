import type { DoorSlotFlag, RoomShape } from "isaac-typescript-definitions";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface LevelGeneratorRoom {
  /** Returns the column position of the room within the level grid (zero-based index). */
  Column: () => int;

  /** Returns a bitmask representing the available doors within the room. */
  DoorMask: () => BitFlags<DoorSlotFlag>;

  /**
   * Returns the order in which the room was generated (zero-based index). For example, a value of 2
   * means it was the third room generated.
   */
  GenerationIndex: () => int;

  /**
   * Returns whether the room is a dead-end within the level layout. A dead-end has only one
   * entrance/exit.
   */
  IsDeadEnd: () => boolean;

  /** Returns an array containing the generation indices of rooms connected to this room. */
  Neighbors: () => int[];

  /** Returns the row position of the room within the level grid (zero-based index). */
  Row: () => int;

  /** Returns the shape of the room. */
  Shape: () => RoomShape;
}
