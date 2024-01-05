/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface NullState {
  GetColor: () => Color;
  GetPos: () => Vector;
  GetRotation: () => number;
  GetScale: () => Vector;
  IsVisible: () => boolean;
}
