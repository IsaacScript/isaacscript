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
  const oldDisplayFlags = getRoomDisplayFlags(roomGridIndex);
  const newDisplayFlags = addFlag(oldDisplayFlags, displayFlag);
  setRoomDisplayFlags(roomGridIndex, newDisplayFlags, updateVisibility);
}

/**
 * Helper function to set the value of `DisplayFlag` for every room on the floor to 0.
 *
 * This function automatically accounts for whether or not MinimapAPI is being used.
 *
 * This function automatically calls the `Level.UpdateVisibility` after setting the flags so that
 * the changes will be immediately visible.
 */
export function clearFloorDisplayFlags(): void {
  setAllDisplayFlags(DisplayFlagZero);
}

/**
 * Helper function to get the minimap `DisplayFlag` value for every room on the floor. Returns a map
 * that is indexed by the room's safe grid index.
 *
 * This function automatically accounts for whether or not MinimapAPI is being used.
 */
export function getFloorDisplayFlags(): Map<int, BitFlags<DisplayFlag>> {
  const displayFlagsMap = new Map<int, BitFlags<DisplayFlag>>();

  for (const roomDescriptor of getRoomsInsideGrid()) {
    const roomGridIndex = roomDescriptor.SafeGridIndex;
    const displayFlags = getRoomDisplayFlags(roomGridIndex);
    displayFlagsMap.set(roomGridIndex, displayFlags);
  }

  return displayFlagsMap;
}

/**
 * Helper function to get a particular room's minimap display flags (e.g. whether or not it is
 * visible and so on).
 *
 * This function automatically accounts for whether or not MinimapAPI is being used.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function getRoomDisplayFlags(
  roomGridIndex?: int,
): BitFlags<DisplayFlag> {
  if (roomGridIndex === undefined) {
    roomGridIndex = getRoomGridIndex();
  }

  if (MinimapAPI === undefined) {
    const roomDescriptor = getRoomDescriptor(roomGridIndex);
    return roomDescriptor.DisplayFlags;
  }

  const minimapAPIRoomDescriptor = MinimapAPI.GetRoomByIdx(roomGridIndex);
  if (minimapAPIRoomDescriptor === undefined) {
    error(
      `Failed to get the MinimapAPI room descriptor for the room at index: ${roomGridIndex}`,
    );
  }
  return minimapAPIRoomDescriptor.GetDisplayFlags();
}

/**
 * Helper function to set the minimap `DisplayFlag` value for every room on the floor at once.
 *
 * This function automatically calls the `Level.UpdateVisibility` after setting the flags so that
 * the changes will be immediately visible.
 *
 * This function automatically accounts for whether or not MinimapAPI is being used.
 */
export function setAllDisplayFlags(displayFlags: BitFlags<DisplayFlag>): void {
  for (const room of getRoomsInsideGrid()) {
    // We pass false to the `updateVisibility` argument as a small optimization.
    setRoomDisplayFlags(room.SafeGridIndex, displayFlags, false);
  }

  // In vanilla, we must call the "Level.UpdateVisibility" method for the changes to be visible.
  if (MinimapAPI === undefined) {
    const level = game.GetLevel();
    level.UpdateVisibility();
  }
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
export function setFloorDisplayFlags(
  displayFlagsMap: Map<int, BitFlags<DisplayFlag>>,
): void {
  for (const [roomGridIndex, displayFlags] of displayFlagsMap) {
    // We pass false to the `updateVisibility` argument as a small optimization.
    setRoomDisplayFlags(roomGridIndex, displayFlags, false);
  }

  // In vanilla, we must call the "Level.UpdateVisibility" method for the changes to be visible.
  if (MinimapAPI === undefined) {
    const level = game.GetLevel();
    level.UpdateVisibility();
  }
}

/**
 * Helper function to set a particular room's minimap display flags (e.g. whether or not it is
 * visible and so on).
 *
 * This function automatically accounts for whether or not MinimapAPI is being used.
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
    if (minimapAPIRoomDescriptor === undefined) {
      error(
        `Failed to get the MinimapAPI room descriptor for the room at index: ${roomGridIndex}`,
      );
    }
    minimapAPIRoomDescriptor.SetDisplayFlags(displayFlags);
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
