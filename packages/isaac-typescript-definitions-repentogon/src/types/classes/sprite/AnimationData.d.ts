/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface AnimationData extends IsaacAPIClass {
  /**
   * Returns an array of all of the animation layers. The array is ordered from bottom to top, not
   * by layer ID.
   */
  readonly GetAllLayers: () => AnimationLayer[];

  /** Returns an `AnimationLayer` from the specified ID. Returns undefined if the ID is invalid. */
  readonly GetLayer: (layerID: int) => AnimationLayer | undefined;

  /** Returns the number of frames in the animation. */
  readonly GetLength: () => int;

  /** Returns the name of the animation. */
  readonly GetName: () => string;

  /** Returns whether the animation is set to loop. */
  readonly IsLoopingAnimation: () => boolean;
}
