import { game } from "../cachedClasses";

/**
 * Helper function to convert a room X and Y coordinate to a position.
 *
 * For example, the coordinates of 0, 0 are equal to `Vector(80, 160)`.
 *
 * This function will crash the game if it is called in the menu, because it needs to access the
 * current room's grid width.
 */
export function gridToPos(x: int, y: int): Vector {
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();

  x += 1;
  y += 1;

  const gridIndex = y * gridWidth + x;

  return room.GetGridPosition(gridIndex);
}

/** Helper function to convert a grid position `Vector` to a world position `Vector`. */
export function gridToWorldPos(gridPos: Vector): Vector {
  const x = (gridPos.X + 2) * 40;
  const y = (gridPos.Y + 4) * 40;
  return Vector(x, y);
}

/** Helper function to convert a world position `Vector` to a grid position `Vector`. */
export function worldToGridPos(worldPos: Vector): Vector {
  const x = Math.round(worldPos.X / 40 - 2);
  const y = Math.round(worldPos.Y / 40 - 4);
  return Vector(x, y);
}

/**
 * Helper function to convert a world position `Vector` to a grid position `Vector`.
 *
 * This is similar to the `worldToGridPos` position, but the values are not rounded.
 */
export function worldToGridPosFast(worldPos: Vector): Vector {
  const x = worldPos.X / 40 - 2;
  const y = worldPos.Y / 40 - 4;
  return Vector(x, y);
}
