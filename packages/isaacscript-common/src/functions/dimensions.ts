import { Dimension } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { DIMENSIONS } from "../core/constants";
import { getRoomGridIndex } from "./roomData";

/**
 * Helper function to get the current dimension. Most of the time, this will be `Dimension.MAIN`,
 * but it can change if e.g. the player is in the mirror world of Downpour/Dross.
 */
export function getDimension(): Dimension {
  const level = game.GetLevel();
  const roomGridIndex = getRoomGridIndex();
  const roomDescription = level.GetRoomByIdx(roomGridIndex, Dimension.CURRENT);
  const currentRoomHash = GetPtrHash(roomDescription);

  for (const dimension of DIMENSIONS) {
    const dimensionRoomDescription = level.GetRoomByIdx(
      roomGridIndex,
      dimension,
    );
    const dimensionRoomHash = GetPtrHash(dimensionRoomDescription);

    if (dimensionRoomHash === currentRoomHash) {
      return dimension;
    }
  }

  error("Failed to get the current dimension.");
}

export function inDimension(dimension: Dimension): boolean {
  return dimension === getDimension();
}
