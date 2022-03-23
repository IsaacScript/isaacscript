import { DIRECTION_TO_VECTOR } from "../objects/directionToVector";
import { isUserdataObject } from "./utils";

export function copyVector(vector: Vector): Vector {
  return Vector(vector.X, vector.Y);
}

export function deserializeVector(vectorTable: LuaTable): Vector {
  const xString = vectorTable.get("X") as string;
  const x = tonumber(xString);
  if (x === undefined) {
    error("Failed to read the X value of a serialized vector.");
  }

  const yString = vectorTable.get("Y") as string;
  const y = tonumber(yString);
  if (y === undefined) {
    error("Failed to read the Y value of a serialized vector.");
  }

  return Vector(x, y);
}

export function directionToVector(direction: Direction): Vector {
  return DIRECTION_TO_VECTOR[direction];
}

/**
 * Helper function to get a new vector of length 1. Using this is safer than using the `Vector.One`
 * variable because the variable can be overwritten or modified.
 */
export function getOneVector(): Vector {
  return Vector(1, 1);
}

/**
 * Helper function to get a new vector of length 0. Using this is safer than using the `Vector.Zero`
 * variable because the variable can be overwritten or modified.
 */
export function getZeroVector(): Vector {
  return Vector(0, 0);
}

/** Helper function to check if something is an instantiated Vector object. */
export function isVector(object: unknown): boolean {
  return isUserdataObject(object, "Vector");
}

/** Helper function for finding out which way a vector is pointing. */
export function vectorToDirection(vector: Vector): Direction {
  const degrees = vector.GetAngleDegrees();

  if (degrees > -45 && degrees < 45) {
    return Direction.RIGHT;
  }

  if (degrees >= 45 && degrees <= 135) {
    return Direction.DOWN;
  }

  if (degrees <= -45 && degrees >= -135) {
    return Direction.UP;
  }

  if (degrees > 135 || degrees < -135) {
    return Direction.LEFT;
  }

  return Direction.NO_DIRECTION;
}
