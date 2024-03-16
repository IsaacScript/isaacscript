/**
 * Constructs a new `SourceQuad` class.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare function SourceQuad(
  this: void,
  topLeft: Vector,
  topRight: Vector,
  bottomLeft: Vector,
  bottomRight: Vector,
): SourceQuad;

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface SourceQuad extends IsaacAPIClass {
  GetBottomLeft: () => Vector;
  GetBottomRight: () => Vector;
  GetTopLeft: () => Vector;
  GetTopRight: () => Vector;
  SetBottomLeft: (point: Vector) => void;
  SetBottomRight: (point: Vector) => void;
  SetTopLeft: (point: Vector) => void;
  SetTopRight: (point: Vector) => void;
}
