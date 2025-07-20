import type { DisplayFlag } from "isaac-typescript-definitions";
import { DisplayFlagZero } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { addFlag } from "./flag";
import { getRoomDescriptor, getRoomGridIndex } from "./roomData";
import { getRoomsInsideGrid } from "./rooms";
import { isInteger } from "./types";
import { assertDefined } from "./utils";

/**
 * Helper function to add a `DisplayFlag` to a particular room's minimap display flags (e.g. whether
 * it is visible and so on).
 *
 * This function automatically accounts for if MinimapAPI is being used.
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
 * This function automatically accounts for if MinimapAPI is being used.
 *
 * This function automatically calls the `Level.UpdateVisibility` after setting the flags so that
 * the changes will be immediately visible.
 */
export function clearFloorDisplayFlags(): void {
  setAllDisplayFlags(DisplayFlagZero);
}

/**
 * Helper function to set the value of `DisplayFlag` for a room 0.
 *
 * This function automatically accounts for if MinimapAPI is being used.
 *
 * This function automatically calls the `Level.UpdateVisibility` after setting the flags so that
 * the changes will be immediately visible.
 *
 * Note that if you clear the display flags of a room but then the player travels to the room (or an
 * adjacent room), the room will appear on the minimap again. If you want to permanently hide the
 * room even in this circumstance, use the `hideRoomOnMinimap` helper function instead.
 */
export function clearRoomDisplayFlags(roomGridIndex: int): void {
  setRoomDisplayFlags(roomGridIndex, DisplayFlagZero);
}

/**
 * Helper function to get the minimap `DisplayFlag` value for every room on the floor. Returns a map
 * that is indexed by the room's safe grid index.
 *
 * This function automatically accounts for if MinimapAPI is being used.
 *
 * @param minimapAPI Optional. If MinimapAPI should be used, if present. Default is true.
 */
export function getFloorDisplayFlags(
  minimapAPI = true,
): ReadonlyMap<int, BitFlags<DisplayFlag>> {
  const displayFlagsMap = new Map<int, BitFlags<DisplayFlag>>();

  for (const roomDescriptor of getRoomsInsideGrid()) {
    const roomGridIndex = roomDescriptor.SafeGridIndex;
    const displayFlags = getRoomDisplayFlags(roomGridIndex, minimapAPI);
    displayFlagsMap.set(roomGridIndex, displayFlags);
  }

  return displayFlagsMap;
}

/**
 * Helper function to get a particular room's minimap display flags (e.g. whether it is visible and
 * so on).
 *
 * This function automatically accounts for if MinimapAPI is being used.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @param minimapAPI Optional. If MinimapAPI should be used, if present. Default is true.
 */
export function getRoomDisplayFlags(
  roomGridIndex?: int,
  minimapAPI = true,
): BitFlags<DisplayFlag> {
  roomGridIndex ??= getRoomGridIndex();

  if (MinimapAPI === undefined || !minimapAPI) {
    const roomDescriptor = getRoomDescriptor(roomGridIndex);
    return roomDescriptor.DisplayFlags;
  }

  const minimapAPIRoomDescriptor = MinimapAPI.GetRoomByIdx(roomGridIndex);
  assertDefined(
    minimapAPIRoomDescriptor,
    `Failed to get the MinimapAPI room descriptor for the room at grid index: ${roomGridIndex}`,
  );

  return minimapAPIRoomDescriptor.GetDisplayFlags();
}

/**
 * Helper function to hide a specific room on the minimap.
 *
 * If you want the room to be permanently hidden, you must to call this function on every new room.
 * This is because if the player enters into the room or walks into an adjacent room, the room will
 * reappear on the minimap.
 *
 * This function automatically accounts for if MinimapAPI is being used.
 */
export function hideRoomOnMinimap(roomGridIndex: int): void {
  clearRoomDisplayFlags(roomGridIndex);

  // In vanilla, the map only updates at the beginning of every room. In MinimapAPI, it constant
  // updates, so we must specifically tell MinimapAPI that the room should be hidden using the
  // `Hidden` property.
  if (MinimapAPI !== undefined) {
    const minimapAPIRoomDescriptor = MinimapAPI.GetRoomByIdx(roomGridIndex);
    assertDefined(
      minimapAPIRoomDescriptor,
      `Failed to get the MinimapAPI room descriptor for the room at grid index: ${roomGridIndex}`,
    );

    minimapAPIRoomDescriptor.Hidden = true;
  }
}

/**
 * Helper function to check if a given room is visible on the minimap.
 *
 * @param roomGridIndexOrRoomDescriptor The room to check.
 * @param minimapAPI Optional. Whether MinimapAPI should be used, if present. Default is true.
 */
export function isRoomVisible(
  roomGridIndexOrRoomDescriptor: int | RoomDescriptor,
  minimapAPI = true,
): boolean {
  const roomGridIndex = isInteger(roomGridIndexOrRoomDescriptor)
    ? roomGridIndexOrRoomDescriptor
    : roomGridIndexOrRoomDescriptor.SafeGridIndex;
  const roomDisplayFlags = getRoomDisplayFlags(roomGridIndex, minimapAPI);

  return roomDisplayFlags !== DisplayFlagZero;
}

/**
 * Helper function to set the minimap `DisplayFlag` value for every room on the floor at once.
 *
 * This function automatically calls the `Level.UpdateVisibility` after setting the flags so that
 * the changes will be immediately visible.
 *
 * This function automatically accounts for if MinimapAPI is being used.
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
 * This function automatically accounts for if MinimapAPI is being used.
 *
 * @param displayFlagsMap A map of the display flags that is indexed by the room's safe grid index.
 */
export function setFloorDisplayFlags(
  displayFlagsMap: ReadonlyMap<int, BitFlags<DisplayFlag>>,
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
 * Helper function to set a particular room's minimap display flags (e.g. whether it is visible and
 * so on).
 *
 * This function automatically accounts for if MinimapAPI is being used.
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
  roomGridIndex ??= getRoomGridIndex();

  if (MinimapAPI === undefined) {
    const roomDescriptor = getRoomDescriptor(roomGridIndex);
    roomDescriptor.DisplayFlags = displayFlags;

    if (updateVisibility) {
      const level = game.GetLevel();
      level.UpdateVisibility();
    }
  } else {
    const minimapAPIRoomDescriptor = MinimapAPI.GetRoomByIdx(roomGridIndex);
    assertDefined(
      minimapAPIRoomDescriptor,
      `Failed to get the MinimapAPI room descriptor for the room at grid index: ${roomGridIndex}`,
    );

    minimapAPIRoomDescriptor.SetDisplayFlags(displayFlags);
  }
}
