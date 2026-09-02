/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface DestinationQuad extends IsaacAPIClass {
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
 * Constructs a new DestinationQuad class.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare function DestinationQuad(
  this: void,
  topLeft: Vector,
  topRight: Vector,
  bottomLeft: Vector,
  bottomRight: Vector,
): DestinationQuad;
