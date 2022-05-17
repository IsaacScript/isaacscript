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

  X: float;
  Y: float;

  // The underscore methods like "__add" are not implemented in favor of having `add` and so on.
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

  /**
   * @deprecated This can be mutated by other mods, so it is never safe to use. Use the `VectorOne`
   * constant from the standard library instead. Alternatively, you can create your own constant
   * that is local to your own mod.
   */
  const One: never;

  /**
   * @deprecated This can be mutated by other mods, so it is never safe to use. Use the `VectorZero`
   * constant from the standard library instead. Alternatively, you can create your own constant
   * that is local to your own mod.
   */
  const Zero: never;
}
