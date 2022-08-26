/**
 * These functions have to do with the room grid index for the level (i.e. the position that the
 * room is on the grid that represents the map for the level).
 *
 * For functions having to do with the grid index inside of the room, see the "Room Grid" functions.
 *
 * @module
 */

import {
  DisplayFlag,
  DoorSlot,
  DownpourRoomSubType,
  LevelStateFlag,
  MinesRoomSubType,
  RoomDescriptorFlag,
  RoomShape,
  RoomType,
} from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import {
  ALL_DISPLAY_FLAGS,
  LEVEL_GRID_ROW_WIDTH,
  MAX_LEVEL_GRID_INDEX,
} from "../core/constants";
import { ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA } from "../objects/roomShapeToDoorSlotsToGridIndexDelta";
import { getRandomArrayElement } from "./array";
import { doorSlotToDoorSlotFlag } from "./doors";
import { addFlag, hasFlag, removeFlag } from "./flag";
import { getRandomSeed, isRNG, newRNG } from "./rng";
import {
  getRoomAllowedDoors,
  getRoomData,
  getRoomDescriptor,
  getRoomGridIndex,
  getRoomShape,
} from "./roomData";
import { getRooms, getRoomsInsideGrid } from "./rooms";
import { getGridIndexDelta } from "./roomShape";
import { asNumber } from "./types";

const LEFT = -1;
const UP = -LEVEL_GRID_ROW_WIDTH;
const RIGHT = 1;
const DOWN = LEVEL_GRID_ROW_WIDTH;

const ADJACENT_ROOM_GRID_INDEX_DELTAS: readonly int[] = [LEFT, UP, RIGHT, DOWN];

/**
 * Helper function to get only the adjacent room grid indexes that exist (i.e. have room data).
 *
 * This is just a filtering of the results of the `getAdjacentExistingRoomGridIndexes` function. See
 * that function for more information.
 */
export function getAdjacentExistingRoomGridIndexes(roomGridIndex?: int): int[] {
  const adjacentRoomGridIndexes = getAdjacentRoomGridIndexes(roomGridIndex);
  return adjacentRoomGridIndexes.filter(
    (adjacentRoomGridIndex) => getRoomData(adjacentRoomGridIndex) !== undefined,
  );
}

/**
 * Helper function to get only the adjacent room grid indexes that do not exist (i.e. do not have
 * room data).
 *
 * This is just a filtering of the results of the `getAdjacentExistingRoomGridIndexes` function. See
 * that function for more information.
 */
export function getAdjacentNonExistingRoomGridIndexes(
  roomGridIndex?: int,
): int[] {
  const adjacentRoomGridIndexes = getAdjacentRoomGridIndexes(roomGridIndex);
  return adjacentRoomGridIndexes.filter(
    (adjacentRoomGridIndex) => getRoomData(adjacentRoomGridIndex) === undefined,
  );
}

/**
 * Helper function to get all of the room grid indexes that are adjacent to a given room grid index
 * (even if those room grid indexes do not have any rooms in them).
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

  if (!isRoomInsideGrid(roomGridIndexToUse)) {
    return [];
  }

  const adjacentRoomGridIndexes = ADJACENT_ROOM_GRID_INDEX_DELTAS.map(
    (delta) => roomGridIndexToUse + delta,
  );

  return adjacentRoomGridIndexes.filter((adjacentRoomGridIndex) =>
    isRoomInsideGrid(adjacentRoomGridIndex),
  );
}

/** Helper function to get the room safe grid index for every room on the entire floor. */
export function getAllRoomGridIndexes(): int[] {
  const rooms = getRooms();
  return rooms.map((roomDescriptor) => roomDescriptor.SafeGridIndex);
}

/**
 * Helper function to pick a random valid spot on the floor to insert a brand new room. Note that
 * some floors will not have any valid spots. If this is the case, this function will return
 * undefined.
 *
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @returns Either a tuple of adjacent room grid index, `DoorSlot`, and new room grid index, or
 *          undefined.
 */
export function getNewRoomCandidate(
  seedOrRNG: Seed | RNG = getRandomSeed(),
):
  | [adjacentRoomGridIndex: int, doorSlot: DoorSlot, newRoomGridIndex: int]
  | undefined {
  const newRoomCandidatesForLevel = getNewRoomCandidatesForLevel();
  if (newRoomCandidatesForLevel.length === 0) {
    return undefined;
  }

  return getRandomArrayElement(newRoomCandidatesForLevel, seedOrRNG);
}

/**
 * Helper function to iterate through the possible doors for a room and see if any of them would be
 * a valid spot to insert a brand new room on the floor.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns A array of tuples of `DoorSlot` and room grid index.
 */
export function getNewRoomCandidatesBesideRoom(
  roomGridIndex?: int,
): Array<[doorSlot: DoorSlot, roomGridIndex: int]> {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);

  if (!isRoomInsideGrid(roomDescriptor.SafeGridIndex)) {
    return [];
  }

  const roomData = roomDescriptor.Data;
  if (roomData === undefined) {
    return [];
  }

  const doorSlotToRoomGridIndexes = getRoomShapeAdjacentNonExistingGridIndexes(
    roomDescriptor.SafeGridIndex,
    roomData.Shape,
  );

  const roomCandidates: Array<[DoorSlot, int]> = [];

  for (const [
    doorSlot,
    adjacentRoomGridIndex,
  ] of doorSlotToRoomGridIndexes.entries()) {
    // The "getRoomShapeAdjacentNonExistingGridIndexes" returns grid indexes for every possible
    // door, but the real room we are examining will only have a subset of these doors. Thus, we
    // have to exclude adjacent grid indexes where it would not be possible to place a door.
    const doorSlotFlag = doorSlotToDoorSlotFlag(doorSlot);
    if (!hasFlag(roomData.Doors, doorSlotFlag)) {
      continue;
    }

    // Check to see if hypothetically creating a room at the given room grid index would be a dead
    // end. In other words, if we created the room, we would only want it to connect to one other
    // room (this one).
    if (!isDeadEnd(adjacentRoomGridIndex)) {
      continue;
    }

    roomCandidates.push([doorSlot, adjacentRoomGridIndex]);
  }

  return roomCandidates;
}

/**
 * Helper function to search through all of the rooms on the floor for a spot to insert a brand new
 * room.
 *
 * @returns A array of tuples of adjacent room grid index, `DoorSlot`, and new room grid index.
 */
export function getNewRoomCandidatesForLevel(): Array<
  [adjacentRoomGridIndex: int, doorSlot: DoorSlot, newRoomGridIndex: int]
> {
  const rooms = getRoomsInsideGrid();
  const normalRooms = rooms.filter(
    (room) =>
      room.Data !== undefined &&
      room.Data.Type === RoomType.DEFAULT &&
      room.Data.Subtype !== asNumber(DownpourRoomSubType.MIRROR) &&
      room.Data.Subtype !== asNumber(MinesRoomSubType.MINESHAFT_ENTRANCE),
  );

  const newRoomCandidates: Array<[int, DoorSlot, int]> = [];

  for (const room of normalRooms) {
    const newRoomCandidatesBesideRoom = getNewRoomCandidatesBesideRoom(
      room.SafeGridIndex,
    );
    for (const [doorSlot, newRoomGridIndex] of newRoomCandidatesBesideRoom) {
      newRoomCandidates.push([room.SafeGridIndex, doorSlot, newRoomGridIndex]);
    }
  }

  return newRoomCandidates;
}

/**
 * Helper function to get the grid indexes of all the rooms connected to the given room index,
 * taking the shape of the room into account. (This will only include rooms with valid data.)
 *
 * Returns an empty map if the provided room grid index is out of bounds or has no associated room
 * data.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 * @returns A map of `DoorSlot` to the corresponding room grid index.
 */
export function getRoomAdjacentGridIndexes(
  roomGridIndex?: int,
): Map<DoorSlot, int> {
  const roomDescriptor = getRoomDescriptor(roomGridIndex);

  if (!isRoomInsideGrid(roomDescriptor.SafeGridIndex)) {
    return new Map();
  }

  const roomData = roomDescriptor.Data;
  if (roomData === undefined) {
    return new Map();
  }

  return getRoomShapeAdjacentExistingGridIndexes(
    roomDescriptor.SafeGridIndex,
    roomData.Shape,
  );
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

  const rooms = getRoomsInsideGrid();
  const matchingRooms = rooms.filter(
    (roomDescriptor) =>
      roomDescriptor.Data !== undefined &&
      roomTypesSet.has(roomDescriptor.Data.Type),
  );

  return matchingRooms.map((roomDescriptor) => roomDescriptor.SafeGridIndex);
}

/**
 * Helper function to get only the adjacent room grid indexes for a room shape that exist (i.e. have
 * room data).
 *
 * This is just a filtering of the results of the `getRoomShapeAdjacentGridIndexes` function. See
 * that function for more information.
 */
export function getRoomShapeAdjacentExistingGridIndexes(
  safeRoomGridIndex: int,
  roomShape: RoomShape,
): Map<DoorSlot, int> {
  const roomShapeAdjacentGridIndexes = getRoomShapeAdjacentGridIndexes(
    safeRoomGridIndex,
    roomShape,
  );

  for (const [
    doorSlot,
    roomGridIndex,
  ] of roomShapeAdjacentGridIndexes.entries()) {
    const roomData = getRoomData(roomGridIndex);
    if (roomData === undefined) {
      roomShapeAdjacentGridIndexes.delete(doorSlot);
    }
  }

  return roomShapeAdjacentGridIndexes;
}

/**
 * Helper function to get the room grid index delta that each hypothetical door in a given room
 * shape would go to.
 *
 * This is used by the `getRoomShapeAdjacentGridIndexes` function.
 *
 * @returns A map of `DoorSlot` to the corresponding room grid index delta.
 */
export function getRoomShapeAdjacentGridIndexDeltas(
  roomShape: RoomShape,
): Map<DoorSlot, int> {
  return ROOM_SHAPE_TO_DOOR_SLOTS_TO_GRID_INDEX_DELTA[roomShape];
}

/**
 * Helper function to get the room grid index that each hypothetical door in a given room shape
 * would go to. (This will not include room grid indexes that are outside of the grid.)
 *
 * @param safeRoomGridIndex This must be the room safe grid index (i.e. the top-left room grid index
 *                          for the respective room).
 * @param roomShape The shape of the room.
 * @returns A map of `DoorSlot` to the corresponding room grid index.
 */
export function getRoomShapeAdjacentGridIndexes(
  safeRoomGridIndex: int,
  roomShape: RoomShape,
): Map<DoorSlot, int> {
  const roomShapeAdjacentGridIndexDeltas =
    getRoomShapeAdjacentGridIndexDeltas(roomShape);

  const adjacentGridIndexes = new Map<DoorSlot, int>();
  for (const [doorSlot, delta] of roomShapeAdjacentGridIndexDeltas.entries()) {
    const roomGridIndex = safeRoomGridIndex + delta;
    if (isRoomInsideGrid(roomGridIndex)) {
      adjacentGridIndexes.set(doorSlot, roomGridIndex);
    }
  }

  return adjacentGridIndexes;
}

/**
 * Helper function to get only the adjacent room grid indexes for a room shape that do not exist
 * (i.e. do not have room data).
 *
 * This is just a filtering of the results of the `getRoomShapeAdjacentGridIndexes` function. See
 * that function for more information.
 */
export function getRoomShapeAdjacentNonExistingGridIndexes(
  safeRoomGridIndex: int,
  roomShape: RoomShape,
): Map<DoorSlot, int> {
  const roomShapeAdjacentGridIndexes = getRoomShapeAdjacentGridIndexes(
    safeRoomGridIndex,
    roomShape,
  );

  for (const [
    doorSlot,
    roomGridIndex,
  ] of roomShapeAdjacentGridIndexes.entries()) {
    const roomData = getRoomData(roomGridIndex);
    if (roomData !== undefined) {
      roomShapeAdjacentGridIndexes.delete(doorSlot);
    }
  }

  return roomShapeAdjacentGridIndexes;
}

/**
 * Helper function to check if the given room grid index is a dead end. Specifically, this is
 * defined as having only one adjacent room that exists.
 *
 * Note that this function does not take the shape of the room into account; it only looks at a
 * single room grid index.
 *
 * This function does not care if the given room grid index actually exists, so you can use it to
 * check if a hypothetical room would be a dead end.
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function isDeadEnd(roomGridIndex?: int): boolean {
  const adjacentNonExistingRoomGridIndexes =
    getAdjacentNonExistingRoomGridIndexes(roomGridIndex);

  return adjacentNonExistingRoomGridIndexes.length === 1;
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
  return !roomExists(redRoomGridIndex) && isRoomInsideGrid(redRoomGridIndex);
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
 *
 * @param roomGridIndex Optional. Default is the current room index.
 */
export function isRoomInsideGrid(roomGridIndex?: int): boolean {
  if (roomGridIndex === undefined) {
    roomGridIndex = getRoomGridIndex();
  }

  return roomGridIndex >= 0 && roomGridIndex <= MAX_LEVEL_GRID_INDEX;
}

/**
 * Helper function to generate a new room on the floor at a valid dead end attached to a normal
 * room.
 *
 * Under the hood, this function uses the `Level.MakeRedRoomDoor` method to create the room.
 *
 * The newly created room will have data corresponding to the game's randomly generated red room. If
 * you want to modify this, use the `setRoomData` helper function.
 *
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `Level.GetDungeonPlacementSeed`.
 * @returns The room grid index of the new room or undefined if the floor had no valid dead ends to
 *          place a room.
 */
export function newRoom(seedOrRNG?: Seed | RNG): int | undefined {
  const level = game.GetLevel();

  if (seedOrRNG === undefined) {
    seedOrRNG = level.GetDungeonPlacementSeed();
  }
  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

  const newRoomCandidate = getNewRoomCandidate(rng);
  if (newRoomCandidate === undefined) {
    return undefined;
  }
  const [adjacentRoomGridIndex, doorSlot, newRoomGridIndex] = newRoomCandidate;

  level.MakeRedRoomDoor(adjacentRoomGridIndex, doorSlot);

  // By default, the room will be a "red room" and have a red graphical tint, so we want to make it
  // a normal room.
  const roomDescriptor = getRoomDescriptor(newRoomGridIndex);
  roomDescriptor.Flags = removeFlag(
    roomDescriptor.Flags,
    RoomDescriptorFlag.RED_ROOM,
  );

  // By default, the new room will not appear on the map, even if the player has The Mind. Thus, we
  // must manually alter the `DisplayFlags` of the room descriptor.
  const roomData = roomDescriptor.Data;
  if (roomData !== undefined) {
    const hasFullMap = level.GetStateFlag(LevelStateFlag.FULL_MAP_EFFECT);
    const hasCompass = level.GetStateFlag(LevelStateFlag.COMPASS_EFFECT);
    const hasBlueMap = level.GetStateFlag(LevelStateFlag.BLUE_MAP_EFFECT);
    const roomType = roomData.Type;
    const isSecretRoom =
      roomType === RoomType.SECRET || roomType === RoomType.SUPER_SECRET;

    if (hasFullMap) {
      roomDescriptor.DisplayFlags = ALL_DISPLAY_FLAGS;
    } else if (!isSecretRoom && hasCompass) {
      roomDescriptor.DisplayFlags = addFlag(
        DisplayFlag.VISIBLE,
        DisplayFlag.SHOW_ICON,
      );
    } else if (isSecretRoom && hasBlueMap) {
      roomDescriptor.DisplayFlags = addFlag(
        DisplayFlag.VISIBLE,
        DisplayFlag.SHOW_ICON,
      );
    }
  }

  return newRoomGridIndex;
}

/**
 * Helper function to check if a room exists at the given room grid index. (A room will exist if it
 * has non-undefined data in the room descriptor.)
 */
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
