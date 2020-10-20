/** @noSelf */
declare function Vector(x: float, y: float): Vector;

declare class Vector {
  Normalize(): void;
  Normalized(): Vector;
  Dot(secondVector: Vector): float;
  Cross(secondVector: Vector): float;
  Lerp(secondVector: Vector, t: float): Vector;
  Distance(secondVector: Vector): float;
  DistanceSquared(secondVector: Vector): float;
  Rotated(angleDegrees: float): Vector;
  GetAngleDegrees(): float;
  Resize(newLength: float): void;
  Resized(newLength: float): Vector;
  Clamp(minX: float, minY: float, maxX: float, maxY: float): void;
  Clamped(minX: float, minY: float, maxX: float, maxY: float): Vector;
  Length(): float;
  LengthSquared(): float;
  __add(right: Vector): Vector;
  __sub(right: Vector): Vector;
  __mul(modifier: float): Vector;
  __div(modifier: float): Vector;
  __unm(right: Vector): Vector;

  /** @noSelf */
  static FromAngle(angleDegrees: float): Vector;

  X: float;
  Y: float;
}
