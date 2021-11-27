declare function Vector(this: void, x: float, y: float): Vector;

declare interface Vector {
  Clamp(minX: float, minY: float, maxX: float, maxY: float): void;
  Clamped(minX: float, minY: float, maxX: float, maxY: float): Vector;
  Cross(secondVector: Vector): float;
  Distance(secondVector: Vector): float;
  DistanceSquared(secondVector: Vector): float;
  Dot(secondVector: Vector): float;

  /**
   * The game returns degrees in the following format:
   *
   * - Right: 0
   * - Up: -90
   * - Left: 180
   * - Down: 90
   */
  GetAngleDegrees(): float;

  Length(): float;
  LengthSquared(): float;
  Lerp(secondVector: Vector, t: float): Vector;
  Normalize(): void;
  Normalized(): Vector;
  Resize(newLength: float): void;
  Resized(newLength: float): Vector;
  Rotated(angleDegrees: float): Vector;

  /** Use the "add()" method instead. */
  __add(right: never): Vector;

  /** Use the "div()" method instead. */
  __div(modifier: never): Vector;

  /** Use the "mul()" method instead. */
  __mul(modifier: never): Vector;

  /** Use the "sub()" method instead. */
  __sub(right: never): Vector;

  // Not implemented since it can cause the game to crash
  // __unm(right: never): Vector;

  X: float;
  Y: float;

  // Helper functions for adding and so forth
  // https://typescripttolua.github.io/docs/advanced/language-extensions/#operator-map-types

  add: LuaAdditionMethod<Vector, Vector>;

  /**
   * Vector multiplication was extended to allow Vectors in Repentance. However, this functionality
   * does not apply to division.
   */
  div: LuaDivisionMethod<number, Vector>;

  mul: LuaMultiplicationMethod<number | Vector, Vector>;
  sub: LuaSubtractionMethod<Vector, Vector>;
}

declare namespace Vector {
  function FromAngle(this: void, angleDegrees: float): Vector;
  const One: Vector;
  const Zero: Vector;
}
