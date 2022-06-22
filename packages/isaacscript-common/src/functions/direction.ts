import { Direction } from "isaac-typescript-definitions";
import { DIRECTION_NAMES } from "../objects/directionNames";
import { DIRECTION_TO_DEGREES } from "../objects/directionToDegrees";
import { DIRECTION_TO_VECTOR } from "../objects/directionToVector";

export function angleToDirection(angleDegrees: int): Direction {
  let positiveDegrees = angleDegrees;
  while (positiveDegrees < 0) {
    positiveDegrees += 360;
  }
  const normalizedDegrees = positiveDegrees % 360;

  if (normalizedDegrees < 45) {
    return Direction.UP;
  }

  if (normalizedDegrees < 135) {
    return Direction.RIGHT;
  }

  if (normalizedDegrees < 225) {
    return Direction.DOWN;
  }

  if (normalizedDegrees < 315) {
    return Direction.RIGHT;
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
