import { game } from "../core/cachedClasses";
import { iRange } from "./utils";

/**
 * Helper function to get all of the grid indexes between two grid indexes on either a horizontal or
 * vertical line, inclusive on both ends.
 *
 * This function will throw a run-time error if the two provided grid indexes are not on the same
 * horizontal or vertical line.
 *
 * The in-between grid indexes are contingent on the current room shape, so this function should
 * never be called from the menu.
 */
export function getGridIndexesBetween(gridIndex1: int, gridIndex2: int): int[] {
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();

  if (gridIndex1 > gridIndex2) {
    const oldGridIndex1 = gridIndex1;
    const oldGridIndex2 = gridIndex2;
    gridIndex1 = oldGridIndex2;
    gridIndex2 = oldGridIndex1;
  }

  const delta = gridIndex2 - gridIndex1;
  const isOnHorizontalLine = delta <= gridWidth;
  if (isOnHorizontalLine) {
    return iRange(gridIndex1, gridIndex2);
  }

  const isOnVerticalLine = delta % gridWidth === 0;
  if (isOnVerticalLine) {
    return iRange(gridIndex1, gridIndex2, gridWidth);
  }

  error(
    `Failed to get the grid indexes between ${gridIndex1} and ${gridIndex2} since they are not on the same horizontal or vertical line.`,
  );
}
