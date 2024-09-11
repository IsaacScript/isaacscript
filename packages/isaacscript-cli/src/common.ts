// These are functions copied from `isaacscript-common`.

import { parseIntSafe } from "complete-common";
import { fatalError } from "complete-node";
import type { DoorSlot } from "./enums/copied/DoorSlot.js";
import type { DoorSlotFlag } from "./enums/copied/DoorSlotFlag.js";
import type { RoomShape } from "./enums/copied/RoomShape.js";
import type { JSONRoom } from "./interfaces/copied/JSONRoomsFile.js";
import { DOOR_SLOT_TO_DOOR_SLOT_FLAG } from "./objects/copied/doorSlotToDoorSlotFlag.js";
import { ROOM_SHAPE_TO_DOOR_SLOT_COORDINATES } from "./objects/copied/roomShapeToDoorSlotCoordinates.js";

/** This is copied from `isaacscript-common`. */
export function getJSONRoomDoorSlotFlags(jsonRoom: JSONRoom): number {
  const roomShapeString = jsonRoom.$.shape;
  const roomShapeNumber = parseIntSafe(roomShapeString);
  if (roomShapeNumber === undefined) {
    fatalError(
      `Failed to parse the "shape" field of a custom stage room: ${roomShapeString}`,
    );
  }
  const roomShape = roomShapeNumber as RoomShape;

  let doorSlotFlags = 0;

  for (const door of jsonRoom.door) {
    const existsString = door.$.exists;
    if (existsString !== "True" && existsString !== "False") {
      fatalError(
        `Failed to parse the "exists" field of a custom stage room door: ${existsString}`,
      );
    }

    if (existsString === "False") {
      continue;
    }

    const xString = door.$.x;
    const x = parseIntSafe(xString);
    if (x === undefined) {
      fatalError(
        `Failed to parse the "x" field of a custom stage room door: ${xString}`,
      );
    }

    const yString = door.$.y;
    const y = parseIntSafe(yString);
    if (y === undefined) {
      fatalError(
        `Failed to parse the "y" field of a custom stage room door: ${yString}`,
      );
    }

    const doorSlot = getRoomShapeDoorSlot(roomShape, x, y);
    if (doorSlot === undefined) {
      fatalError(
        `Failed to retrieve the door slot for a custom stage room door at coordinates: [${x}, ${y}]`,
      );
    }

    const doorSlotFlag = doorSlotToDoorSlotFlag(doorSlot);
    doorSlotFlags = addFlag(doorSlotFlags, doorSlotFlag);
  }

  return doorSlotFlags;
}

/** This is copied from `isaacscript-common`. */
function getRoomShapeDoorSlot(
  roomShape: RoomShape,
  x: number,
  y: number,
): DoorSlot | undefined {
  // The type assertion is necessary for some reason.
  const doorSlotCoordinates = ROOM_SHAPE_TO_DOOR_SLOT_COORDINATES[
    roomShape
  ] as Record<DoorSlot, readonly [x: number, y: number]>;

  for (const [doorSlotString, coordinates] of Object.entries(
    doorSlotCoordinates,
  )) {
    const doorSlot = parseIntSafe(doorSlotString) as DoorSlot;
    const [doorX, doorY] = coordinates;
    if (x === doorX && y === doorY) {
      return doorSlot;
    }
  }

  return undefined;
}

/** This is copied from `isaacscript-common`. */
function doorSlotToDoorSlotFlag(doorSlot: DoorSlot): DoorSlotFlag {
  return DOOR_SLOT_TO_DOOR_SLOT_FLAG[doorSlot];
}

/** This is copied from `isaacscript-common`. */
function addFlag(flags: number, ...flagsToAdd: readonly number[]): number {
  for (const flagToAdd of flagsToAdd) {
    flags |= flagToAdd; // eslint-disable-line no-bitwise,no-param-reassign
  }

  return flags;
}
