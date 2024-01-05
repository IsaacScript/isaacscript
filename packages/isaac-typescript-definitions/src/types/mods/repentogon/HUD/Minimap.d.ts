/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace Minimap {
  /**
   * Returns the current display size of the minimap. When not expanded this is always
   * `Vector(47,47)`.
   */
  function GetDisplayedSize(): Vector;
}
