/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface SourceQuad extends IsaacAPIClass {
  readonly GetBottomLeft: () => Vector;
  readonly GetBottomRight: () => Vector;
  readonly GetTopLeft: () => Vector;
  readonly GetTopRight: () => Vector;
  readonly SetBottomLeft: (point: Vector) => void;
  readonly SetBottomRight: (point: Vector) => void;
  readonly SetTopLeft: (point: Vector) => void;
  readonly SetTopRight: (point: Vector) => void;
}

/**
 * Constructs a new `SourceQuad` class.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare function SourceQuad(
  this: void,
  topLeft: Vector,
  topRight: Vector,
  bottomLeft: Vector,
  bottomRight: Vector,
): SourceQuad;
