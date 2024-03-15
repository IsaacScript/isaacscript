import type { RoomShape } from "isaac-typescript-definitions";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare global {
  interface LevelGenerator {
    /** Returns an array containing all the rooms that have been generated for the level. */
    GetAllRooms: () => LevelGeneratorRoom[];

    /**
     * Returns an array containing all the rooms that are considered dead-ends within the layout
     * (rooms with a single entrance/exit).
     */
    GetDeadEnds: () => LevelGeneratorRoom[];

    /**
     * Returns an array containing all the rooms that are not dead-ends (rooms with multiple
     * entrances/exits).
     */
    GetNonDeadEnds: () => LevelGeneratorRoom[];

    /**
     * Places a `LevelGeneratorRoom` onto the grid. Returns the generation index of the placed room.
     * If placement was not possible, returns undefined.
     *
     * @param column The column index of the room. The value must be between 0 and 12 (inclusive).
     * @param row The row index of the room. The value must be between 0 and 12 (inclusive).
     * @param shape The shape of the room.
     * @param origin This is used as the index of the connecting room. For example, if you want to
     *               place a room on top of the starting room, then `origin` can be the starting
     *               room of the floor. The origin parameter is used to ensure consistency with the
     *               existing rooms. During the generation phase, the game always picks a room and
     *               starts placing rooms around it. This parameter reflects this behavior.
     */
    PlaceRoom: (
      column: int,
      row: int,
      shape: RoomShape,
      origin: LevelGeneratorRoom,
    ) => int | undefined;
  }
}
