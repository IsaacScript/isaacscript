/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface RenderPoint extends IsaacAPIClass {
  GetColor: () => Color;
  GetHeight: () => number;
  GetWidth: () => number;
  GetPosition: () => Vector;
  SetColor: (color: Color) => void;
  SetHeight: (height: number) => void;
  SetWidth: (width: number) => void;
  SetPosition: (position: Vector) => void;
}

/**
 * Constructs a new DestinationQuad class.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 *
 * @param this
 * @param height
 * @param width Default is 1.
 * @param color Default is `ColorDefault`.
 */
export function Point(
  this: void,
  height: number,
  width?: number,
  color?: number,
): RenderPoint;
