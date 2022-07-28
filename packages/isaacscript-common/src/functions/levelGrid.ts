/**
 * These functions have to do with the room grid index for the level (i.e. the position that the
 * room is on the grid that represents the map for the level).
 *
 * For functions having to do with the grid index inside of the room, see the "Room Grid" functions.
 *
 * @module
 */

import {
  DoorSlot,
  RoomDescriptorFlag,
  RoomShape,
  RoomType,
} from "isaac-typescript-definitions";
import { LEVEL_GRID_ROW_WIDTH, MAX_LEVEL_GRID_INDEX } from "../constants";
import { ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA } from "../objects/roomShapeToDoorSlotsToGridIndexDelta";
import { hasFlag } from "./flag";
import {
  getRoomAllowedDoors,
  getRoomData,
  getRoomDescriptor,
  getRoomGridIndex,
  getRoomShape,
} from "./roomData";
import { getRooms } from "./rooms";
import { getGridIndexDelta } from "./roomShape";

const LEFT = -1;
const UP = -LEVEL_GRID_ROW_WIDTH;
const RIGHT = 1;
const DOWN = LEVEL_GRID_ROW_WIDTH;

const ADJACENT_ROOM_GRID_INDEX_DELTAS: readonly int[] = [LEFT, UP, RIGHT, DOWN];

/**
 * Helper function to get the room grid indexes that are adjacent to a given room grid index.
 *
 * Adjacent room grid indexes that are outside of the grid will not be included in the returned
 * array.
 *
 * If a room grid index is provided that is outside of the grid, then an empty array will be
 * returned.
 *
 * Note that this function does not take the shape of the room into account; it only looks at a
 * single room grid index.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function getAdjacentRoomGridIndexes(roomGridIndex?: int): int[] {
  const roomGridIndexToUse =
    roomGridIndex === undefined ? getRoomGridIndex() : roomGridIndex;

  if (!isRoomGridIndexInBounds(roomGridIndexToUse)) {
    return [];
  }

  const adjacentRoomGridIndexes = ADJACENT_ROOM_GRID_INDEX_DELTAS.map(
    (delta) => roomGridIndexToUse + delta,
  );

  return adjacentRoomGridIndexes.filter((adjacentRoomGridIndex) =>
    isRoomGridIndexInBounds(adjacentRoomGridIndex),
  );
}

/** Helper function to get the room safe grid index for every room on the entire floor. */
export function getAllRoomGridIndexes(): int[] {
  const rooms = getRooms();
  return rooms.map((roomDescriptor) => roomDescriptor.SafeGridIndex);
}

/**
 * Helper function to get an array of all of the safe grid indexes for rooms that match the
 * specified room type.
 *
 * This function only searches through rooms in the current dimension.
 *
 * This function is variadic, meaning that you can specify N arguments to get the combined grid
 * indexes for N room types.
 */
export function getRoomGridIndexesForType(...roomTypes: RoomType[]): int[] {
  const roomTypesSet = new Set<RoomType>([...roomTypes]);

  const rooms = getRooms();
  const matchingRooms = rooms.filter(
    (roomDescriptor) =>
      roomDescriptor.Data !== undefined &&
      roomTypesSet.has(roomDescriptor.Data.Type),
  );

  return matchingRooms.map((roomDescriptor) => roomDescriptor.SafeGridIndex);
}

/**
 * Helper function to get the grid indexes of all the rooms connected to the given room index,
 * taking the shape of the room into account.
 *
 * Returns an empty array if the provided room grid index is out of bounds or has no associated room
 * data.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function getRoomNeighbors(roomGridIndex?: int): int[] {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);

  if (!isRoomGridIndexInBounds(roomDescriptor.SafeGridIndex)) {
    return [];
  }

  const roomData = roomDescriptor.Data;
  if (roomData === undefined) {
    return [];
  }

  const roomShape = roomData.Shape;
  const gridIndexes = getRoomShapeNeighborGridIndexes(
    roomDescriptor.SafeGridIndex,
    roomShape,
  );

  return gridIndexes.filter((gridIndex) => roomExists(gridIndex));
}

/**
 * Helper function to get the room grid index delta that each hypothetical door in a given room
 * shape would go to.
 *
 * This is used by the `getRoomShapeNeighborGridIndexes` function.
 */
export function getRoomShapeNeighborGridIndexDeltas(
  roomShape: RoomShape,
): int[] {
  return [...ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA[roomShape].values()];
}

/**
 * Helper function to get the room grid index that each hypothetical door in a given room shape
 * would go to.
 *
 * @param safeRoomGridIndex This must be the room safe grid index (i.e. the top-left room grid index
 *                          for the respective room).
 * @param roomShape The shape of the room.
 */
export function getRoomShapeNeighborGridIndexes(
  safeRoomGridIndex: int,
  roomShape: RoomShape,
): int[] {
  const roomShapeNeighborGridIndexDeltas =
    getRoomShapeNeighborGridIndexDeltas(roomShape);

  return roomShapeNeighborGridIndexDeltas.map(
    (gridIndexDelta) => gridIndexDelta + safeRoomGridIndex,
  );
}

/**
 * Helper function to check if the given room grid index is a dead end. Specifically, this is
 * defined as having only one adjacent room that exists.
 *
 * Note that this function does not take the shape of the room into account; it only looks at a
 * single room grid index.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function isDeadEnd(roomGridIndex?: int): boolean {
  const adjacentRoomGridIndexes = getAdjacentRoomGridIndexes(roomGridIndex);
  const adjacentRoomData = adjacentRoomGridIndexes.map(
    (adjacentRoomGridIndex) => getRoomData(adjacentRoomGridIndex),
  );
  const existingRoomData = adjacentRoomData.filter(
    (data): data is RoomConfig => data !== undefined,
  );

  return existingRoomData.length === 1;
}

export function isDoorSlotValidAtGridIndex(
  doorSlot: DoorSlot,
  roomGridIndex: int,
): boolean {
  const allowedDoors = getRoomAllowedDoors(roomGridIndex);
  return allowedDoors.has(doorSlot);
}

export function isDoorSlotValidAtGridIndexForRedRoom(
  doorSlot: DoorSlot,
  roomGridIndex: int,
): boolean {
  const doorSlotValidAtGridIndex = isDoorSlotValidAtGridIndex(
    doorSlot,
    roomGridIndex,
  );
  if (!doorSlotValidAtGridIndex) {
    return false;
  }

  const roomShape = getRoomShape(roomGridIndex);
  if (roomShape === undefined) {
    return false;
  }

  const delta = getGridIndexDelta(roomShape, doorSlot);
  if (delta === undefined) {
    return false;
  }

  const redRoomGridIndex = roomGridIndex + delta;
  return (
    !roomExists(redRoomGridIndex) && isRoomGridIndexInBounds(redRoomGridIndex)
  );
}

/**
 * Helper function to detect if the provided room was created by the Red Key item. Under the hood,
 * this checks for the `RoomDescriptorFlag.FLAG_RED_ROOM` flag.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function isRedKeyRoom(roomGridIndex?: int): boolean {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);
  return hasFlag(roomDescriptor.Flags, RoomDescriptorFlag.RED_ROOM);
}

/**
 * Helper function to determine if a given room grid index is inside of the normal 13x13 level grid.
 *
 * For example, Devil Rooms and the Mega Satan room are not considered to be inside the grid.
 */
export function isRoomGridIndexInBounds(roomGridIndex: int): boolean {
  return roomGridIndex >= 0 && roomGridIndex <= MAX_LEVEL_GRID_INDEX;
}

/** Helper function to check if a room exists at the given room grid index. */
export function roomExists(roomGridIndex: int): boolean {
  const roomData = getRoomData(roomGridIndex);
  return roomData !== undefined;
}

/**
 * Helper function to get the coordinates of a given grid index. The floor is represented by a 13x13
 * grid.
 *
 * - Since the starting room is in the center, the starting room grid index of 84 is equal to
 *   coordinates of (6, 6).
 * - The top-left grid index of 0 is equal to coordinates of: (12, 0)
 * - The top-right grid index of 12 is equal to coordinates of: (0, 0)
 * - The bottom-left grid index of 156 is equal to coordinates of: (0, 12)
 * - The bottom-right grid index of 168 is equal to coordinates of: (12, 12)
 */
export function roomGridIndexToXY(roomGridIndex: int): [x: int, y: int] {
  const x = roomGridIndex % LEVEL_GRID_ROW_WIDTH;
  const y = Math.floor(roomGridIndex / LEVEL_GRID_ROW_WIDTH);

  return [x, y];
}
