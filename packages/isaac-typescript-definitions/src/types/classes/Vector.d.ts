declare function Vector(this: void, x: float, y: float): Vector;

declare interface Vector extends IsaacAPIClass {
  Clamp(minX: float, minY: float, maxX: float, maxY: float): void;
  Clamped(minX: float, minY: float, maxX: float, maxY: float): Vector;
  Cross(secondVector: Vector): float;
  Distance(secondVector: Vector): float;
  DistanceSquared(secondVector: Vector): float;
  Dot(secondVector: Vector): float;

  /**
   * This method returns a value from -180 to 180.
   *
   * Note that this function considers 0 degrees to be pointing to the right, which is unusual
   * because 0 normally corresponds to up.
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

  /** An identifier that does not exist at run-time. */
  // eslint-disable-next-line isaacscript/member-ordering
  __kind: "Vector";
}

/** @noSelf */
declare namespace Vector {
  function FromAngle(angleDegrees: float): Vector;

  // The "One" and "Zero" constants are deliberately not implemented, since they are unsafe. See
  // `VectorOne` and `VectorZero` constants.
}
