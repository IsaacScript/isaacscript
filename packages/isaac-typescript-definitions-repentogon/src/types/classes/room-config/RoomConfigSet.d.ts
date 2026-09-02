/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface RoomConfigSet extends IsaacAPIClass {
  /**
   * Adds REPENTOGON LuaRooms to the `RoomConfigSet`. Returns a `RoomConfig` array of the newly
   * created rooms.
   */
  readonly AddRooms: (rooms: readonly LuaRoomREPENTOGON[]) => RoomConfig[];

  /**
   * Returns a `RoomConfig` at the provided index. Returns undefined if no `RoomConfig` was found.
   */
  readonly Get: (index: int) => RoomConfig | undefined;

  /** The number of rooms in the list. */
  readonly Size: int;

  readonly len: LuaLengthMethod<int>;
}
