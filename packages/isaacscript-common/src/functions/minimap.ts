import { DisplayFlag } from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { getRoomDescriptor } from "./roomData";
import { getRoomsInGrid } from "./rooms";

/**
 * Helper function to get the minimap `DisplayFlag` value for every room on the floor. Returns a map
 * that is indexed by the room's safe grid index.
 */
export function getFloorDisplayFlags(): Map<int, BitFlags<DisplayFlag>> {
  const displayFlagsMap = new Map<int, BitFlags<DisplayFlag>>();

  const roomsInGrid = getRoomsInGrid();
  for (const roomDescriptor of roomsInGrid) {
    displayFlagsMap.set(
      roomDescriptor.SafeGridIndex,
      roomDescriptor.DisplayFlags,
    );
  }

  return displayFlagsMap;
}

/**
 * Helper function to get a particular room's minimap display flags (e.g. whether or not it is
 * visible and so on).
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function getRoomDisplayFlags(
  roomGridIndex?: int,
): BitFlags<DisplayFlag> {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return roomDescriptor.DisplayFlags;
}

/**
 * Helper function to set the minimap `DisplayFlag` value for multiple rooms at once.
 *
 * This function automatically calls the `Level.UpdateVisibility` after setting the flags so that
 * the changes will be immediately visible.
 *
 * @param displayFlagsMap A map of the display flags that is indexed by the room's safe grid index.
 */
export function setDisplayFlags(
  displayFlagsMap: Map<int, BitFlags<DisplayFlag>>,
): void {
  const level = game.GetLevel();

  for (const [roomGridIndex, displayFlags] of displayFlagsMap.entries()) {
    if (MinimapAPI === undefined) {
      setRoomDisplayFlags(roomGridIndex, displayFlags);
    } else {
      const roomDescriptor = MinimapAPI.GetRoomByIdx(roomGridIndex);
      if (roomDescriptor !== undefined) {
        roomDescriptor.DisplayFlags = displayFlags;
      }
    }
  }

  level.UpdateVisibility();
}

/** Alias for the `setDisplayFlags` function. */
export function setFloorDisplayFlags(
  displayFlagsMap: Map<int, BitFlags<DisplayFlag>>,
): void {
  setDisplayFlags(displayFlagsMap);
}

/**
 * Helper function to set a particular room's minimap display flags (e.g. whether or not it is
 * visible and so on).
 *
 * @param roomGridIndex Set to undefined to use the current room index.
 * @param displayFlags The bit flags value to set. (See the `DisplayFlag` enum.)
 */
export function setRoomDisplayFlags(
  roomGridIndex: int | undefined,
  displayFlags: BitFlags<DisplayFlag>,
): void {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  roomDescriptor.DisplayFlags = displayFlags;
}
