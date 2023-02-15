import { DisplayFlag, DisplayFlagZero } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { addFlag } from "./flag";
import { getRoomDescriptor, getRoomGridIndex } from "./roomData";
import { getRoomsInsideGrid } from "./rooms";

/**
 * Helper function to add a `DisplayFlag` to a particular room's minimap display flags (e.g. whether
 * or not it is visible and so on).
 *
 * This function automatically accounts for whether or not MinimapAPI is being used.
 *
 * @param roomGridIndex Set to undefined to use the current room index.
 * @param displayFlag The `DisplayFlag` to set. (See the `DisplayFlag` enum.)
 * @param updateVisibility Optional. Whether to call the `Level.UpdateVisibility` method in order to
 *                         make the changes immediately visible. Default is true.
 */
export function addRoomDisplayFlag(
  roomGridIndex: int | undefined,
  displayFlag: DisplayFlag,
  updateVisibility = true,
): void {
  if (MinimapAPI === undefined) {
    const roomDescriptor = getRoomDescriptor(roomGridIndex);
    roomDescriptor.DisplayFlags = addFlag(
      roomDescriptor.DisplayFlags,
      displayFlag,
    );
  } else {
    if (roomGridIndex === undefined) {
      roomGridIndex = getRoomGridIndex();
    }
    const roomDescriptor = MinimapAPI.GetRoomByIdx(roomGridIndex);
    if (roomDescriptor !== undefined) {
      roomDescriptor.DisplayFlags = addFlag(
        roomDescriptor.DisplayFlags,
        displayFlag,
      );
    }
  }

  if (updateVisibility) {
    const level = game.GetLevel();
    level.UpdateVisibility();
  }
}

/**
 * Helper function to set the value of `DisplayFlag` for every room on the floor to 0.
 *
 * This function automatically calls the `Level.UpdateVisibility` after setting the flags so that
 * the changes will be immediately visible.
 */
export function clearFloorDisplayFlags(): void {
  const level = game.GetLevel();

  for (const room of getRoomsInsideGrid()) {
    room.DisplayFlags = DisplayFlagZero;
  }

  // We must call the "Level.UpdateVisibility" method for the changes to be visible.
  level.UpdateVisibility();
}

/**
 * Helper function to get the minimap `DisplayFlag` value for every room on the floor. Returns a map
 * that is indexed by the room's safe grid index.
 */
export function getFloorDisplayFlags(): Map<int, BitFlags<DisplayFlag>> {
  const displayFlagsMap = new Map<int, BitFlags<DisplayFlag>>();

  const roomsInGrid = getRoomsInsideGrid();
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
 * This function automatically accounts for whether or not MinimapAPI is being used.
 *
 * @param displayFlagsMap A map of the display flags that is indexed by the room's safe grid index.
 */
export function setDisplayFlags(
  displayFlagsMap: Map<int, BitFlags<DisplayFlag>>,
): void {
  const level = game.GetLevel();

  for (const [roomGridIndex, displayFlags] of displayFlagsMap) {
    if (MinimapAPI === undefined) {
      // We pass false to the `updateVisibility` argument as a small optimization.
      setRoomDisplayFlags(roomGridIndex, displayFlags, false);
    } else {
      const roomDescriptor = MinimapAPI.GetRoomByIdx(roomGridIndex);
      if (roomDescriptor !== undefined) {
        roomDescriptor.DisplayFlags = displayFlags;
      }
    }
  }

  // We must call the "Level.UpdateVisibility" method for the changes to be visible.
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
 * This function correctly handles the case of the player having MinimapAPI.
 *
 * @param roomGridIndex Set to undefined to use the current room index.
 * @param displayFlags The bit flags value to set. (See the `DisplayFlag` enum.)
 * @param updateVisibility Optional. Whether to call the `Level.UpdateVisibility` method in order to
 *                         make the changes immediately visible. Default is true. Set this to false
 *                         if you are doing a bunch of display flag setting and then manually call
 *                         the `Level.UpdateVisibility` method after you are done.
 */
export function setRoomDisplayFlags(
  roomGridIndex: int | undefined,
  displayFlags: BitFlags<DisplayFlag>,
  updateVisibility = true,
): void {
  if (roomGridIndex === undefined) {
    roomGridIndex = getRoomGridIndex();
  }

  if (MinimapAPI === undefined) {
    const roomDescriptor = getRoomDescriptor(roomGridIndex);
    roomDescriptor.DisplayFlags = displayFlags;

    if (updateVisibility) {
      const level = game.GetLevel();
      level.UpdateVisibility();
    }
  } else {
    const minimapAPIRoomDescriptor = MinimapAPI.GetRoomByIdx(roomGridIndex);
    if (minimapAPIRoomDescriptor !== undefined) {
      minimapAPIRoomDescriptor.DisplayFlags = displayFlags;
    }
  }
}

/**
 * Helper function to make a single room visible in a similar way to how the Compass makes a Boss
 * Room visible (e.g. by adding `DisplayFlag.SHOW_ICON`).
 *
 * @param roomGridIndex Set to undefined to use the current room index.
 * @param updateVisibility Optional. Whether to call the `Level.UpdateVisibility` method in order to
 *                         make the changes immediately visible. Default is true.
 */
export function setRoomVisible(
  roomGridIndex: int | undefined,
  updateVisibility = true,
): void {
  addRoomDisplayFlag(roomGridIndex, DisplayFlag.SHOW_ICON, updateVisibility);
}
