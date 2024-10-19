/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface RoomConfigSet extends IsaacAPIClass {
  /**
   * Returns a `RoomConfig` at the provided index. Returns undefined if no `RoomConfig` was found.
   */
  Get: (index: int) => RoomConfig | undefined;

  /** The number of rooms in the list. */
  readonly Size: int;

  len: LuaLengthMethod<int>;
}
