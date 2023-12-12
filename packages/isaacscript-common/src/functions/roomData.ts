import type {
  DoorSlot,
  RoomShape,
  RoomType,
  StageID,
} from "isaac-typescript-definitions";
import { DOOR_SLOT_FLAG_VALUES } from "../cachedEnumValues";
import { game } from "../core/cachedClasses";
import { doorSlotFlagToDoorSlot } from "./doors";
import { hasFlag } from "./flag";

/**
 * Helper function to get the set of allowed door slots for the room at the supplied grid index.
 * This corresponds to the doors that are enabled in the STB/XML file for the room.
 */
export function getRoomAllowedDoors(
  roomGridIndex?: int,
): ReadonlySet<DoorSlot> {
  const allowedDoors = new Set<DoorSlot>();

  const roomData = getRoomData(roomGridIndex);
  if (roomData === undefined) {
    return allowedDoors;
  }

  for (const doorSlotFlag of DOOR_SLOT_FLAG_VALUES) {
    if (hasFlag(roomData.Doors, doorSlotFlag)) {
      const doorSlot = doorSlotFlagToDoorSlot(doorSlotFlag);
      allowedDoors.add(doorSlot);
    }
  }

  return allowedDoors;
}

/**
 * Helper function to get the room data for the current room.
 *
 * You can optionally provide a room grid index as an argument to get the data for that room
 * instead.
 *
 * (The version of the function without any arguments will not return undefined since the current
 * room is guaranteed to have data.)
 */
export function getRoomData(): RoomConfig;

/**
 * Helper function to get the room data for the current or provided room.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room data for the room or undefined if the provided room does not have any data.
 */
export function getRoomData(roomGridIndex?: int): RoomConfig | undefined;

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
 * Alias for the `Level.GetCurrentRoomDesc` method. Use this to make it more clear what type of
 * `RoomDescriptor` object that you are retrieving.
 */
export function getRoomDescriptorReadOnly(): Readonly<RoomDescriptor> {
  const level = game.GetLevel();
  return level.GetCurrentRoomDesc();
}

/**
 * Helper function to get the grid index of the current room.
 *
 * - If the current room is inside of the grid, this function will return the `SafeGridIndex` from
 *   the room descriptor. (The safe grid index is defined as the top-left 1x1 section that the room
 *   overlaps with, or the top-right 1x1 section of a `RoomType.SHAPE_LTL` room.)
 * - If the current room is outside of the grid, it will return the index from the
 *   `Level.GetCurrentRoomIndex` method, since `SafeGridIndex` is bugged for these cases, as
 *   demonstrated by entering a Genesis room and entering `l
 *   print(Game():GetLevel():GetCurrentRoomDesc().SafeGridIndex)` into the console. (It prints -1
 *   instead of -12.)
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

  if (currentRoomIndex < 0) {
    return currentRoomIndex;
  }

  const roomDescriptor = getRoomDescriptorReadOnly();
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
 * Helper function to get the name of the current room as it appears in the STB/XML data.
 *
 * You can optionally provide a room grid index as an argument to get the name for that room
 * instead.
 *
 * (The version of the function without any arguments will not return undefined since the current
 * room is guaranteed to have data.)
 *
 * If you want to get the room name for a specific room type, use the `getRoomTypeName` function.
 */
export function getRoomName(): string;

/**
 * Helper function to get the name of the room as it appears in the STB/XML data.
 *
 * If you want to get the room name for a specific room type, use the `getRoomTypeName` function.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room name. Returns undefined if the room data was not found.
 */
export function getRoomName(roomGridIndex?: int): string | undefined;

export function getRoomName(roomGridIndex?: int): string | undefined {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? undefined : roomData.Name;
}

/**
 * Helper function to get the shape of the current room as it appears in the STB/XML data.
 *
 * You can optionally provide a room grid index as an argument to get the shape for that room
 * instead.
 *
 * (The version of the function without any arguments will not return undefined since the current
 * room is guaranteed to have data.)
 */
export function getRoomShape(): RoomShape;

/**
 * Helper function to get the shape of the room as it appears in the STB/XML data.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room shape. Returns undefined if the room data was not found.
 */
export function getRoomShape(roomGridIndex?: int): RoomShape | undefined;

export function getRoomShape(roomGridIndex?: int): RoomShape | undefined {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? undefined : roomData.Shape;
}

/**
 * Helper function to get the stage ID for the current room as it appears in the STB/XML data.
 *
 * The room stage ID will correspond to the first number in the filename of the XML/STB file. For
 * example, a Depths room would have a stage ID of `StageID.DEPTHS` (7).
 *
 * You can optionally provide a room grid index as an argument to get the stage ID for that room
 * instead.
 *
 * (The version of the function without any arguments will not return undefined since the current
 * room is guaranteed to have data.)
 */
export function getRoomStageID(): StageID;

/**
 * Helper function to get the stage ID for a room as it appears in the STB/XML data.
 *
 * The room stage ID will correspond to the first number in the filename of the XML/STB file. For
 * example, a Depths room would have a stage ID of `StageID.DEPTHS` (7).
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room stage ID. Returns undefined if the room data was not found.
 */
export function getRoomStageID(roomGridIndex?: int): StageID | undefined;

export function getRoomStageID(roomGridIndex?: int): StageID | undefined {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? undefined : roomData.StageID;
}

/**
 * Helper function to get the sub-type for the current room as it appears in the STB/XML data.
 *
 * The room sub-type will correspond to different things depending on what XML/STB file it draws
 * from. For example, in the "00.special rooms.stb" file, an Angel Room with a sub-type of 0 will
 * correspond to a normal Angel Room and a sub-type of 1 will correspond to an Angel Room shop from
 * The Stairway.
 *
 * You can optionally provide a room grid index as an argument to get the sub-type for that room
 * instead.
 *
 * (The version of the function without any arguments will not return undefined since the current
 * room is guaranteed to have data.)
 */
export function getRoomSubType(): int;

/**
 * Helper function to get the sub-type for a room as it appears in the STB/XML data.
 *
 * The room sub-type will correspond to different things depending on what XML/STB file it draws
 * from. For example, in the "00.special rooms.stb" file, an Angel Room with a sub-type of 0 will
 * correspond to a normal Angel Room and a sub-type of 1 will correspond to an Angel Room shop from
 * The Stairway.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room sub-type. Returns undefined if the room data was not found.
 */
export function getRoomSubType(roomGridIndex?: int): int | undefined;

export function getRoomSubType(roomGridIndex?: int): int | undefined {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? undefined : roomData.Subtype;
}

/**
 * Helper function to get the type for the current room as it appears in the STB/XML data.
 *
 * You can optionally provide a room grid index as an argument to get the type for that room
 * instead.
 *
 * (The version of the function without any arguments will not return undefined since the current
 * room is guaranteed to have data.)
 */
export function getRoomType(): RoomType;

/**
 * Helper function to get the type for a room as it appears in the STB/XML data.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room type. Returns undefined if the room data was not found.
 */
export function getRoomType(roomGridIndex?: int): RoomType | undefined;

/**
 * Helper function for getting the type of the room with the given grid index.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room data type. Returns -1 if the room data was not found.
 */
export function getRoomType(roomGridIndex?: int): RoomType | undefined {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? undefined : roomData.Type;
}

/**
 * Helper function to get the variant for the current room as it appears in the STB/XML data.
 *
 * You can think of a room variant as its identifier. For example, to go to Basement room #123, you
 * would use a console command of `goto d.123` while on the Basement.
 *
 * You can optionally provide a room grid index as an argument to get the variant for that room
 * instead.
 *
 * (The version of the function without any arguments will not return undefined since the current
 * room is guaranteed to have data.)
 */
export function getRoomVariant(): int;

/**
 * Helper function to get the variant for a room as it appears in the STB/XML data.
 *
 * You can think of a room variant as its identifier. For example, to go to Basement room #123, you
 * would use a console command of `goto d.123` while on the Basement.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns The room variant. Returns undefined if the room data was not found.
 */
export function getRoomVariant(roomGridIndex?: int): int | undefined;

export function getRoomVariant(roomGridIndex?: int): int {
  const roomData = getRoomData(roomGridIndex);
  return roomData === undefined ? -1 : roomData.Variant;
}

/**
 * Note that the room visited count will be inaccurate during the period before the `POST_NEW_ROOM`
 * callback has fired (i.e. when entities are initializing and performing their first update). This
 * is because the variable is only incremented immediately before the `POST_NEW_ROOM` callback
 * fires.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function getRoomVisitedCount(roomGridIndex?: int): int {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return roomDescriptor.VisitedCount;
}

/**
 * Helper function to set the data for a given room. This will change the room type, contents, and
 * so on.
 */
export function setRoomData(roomGridIndex: int, roomData: RoomConfig): void {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  roomDescriptor.Data = roomData;
}
