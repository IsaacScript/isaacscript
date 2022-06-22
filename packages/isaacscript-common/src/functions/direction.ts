import { Direction } from "isaac-typescript-definitions";
import { DIRECTION_NAMES } from "../objects/directionNames";
import { DIRECTION_TO_DEGREES } from "../objects/directionToDegrees";
import { DIRECTION_TO_VECTOR } from "../objects/directionToVector";

export function angleToDirection(angleDegrees: int): Direction {
  const normalizedAngleDegrees = angleDegrees % 360;
  const absoluteAngleDegrees = Math.abs(normalizedAngleDegrees);

  if (absoluteAngleDegrees < 45) {
    return Direction.RIGHT;
  }

  if (absoluteAngleDegrees > 135) {
    return Direction.LEFT;
  }

  if (normalizedAngleDegrees > 0) {
    return Direction.DOWN;
  }

  return Direction.UP;
}

export function directionToDegrees(direction: Direction): int {
  return DIRECTION_TO_DEGREES[direction];
}

export function directionToVector(direction: Direction): Vector {
  return DIRECTION_TO_VECTOR[direction];
}

export function getDirectionName(direction: Direction): string | undefined {
  return DIRECTION_NAMES[direction];
}
