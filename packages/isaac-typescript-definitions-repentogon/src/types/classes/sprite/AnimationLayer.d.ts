/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface AnimationLayer extends IsaacAPIClass {
  /**
   * Returns the `AnimationFrame` from the specified frame number. Returns undefined if none were
   * found.
   */
  readonly GetFrame: (frame: int) => AnimationFrame | undefined;

  /** Returns the ID of the layer. */
  readonly GetLayerID: () => int;

  /** Returns whether the layer is visible. */
  readonly IsVisible: () => boolean;
}
