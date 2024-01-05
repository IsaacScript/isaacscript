/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface AnimationLayer {
  GetFrame: (frame: int) => AnimationFrame;
  GetLayerID: () => int;
  IsVisible: () => boolean;
}
