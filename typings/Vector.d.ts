declare function Vector(this: void, x: float, y: float): Vector;

declare class Vector {
  Clamp(minX: float, minY: float, maxX: float, maxY: float): void;
  Clamped(minX: float, minY: float, maxX: float, maxY: float): Vector;
  Cross(secondVector: Vector): float;
  Distance(secondVector: Vector): float;
  DistanceSquared(secondVector: Vector): float;
  Dot(secondVector: Vector): float;
  GetAngleDegrees(): float;
  Length(): float;
  LengthSquared(): float;
  Lerp(secondVector: Vector, t: float): Vector;
  Normalize(): void;
  Normalized(): Vector;
  Resize(newLength: float): void;
  Resized(newLength: float): Vector;
  Rotated(angleDegrees: float): Vector;
  __add(right: Vector): Vector;
  __div(modifier: float): Vector;
  __mul(modifier: float): Vector;
  __sub(right: Vector): Vector;
  __unm(right: Vector): Vector;

  X: float;
  Y: float;

  static FromAngle(this: void, angleDegrees: float): Vector;
  static One: Vector;
  static Zero: Vector;

  // Helper functions for adding and so forth so that you don't have to type the double underscore
  // https://typescripttolua.github.io/docs/advanced/language-extensions/#operator-map-types
  add: LuaAdditionMethod<Vector, Vector>;
  div: LuaDivisionMethod<Vector, Vector>;
  mul: LuaMultiplicationMethod<Vector, Vector>;
  sub: LuaSubtractionMethod<Vector, Vector>;
}
