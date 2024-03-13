/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface Camera extends IsaacAPIClass {
  /**
   * Sets the camera's current focus position, causing it to shift towards the specified position.
   * If you want the camera to change its position instantly, use `Camera.SnapToPosition` instead.
   *
   * The camera will only move if the current room size is larger than 1x1. If the room size is 1x1
   * or smaller, this method will do nothing.
   *
   * This method must be called on every game update, otherwise the game will override the camera's
   * focus position.
   */
  SetFocusPosition: (position: Vector) => void;

  /**
   * Changes the camera's position immediately. If you want the camera to smoothly change its
   * position, use `Camera.SetFocusPosition` instead.
   *
   * The camera will only move if the current room size is larger than 1x1. If the room size is 1x1
   * or smaller, this method will do nothing.
   *
   * This method must be called on every game update, otherwise the game will override the camera's
   * focus position.
   *
   * This method does not work if `Options.CameraStyle` is not equal to `CameraStyle.ON`.
   */
  SnapToPosition: (position: Vector) => void;
}
