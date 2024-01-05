import type { RoomShape } from "../../../../enums/RoomShape";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface LevelGenerator extends IsaacAPIClass {
    GetAllRooms: () => LevelGeneratorRoom[];
    GetDeadEnds: () => LevelGeneratorRoom[];
    GetNonDeadEnds: () => LevelGeneratorRoom[];

    /**
     * Place a LevelGeneratorRoom object onto the level-grid. The Origin parameter is used as the
     * index of the connecting room. For instance, if you want to place a room on top of the
     * starting room, then Origin can be the starting room of the floor.
     *
     * @param column The column of the room. It must be between 0 and 12 (inclusive).
     * @param row The row of the room. It must be between 0 and 12 (inclusive).
     * @param shape The shape of the room.
     * @param origin
     * @returns The GenerationIndex of the placed room. Undefined if placement is not possible.
     */
    PlaceRoom: (
      column: int,
      row: int,
      shape: RoomShape,
      origin: LevelGeneratorRoom,
    ) => int | undefined;
  }
}
