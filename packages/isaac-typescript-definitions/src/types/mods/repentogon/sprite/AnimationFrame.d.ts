/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface AnimationFrame {
  GetColor: () => Color;
  GetCrop: () => Vector;
  GetHeight: () => number;
  GetPivot: () => Vector;
  GetPos: () => Vector;
  GetRotation: () => number;
  GetScale: () => Vector;
  GetWidth: () => number;
  IsInterpolated: () => boolean;
  IsVisible: () => boolean;
}
