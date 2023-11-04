/**
 * Helper function to create a read-only `Color` object. (Otherwise, you would have to manually
 * specify both the type and the constructor.)
 *
 * Note that read-only colors will be writable at run-time.
 */
export function newReadonlyColor(
  r: float,
  g: float,
  b: float,
  a?: float,
  ro?: int,
  go?: int,
  bo?: int,
): Readonly<Color> {
  return Color(r, g, b, a, ro, go, bo);
}

/**
 * Helper function to create a read-only `KColor` object. (Otherwise, you would have to manually
 * specify both the type and the constructor.)
 *
 * Note that read-only colors will be writable at run-time.
 */
export function newReadonlyKColor(
  r: float,
  g: float,
  b: float,
  a: float,
): Readonly<KColor> {
  return KColor(r, g, b, a);
}

/**
 * Helper function to create a read-only `Vector` object. (Otherwise, you would have to manually
 * specify both the type and the constructor.)
 *
 * Note that read-only vectors will be writable at run-time.
 */
export function newReadonlyVector(x: float, y: float): Readonly<Vector> {
  return Vector(x, y);
}
