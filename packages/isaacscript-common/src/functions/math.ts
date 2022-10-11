import { Direction } from "isaac-typescript-definitions";
import { directionToVector } from "./direction";

/**
 * Helper function to normalize an integer.
 *
 * - If `x` is less than `min`, then it will be clamped to `min`.
 * - If `x` is greater than `max`, then it will be clamped to `max`.
 */
export function clamp(x: int, min: int, max: int): int {
  return Math.max(min, Math.min(x, max));
}

export function getAngleDifference(angle1: float, angle2: float): float {
  const subtractedAngle = angle1 - angle2;
  return ((subtractedAngle + 180) % 360) - 180;
}

/**
 * Helper function to get an array of equidistant points on the circumference around a circle.
 * Useful for equally distributing things in a circle pattern.
 *
 * @param centerPos A position that represents the center of the center to get the points from.
 * @param radius The radius of the circle.
 * @param numPoints The number of points on the circumference of the circle to get.
 * @param xMultiplier An optional multiplier to get the points around an oval. Default is 1.
 * @param yMultiplier An optional multiplier to get the points around an oval. Default is 1.
 * @param initialDirection By default, the first point on the circle will be on the top center, but
 *                         this can be optionally changed by specifying this argument.
 */
export function getCircleDiscretizedPoints(
  centerPos: Vector,
  radius: float,
  numPoints: int,
  xMultiplier = 1,
  yMultiplier = 1,
  initialDirection = Direction.UP,
): Vector[] {
  const vector = directionToVector(initialDirection);
  const initialPosition = vector.mul(radius);
  const positions: Vector[] = [];
  for (let i = 0; i < numPoints; i++) {
    const rotatedPosition = initialPosition.Rotated((i * 360) / numPoints);
    rotatedPosition.X *= xMultiplier;
    rotatedPosition.Y *= yMultiplier;
    const positionFromCenter = centerPos.add(rotatedPosition);
    positions.push(positionFromCenter);
  }

  return positions;
}

/**
 * Helper function to check if a given position is within a given rectangle.
 *
 * This is an inclusive check, meaning that it will return true if the position is on the border of
 * the rectangle.
 */
export function inRectangle(
  position: Vector,
  topLeft: Vector,
  bottomRight: Vector,
): boolean {
  return (
    position.X >= topLeft.X &&
    position.X <= bottomRight.X &&
    position.Y >= topLeft.Y &&
    position.Y <= bottomRight.Y
  );
}

/**
 * From: https://www.geeksforgeeks.org/check-if-any-point-overlaps-the-given-circle-and-rectangle/
 */
export function isCircleIntersectingRectangle(
  circleCenter: Vector,
  circleRadius: float,
  rectangleTopLeft: Vector,
  rectangleBottomRight: Vector,
): boolean {
  const nearestX = Math.max(
    rectangleTopLeft.X,
    Math.min(circleCenter.X, rectangleBottomRight.X),
  );

  const nearestY = Math.max(
    rectangleTopLeft.Y,
    Math.min(circleCenter.Y, rectangleBottomRight.Y),
  );

  const nearestPointToCircleOnRectangle = Vector(nearestX, nearestY);
  const distanceToCenterOfCircle =
    nearestPointToCircleOnRectangle.Distance(circleCenter);

  return distanceToCenterOfCircle <= circleRadius;
}

export function isEven(num: int): boolean {
  // This is benchmarked to be faster than using the modulus operator by 3%.
  return (num & 1) === 0;
}

export function isOdd(num: int): boolean {
  // This is benchmarked to be faster than using the modulus operator by 3%.
  return (num & 1) === 1;
}

export function lerp(a: number, b: number, pos: float): number {
  return a + (b - a) * pos;
}

export function lerpAngleDegrees(
  aStart: number,
  aEnd: number,
  percent: float,
): number {
  return aStart + getAngleDifference(aStart, aEnd) * percent;
}

/**
 * If rounding fails, this function returns 0.
 * From: http://lua-users.org/wiki/SimpleRound
 *
 * @param num The number to round.
 * @param numDecimalPlaces Optional. Default is 0.
 */
export function round(num: float, numDecimalPlaces = 0): float {
  const roundedNum = tonumber(string.format(`%.${numDecimalPlaces}f`, num));
  return roundedNum === undefined ? 0 : roundedNum;
}

/**
 * @returns 1 if n is positive, -1 if n is negative, or 0 if n is 0.
 */
export function sign(n: number): int {
  if (n > 0) {
    return 1;
  }

  if (n < 0) {
    return -1;
  }

  return 0;
}

export function tanh(x: number): number {
  return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
}
