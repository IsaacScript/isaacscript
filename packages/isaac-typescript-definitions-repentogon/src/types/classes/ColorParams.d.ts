declare function ColorParams(
  this: void,
  color: Color,
  priority: int,
  duration1: int,
  duration2: int,
  fadeout: boolean,
  shared: boolean,
): ColorParams;

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface ColorParams extends IsaacAPIClass {
  /** Returns the current color. */
  GetColor: () => Color;

  /** Returns the duration (in frames) over which the color change should last. */
  GetDuration: () => int;

  /** Returns whether the color fades out. */
  GetFadeout: () => boolean;

  /**
   * Returns the remaining frames before the color change is complete. This decreases by 1 for each
   * non-interpolation update, at 30 updates per second.
   */
  GetLifespan: () => int;

  /** Returns the display priority for the color change. */
  GetPriority: () => int;

  /** Returns whether the color parameters are shared with the entity's child. */
  GetShared: () => boolean;

  /** Sets the color. */
  SetColor: (color: Color) => void;

  /** Sets the duration (in frames) for the color change. */
  SetDuration: (duration: int) => void;

  /** Sets whether or not the color fades out. */
  SetFadeout: (isFading: boolean) => void;

  /** Sets the remaining frames before the color change is complete. */
  SetLifespan: (duration: int) => void;

  /** Sets the display priority of the color change. */
  SetPriority: (priority: int) => void;

  /** Sets whether the `ColorParams` is shared with the entity's child. */
  SetShared: (shared: boolean) => void;
}
