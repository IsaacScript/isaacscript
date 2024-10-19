/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface AnimationFrame extends IsaacAPIClass {
  /** Returns the frame's color. */
  GetColor: () => Readonly<Color>;

  /** Returns the frame's crop. */
  GetCrop: () => Readonly<Vector>;

  /** Returns the frame's height. */
  GetHeight: () => number;

  /** Returns the frame's pivot. */
  GetPivot: () => Readonly<Vector>;

  /** Returns the frame's position. */
  GetPos: () => Readonly<Vector>;

  /** Returns the frame's rotation. */
  GetRotation: () => number;

  /** Returns the frame's scale. */
  GetScale: () => Readonly<Vector>;

  /** Returns the starting frame. */
  GetStartFrame: () => number;

  /** Returns the frame's width. */
  GetWidth: () => number;

  /** Returns whether the frame is interpolated. */
  IsInterpolated: () => boolean;

  /** Returns whether the frame is visible. */
  IsVisible: () => boolean;
}
