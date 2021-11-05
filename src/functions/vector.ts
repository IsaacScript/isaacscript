import { ensureAllCases } from "./util";

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
      ensureAllCases(direction);
      return Vector.Zero;
    }
  }
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
