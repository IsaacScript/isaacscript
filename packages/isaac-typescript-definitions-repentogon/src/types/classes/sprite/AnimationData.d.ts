/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface AnimationData extends IsaacAPIClass {
  /**
   * Returns an array of all of the animation layers. The array is ordered from bottom to top, not
   * by layer ID.
   */
  GetAllLayers: () => AnimationLayer[];

  /** Returns an `AnimationLayer` from the specified ID. Returns undefined if the ID is invalid. */
  GetLayer: (layerID: int) => AnimationLayer | undefined;

  /** Returns the number of frames in the animation. */
  GetLength: () => int;

  /** Returns the name of the animation. */
  GetName: () => string;

  /** Returns whether the animation is set to loop. */
  IsLoopingAnimation: () => boolean;
}
