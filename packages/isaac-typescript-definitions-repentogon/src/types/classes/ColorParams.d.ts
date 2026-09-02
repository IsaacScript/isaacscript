/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface ColorParams extends IsaacAPIClass {
  /** Returns the current color. */
  readonly GetColor: () => Color;

  /** Returns the duration (in frames) over which the color change should last. */
  readonly GetDuration: () => int;

  /** Returns whether the color fades out. */
  readonly GetFadeout: () => boolean;

  /**
   * Returns the remaining frames before the color change is complete. This decreases by 1 for each
   * non-interpolation update, at 30 updates per second.
   */
  readonly GetLifespan: () => int;

  /** Returns the display priority for the color change. */
  readonly GetPriority: () => int;

  /** Returns whether the color parameters are shared with the entity's child. */
  readonly GetShared: () => boolean;

  /** Sets the color. */
  readonly SetColor: (color: Color) => void;

  /** Sets the duration (in frames) for the color change. */
  readonly SetDuration: (duration: int) => void;

  /** Sets whether or not the color fades out. */
  readonly SetFadeout: (isFading: boolean) => void;

  /** Sets the remaining frames before the color change is complete. */
  readonly SetLifespan: (duration: int) => void;

  /** Sets the display priority of the color change. */
  readonly SetPriority: (priority: int) => void;

  /** Sets whether the `ColorParams` is shared with the entity's child. */
  readonly SetShared: (shared: boolean) => void;
}

declare function ColorParams(
  this: void,
  color: Color,
  priority: int,
  duration: int,
  fadeout: boolean,
  shared: boolean,
): ColorParams;
