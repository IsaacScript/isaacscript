/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface AnimationLayer {
  /**
   * Returns the `AnimationFrame` from the specified frame number. Returns undefined if none were
   * found.
   */
  GetFrame: (frame: int) => AnimationFrame | undefined;

  /** Returns the ID of the layer. */
  GetLayerID: () => int;

  /** Returns whether the layer is visible. */
  IsVisible: () => boolean;
}
