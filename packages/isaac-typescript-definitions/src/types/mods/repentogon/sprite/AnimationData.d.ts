/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface AnimationData {
  /**
   * Returns an array of AnimationLayers, in order from bottom to top . This is not ordered by layer
   * ID.
   */
  GetAllLayers: () => AnimationLayer[];
  GetLayer: (layerID: int) => AnimationLayer | undefined;
  GetLength: () => int;
  GetName: () => string;
  IsLoopingAnimation: () => boolean;
}
