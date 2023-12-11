import { RoomShape } from "isaac-typescript-definitions";
import { getRoomShapeWidth } from "./roomShape";
import { iRange } from "./utils";

/**
 * Helper function to get all of the grid indexes between two grid indexes on either a horizontal or
 * vertical line, inclusive on both ends.
 *
 * If the first grid index is greater than the second grid index, the two will be swapped.
 *
 * This function will throw a run-time error if the two provided grid indexes are not on the same
 * horizontal or vertical line.
 */
export function getGridIndexesBetween(
  gridIndex1: int,
  gridIndex2: int,
  roomShape: RoomShape,
): readonly int[] {
  if (gridIndex1 > gridIndex2) {
    const oldGridIndex1 = gridIndex1;
    const oldGridIndex2 = gridIndex2;
    gridIndex1 = oldGridIndex2;
    gridIndex2 = oldGridIndex1;
  }

  const delta = gridIndex2 - gridIndex1;
  const gridWidth = getRoomShapeWidth(roomShape);

  const isOnHorizontalLine = delta <= gridWidth;
  if (isOnHorizontalLine) {
    return iRange(gridIndex1, gridIndex2);
  }

  const isOnVerticalLine = delta % gridWidth === 0;
  if (isOnVerticalLine) {
    return iRange(gridIndex1, gridIndex2, gridWidth);
  }

  error(
    `Failed to get the grid indexes between ${gridIndex1} and ${gridIndex2} for RoomShape.${RoomShape[roomShape]} (${roomShape}) since they are not on the same horizontal or vertical line.`,
  );
}
