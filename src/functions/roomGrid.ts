import { L_ROOM_SHAPE_TO_RECTANGLES } from "../objects/LRoomShapeToRectangles";
import { inRectangle } from "./math";
import {
  getRoomShapeTopLeftPosition,
  getRoomShapeWidth,
  isLRoom,
} from "./roomShape";

/**
 * Helper function to convert grid coordinates to a world position `Vector`.
 *
 * For example, the coordinates of (0, 0) are equal to `Vector(80, 160)`.
 */
export function gridCoordinatesToWorldPosition(x: int, y: int): Vector {
  const gridPosition = Vector(x, y);
  return gridPositionToWorldPosition(gridPosition);
}

/**
 * Helper function to convert a grid index to a grid position.
 *
 * For example, in a 1x1 room, grid index 0 is equal to "Vector(-1, -1) and grid index 16 is equal
 * to "Vector(0, 0)".
 */
export function gridIndexToGridPosition(
  gridIndex: int,
  roomShape: RoomShape,
): Vector {
  const gridWidth = getRoomShapeWidth(roomShape);

  const x = (gridIndex % gridWidth) - 1;
  const y = Math.floor(gridIndex / gridWidth) - 1;
  return Vector(x, y);
}

/**
 * Helper function to convert a grid position `Vector` to a world position `Vector`.
 *
 * For example, the coordinates of (0, 0) are equal to `Vector(80, 160)`.
 */
export function gridPositionToWorldPosition(gridPosition: Vector): Vector {
  const x = (gridPosition.X + 2) * 40;
  const y = (gridPosition.Y + 4) * 40;
  return Vector(x, y);
}

/**
 * Test if a grid position is actually in the given `RoomShape`
 *
 * In this context, the grid position of the top-left wall is "Vector(-1, -1)".
 */
export function isValidGridPosition(
  gridPosition: Vector,
  roomShape: RoomShape,
): boolean {
  return isLRoom(roomShape)
    ? isValidGridPositionLRoom(gridPosition, roomShape)
    : isValidGridPositionNormal(gridPosition, roomShape);
}

function isValidGridPositionNormal(gridPosition: Vector, roomShape: RoomShape) {
  const topLeft = getRoomShapeTopLeftPosition(roomShape);
  const bottomRight = getRoomShapeTopLeftPosition(roomShape);
  return inRectangle(gridPosition, topLeft, bottomRight);
}

function isValidGridPositionLRoom(gridPosition: Vector, roomShape: RoomShape) {
  const rectangles = L_ROOM_SHAPE_TO_RECTANGLES[roomShape];
  if (rectangles === undefined) {
    return false;
  }

  const [
    verticalTopLeft,
    verticalBottomRight,
    horizontalTopLeft,
    horizontalBottomRight,
  ] = rectangles;
  return (
    inRectangle(gridPosition, verticalTopLeft, verticalBottomRight) &&
    inRectangle(gridPosition, horizontalTopLeft, horizontalBottomRight)
  );
}

/**
 * Helper function to convert a world position `Vector` to a grid position `Vector`.
 *
 * In this context, the grid position of the top-left wall is "Vector(-1, -1)".
 */
export function worldPositionToGridPosition(worldPos: Vector): Vector {
  const x = Math.round(worldPos.X / 40 - 2);
  const y = Math.round(worldPos.Y / 40 - 4);
  return Vector(x, y);
}

/**
 * Helper function to convert a world position `Vector` to a grid position `Vector`.
 *
 * In this context, the grid position of the top-left wall is "Vector(-1, -1)".
 *
 * This is similar to the `worldPositionToGridPosition` function, but the values are not rounded.
 */
export function worldPositionToGridPositionFast(worldPos: Vector): Vector {
  const x = worldPos.X / 40 - 2;
  const y = worldPos.Y / 40 - 4;
  return Vector(x, y);
}
