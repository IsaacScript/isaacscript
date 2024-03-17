/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface NullFrame extends IsaacAPIClass {
  /** Returns the frame's color. */
  GetColor: () => Color;

  /** Returns the frame's position. */
  GetPos: () => Vector;

  /** Returns the frame's rotation. */
  GetRotation: () => number;

  /** Returns the frame's scale. */
  GetScale: () => Vector;

  /* *Returns whether the frame is visible. */
  IsVisible: () => boolean;
}
