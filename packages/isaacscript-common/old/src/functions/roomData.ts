import {
  DoorSlot,
  DoorSlotFlag,
  RoomShape,
  RoomType,
  StageID,
} from "isaac-typescript-definitions";
import { game } from "../cachedClasses";
import { doorSlotFlagToDoorSlot } from "./doors";
import { getEnumValues } from "./enums";
import { hasFlag } from "./flag";

/**
 * Alias for the `Level.GetCurrentRoomDesc` method. Use this to make it more clear what type of
 * `RoomDescriptor` object that you are retrieving.
 */
export function getCurrentRoomDescriptorReadOnly(): ReadonlyRoomDescriptor {
  const level = game.GetLevel();
  return level.GetCurrentRoomDesc();
}

/**
 * Helper function to get the set of allowed door slots for the room at the supplied grid index.
 * This corresponds to the doors that are enabled in the STB/XML file for the room.
 */
export function getRoomAllowedDoors(roomGridIndex?: int): Set<DoorSlot> {
  const allowedDoors = new Set<DoorSlot>();

  const roomData = getRoomData(roomGridIndex);
  if (roomData === undefined) {
    return allowedDoors;
  }

  const doorSlotFlags = getEnumValues(DoorSlotFlag);
  for (const doorSlotFlag of doorSlotFlags) {
    if (hasFlag(roomData.Doors, doorSlotFlag)) {
      const doorSlot = doorSlotFlagToDoorSlot(doorSlotFlag);
      allowedDoors.add(doorSlot);
    }
  }

  return allowedDoors;
}

/**
 * Helper function to get the room data for the provided room.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function getRoomData(roomGridIndex?: int): RoomConfig | undefined {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return roomDescriptor.Data;
}

/**
 * Helper function to get the descriptor for a room.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function getRoomDescriptor(roomGridIndex?: int): RoomDescriptor {
  const level = game.GetLevel();

  if (roomGridIndex === undefined) {
    roomGridIndex = getRoomGridIndex();
  }

  return level.GetRoomByIdx(roomGridIndex);
}

/**
 * Helper function to get the grid index of the current room.
 *
 * - If the current room is inside of the grid, this function will return the `SafeGridIndex` from
 *   the room descriptor. (The safe grid index is defined as the top-left 1x1 section that the room
 *   overlaps with, or the top-right 1x1 section of a `RoomType.SHAPE_LTL` room.)
 * - If the current room is outside of the grid, it will return the index from the
 *   `Level.GetCurrentRoomIndex` method (since `SafeGridIndex` is bugged for these cases).
 *
 * Use this function instead of the `Level.GetCurrentRoomIndex` method directly because the latter
 * will return the specific 1x1 quadrant that the player entered the room at. For most situations,
 * using the safe grid index is more reliable than this.
 *
 * Data structures that store data per room should use the room's `ListIndex` instead of
 * `SafeGridIndex`, since the former is unique across different dimensions.
 */
export function getRoomGridIndex(): int {
  const level = game.GetLevel();
  const currentRoomIndex = level.GetCurrentRoomIndex();

  // Both `RoomDescriptor.GridIndex` and `RoomDescriptor.SafeGridIndex` will always be equal to -1
  // for rooms outside of the grid. Thus, we revert to using the `Level.GetCurrentRoomIndex` method
  // for these cases.
  if (currentRoomIndex < 0) {
    return currentRoomIndex;
  }

  const roomDescriptor = getCurrentRoomDescriptorReadOnly();
  return roomDescriptor.SafeGridIndex;
}

/**
 * Helper function to get the list grid index of the provided room, which is equal to the index in
 * the `RoomList.Get` method. In other words, this is equal to the order that the room was created
 * by the floor generation algorithm.
 *
 * Use this as an index for data structures that store data per room, since it is unique across
 * different dimensions.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function getRoomListIndex(roomGridIndex?: int): int {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return roomDescriptor.ListIndex;
}

/**
 * Helper function to get the name of the room as it appears in the STB/XML data.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room name. Returns "Unknown" if the type was not found.
 */
export function getRoomName(roomGridIndex?: int): string {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? "Unknown" : roomData.Name;
}

/**
 * Helper function to get the name of the room as it appears in the STB/XML data.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room name. Returns "Unknown" if the type was not found.
 */
export function getRoomShape(roomGridIndex?: int): RoomShape | undefined {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? undefined : roomData.Shape;
}

/**
 * Helper function to get the stage ID for a room from the XML/STB data. The room stage ID will
 * correspond to the first number in the filename of the XML/STB file. For example, a Depths room
 * would have a stage ID of 7.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room stage ID. Returns -1 if the stage ID was not found.
 */
export function getRoomStageID(roomGridIndex?: int): StageID {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? -1 : roomData.StageID;
}

/**
 * Helper function to get the sub-type for a room from the XML/STB data. The room sub-type will
 * correspond to different things depending on what XML/STB file it draws from. For example, in the
 * "00.special rooms.stb" file, an Angel Room with a sub-type of 0 will correspond to a normal Angel
 * Room and a sub-type of 1 will correspond to an Angel Room shop for The Stairway.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room sub-type. Returns -1 if the sub-type was not found.
 */
export function getRoomSubType(roomGridIndex?: int): int {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? -1 : roomData.Subtype;
}

/**
 * Helper function for getting the type of the room with the given grid index.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room data type. Returns -1 if the type was not found.
 */
export function getRoomType(roomGridIndex?: int): RoomType {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? -1 : roomData.Type;
}

/**
 * Helper function to get the variant for a room from the XML/STB data. You can think of a room
 * variant as its identifier. For example, to go to Basement room #123, you would use a console
 * command of `goto d.123` while on the Basement.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room variant. Returns -1 if the variant was not found.
 */
export function getRoomVariant(roomGridIndex?: int): int {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? -1 : roomData.Variant;
}

/**
 * Note that the room visited count will be inaccurate during the period before the PostNewRoom
 * callback has fired (i.e. when entities are initializing and performing their first update). This
 * is because the variable is only incremented immediately before the PostNewRoom callback fires.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function getRoomVisitedCount(roomGridIndex?: int): int {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return roomDescriptor.VisitedCount;
}
