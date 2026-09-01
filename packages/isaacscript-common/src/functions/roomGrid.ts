/**
 * These functions have to do with the grid index inside of a room (i.e. the grid index that grid
 * entities use).
 *
 * For functions having to do with the room grid index of the level, see the "Level Grid" functions.
 *
 * @module
 */

import type { RoomShape } from "isaac-typescript-definitions";
import { L_ROOM_SHAPE_TO_RECTANGLES } from "../objects/LRoomShapeToRectangles";
import { inRectangle } from "./math";
import {
  getRoomShapeBottomRightPosition,
  getRoomShapeTopLeftPosition,
  getRoomShapeWidth,
  isLRoomShape,
} from "./roomShape";

/**
 * Helper function to convert grid coordinates to a world position `Vector`.
 *
 * For example, the coordinates of (0, 0) are equal to `Vector(80, 160)`.
 */
export function gridCoordinatesToWorldPosition(
  x: int,
  y: int,
): Readonly<Vector> {
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
): Readonly<Vector> {
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
export function gridPositionToWorldPosition(
  gridPosition: Vector,
): Readonly<Vector> {
  const x = (gridPosition.X + 2) * 40;
  const y = (gridPosition.Y + 4) * 40;

  return Vector(x, y);
}

/**
 * Test if a grid position is actually in the given `RoomShape`.
 *
 * In this context, the grid position of the top-left wall is "Vector(-1, -1)".
 */
export function isValidGridPosition(
  gridPosition: Vector,
  roomShape: RoomShape,
): boolean {
  return isLRoomShape(roomShape)
    ? isValidGridPositionLRoom(gridPosition, roomShape)
    : isValidGridPositionNormal(gridPosition, roomShape);
}

function isValidGridPositionNormal(gridPosition: Vector, roomShape: RoomShape) {
  const topLeft = getRoomShapeTopLeftPosition(roomShape);
  const bottomRight = getRoomShapeBottomRightPosition(roomShape);
  return inRectangle(gridPosition, topLeft, bottomRight);
}

function isValidGridPositionLRoom(gridPosition: Vector, roomShape: RoomShape) {
  const rectangles = L_ROOM_SHAPE_TO_RECTANGLES[roomShape];
  if (rectangles === undefined) {
    return false;
  }

  const {
    verticalTopLeft,
    verticalBottomRight,
    horizontalTopLeft,
    horizontalBottomRight,
  } = rectangles;
  return (
    inRectangle(gridPosition, verticalTopLeft, verticalBottomRight)
    || inRectangle(gridPosition, horizontalTopLeft, horizontalBottomRight)
  );
}

/**
 * Helper function to convert a world position `Vector` to a grid position `Vector`.
 *
 * In this context, the grid position of the top-left wall is "Vector(-1, -1)".
 */
export function worldPositionToGridPosition(
  worldPos: Vector,
): Readonly<Vector> {
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
export function worldPositionToGridPositionFast(
  worldPos: Vector,
): Readonly<Vector> {
  const x = worldPos.X / 40 - 2;
  const y = worldPos.Y / 40 - 4;
  return Vector(x, y);
}
