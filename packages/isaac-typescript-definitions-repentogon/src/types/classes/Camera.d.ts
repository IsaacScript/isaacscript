/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface Camera extends IsaacAPIClass {
  /** Returns whether the camera is clamped to the room's boundaries. */
  IsClampEnabled: () => boolean;

  /** Returns whether the specified position is visible within the camera's current view. */
  IsPosVisible: (position: Vector) => boolean;

  /** Sets whether the camera is clamped to the room's boundaries. */
  SetClampEnabled: (enabled: boolean) => void;

  /**
   * Sets the camera's current focus position, causing it to shift towards the specified position.
   * If you want the camera to change its position instantly, use `Camera.SnapToPosition` instead.
   *
   * By default, he camera will only move if the current room size is larger than 1x1. To allow the
   * camera to move regardless of the room's shape, you must call `Camera.SetClampEnabled(false)`.
   *
   * This method must be called on every game update, otherwise the game will override the camera's
   * focus position.
   */
  SetFocusPosition: (position: Vector) => void;

  /**
   * Changes the camera's position immediately. If you want the camera to smoothly change its
   * position, use `Camera.SetFocusPosition` instead.
   *
   * By default, he camera will only move if the current room size is larger than 1x1. To allow the
   * camera to move regardless of the room's shape, you must call `Camera.SetClampEnabled(false)`.
   *
   * This method must be called on every game update, otherwise the game will override the camera's
   * focus position.
   *
   * This method does not work if `Options.CameraStyle` is not equal to `CameraStyle.ON`.
   */
  SnapToPosition: (position: Vector) => void;

  /**
   * Updates the camera.
   *
   * @param interpolated Optional. Default is false.
   */
  Update: (interpolated?: boolean) => void;
}
