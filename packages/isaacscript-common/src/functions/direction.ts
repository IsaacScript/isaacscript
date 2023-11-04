import type { ButtonAction } from "isaac-typescript-definitions";
import { Direction } from "isaac-typescript-definitions";
import { DIRECTION_NAMES } from "../objects/directionNames";
import { DIRECTION_TO_DEGREES } from "../objects/directionToDegrees";
import { DIRECTION_TO_MOVE_ACTION } from "../objects/directionToMoveAction";
import { DIRECTION_TO_SHOOT_ACTION } from "../objects/directionToShootAction";
import { DIRECTION_TO_VECTOR } from "../objects/directionToVector";

/**
 * Helper function to convert the degrees of an angle to the `Direction` enum.
 *
 * Note that this function considers 0 degrees to be pointing to the right, which is unusual because
 * 0 normally corresponds to up. (This corresponds to how the `Vector.GetAngleDegrees` method
 * works.)
 */
export function angleToDirection(angleDegrees: int): Direction {
  let positiveDegrees = angleDegrees;
  while (positiveDegrees < 0) {
    positiveDegrees += 360;
  }
  const normalizedDegrees = positiveDegrees % 360;

  if (normalizedDegrees < 45) {
    return Direction.RIGHT;
  }

  if (normalizedDegrees < 135) {
    return Direction.DOWN;
  }

  if (normalizedDegrees < 225) {
    return Direction.LEFT;
  }

  if (normalizedDegrees < 315) {
    return Direction.UP;
  }

  return Direction.RIGHT;
}

/**
 * Helper function to convert a direction to degrees. For example, `Direction.LEFT` (0) would return
 * 180 and `Direction.RIGHT` (2) would return 0. (This corresponds to how the
 * `Vector.GetAngleDegrees` method works.)
 */
export function directionToDegrees(direction: Direction): int {
  return DIRECTION_TO_DEGREES[direction];
}

/**
 * Helper function to convert a direction to a shoot `ButtonAction`. For example, `Direction.LEFT`
 * (0) would return `ButtonAction.LEFT` (0).
 */
export function directionToMoveAction(
  direction: Direction,
): ButtonAction | undefined {
  return DIRECTION_TO_MOVE_ACTION[direction];
}

/**
 * Helper function to convert a direction to a shoot `ButtonAction`. For example, `Direction.LEFT`
 * (0) would return `ButtonAction.SHOOT_LEFT` (4).
 */
export function directionToShootAction(
  direction: Direction,
): ButtonAction | undefined {
  return DIRECTION_TO_SHOOT_ACTION[direction];
}

/**
 * Helper function to convert a direction to a `Vector`. For example, `Direction.LEFT` (0) would
 * convert to `Vector(-1, 0).
 */
export function directionToVector(direction: Direction): Readonly<Vector> {
  return DIRECTION_TO_VECTOR[direction];
}

/**
 * Helper function to get the lowercase name of a direction. For example, `Direction.LEFT` (0) would
 * return "left".
 */
export function getDirectionName(direction: Direction): string | undefined {
  return DIRECTION_NAMES[direction];
}
