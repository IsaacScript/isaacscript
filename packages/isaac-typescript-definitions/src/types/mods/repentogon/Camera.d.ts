/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface Camera extends IsaacAPIClass {
  /**
   * Sets the camera's current focus position, causing it to shift towards the specified position.
   *
   * The camera will only move if the current room size is larger than 1x1. If the room size is 1x1
   * or smaller, the camera will remain stationary and this function will do nothing.
   *
   * This function must be called on every game update, otherwise the game will override the
   * camera's position.
   *
   *  @param position
   */
  SetFocusPosition: (position: Vector) => void;

  /**
   * Sets the camera's position instantly to the specified position.
   *
   * The camera will only move if the current room size is larger than 1x1. If the room size is 1x1
   * or smaller, the camera will remain stationary and this function will do nothing.
   *
   * This function must be called on every game update, otherwise the game will override the
   * camera's position. Furthermore, the function will not work if the active cam setting is on.
   *
   * @param position
   */
  SnapToPosition: (position: Vector) => void;
}
