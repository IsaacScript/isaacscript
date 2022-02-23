import { ensureAllCases } from "./util";

export function copyVector(vector: Vector): Vector {
  return Vector(vector.X, vector.Y);
}

export function directionToVector(direction: Direction): Vector {
  switch (direction) {
    case Direction.DOWN: {
      return Vector(0, 1);
    }

    case Direction.LEFT: {
      return Vector(-1, 0);
    }

    case Direction.RIGHT: {
      return Vector(1, 0);
    }

    case Direction.UP: {
      return Vector(0, -1);
    }

    case Direction.NO_DIRECTION: {
      return Vector.Zero;
    }

    default: {
      return ensureAllCases(direction);
    }
  }
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

export function isVector(object: unknown): boolean {
  const objectType = type(object);
  if (objectType !== "userdata") {
    return false;
  }

  const metatable = getmetatable(object);
  if (metatable === undefined) {
    return false;
  }

  const vectorMetatable = metatable as Record<string, string>;
  return vectorMetatable.__type === "Vector"; // eslint-disable-line no-underscore-dangle
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
