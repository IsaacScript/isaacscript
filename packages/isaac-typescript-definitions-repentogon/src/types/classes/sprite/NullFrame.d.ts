/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface NullFrame extends IsaacAPIClass {
  /** Returns the frame's color. */
  readonly GetColor: () => Color;

  /** Returns the frame's position. */
  readonly GetPos: () => Vector;

  /** Returns the frame's rotation. */
  readonly GetRotation: () => number;

  /** Returns the frame's scale. */
  readonly GetScale: () => Vector;

  /** Returns whether the frame is visible. */
  readonly IsVisible: () => boolean;
}
