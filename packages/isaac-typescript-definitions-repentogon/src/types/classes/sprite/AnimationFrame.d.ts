/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface AnimationFrame extends IsaacAPIClass {
  /** Returns the frame's color. */
  readonly GetColor: () => Readonly<Color>;

  /** Returns the frame's crop. */
  readonly GetCrop: () => Readonly<Vector>;

  /** Returns the final frame of the animation. */
  readonly GetEndFrame: () => int;

  /** Returns the frame's height. */
  readonly GetHeight: () => number;

  /** Returns the frame's pivot. */
  readonly GetPivot: () => Readonly<Vector>;

  /** Returns the frame's position. */
  readonly GetPos: () => Readonly<Vector>;

  /** Returns the frame's rotation. */
  readonly GetRotation: () => number;

  /** Returns the frame's scale. */
  readonly GetScale: () => Readonly<Vector>;

  /** Returns the starting frame. */
  readonly GetStartFrame: () => number;

  /** Returns the frame's width. */
  readonly GetWidth: () => number;

  /** Returns whether the frame is interpolated. */
  readonly IsInterpolated: () => boolean;

  /** Returns whether the frame is visible. */
  readonly IsVisible: () => boolean;
}
