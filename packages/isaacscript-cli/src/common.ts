// These are functions copied from `isaacscript-common`.

import { DoorSlot } from "./enums/DoorSlot";
import { DoorSlotFlag } from "./enums/DoorSlotFlag";
import { RoomShape } from "./enums/RoomShape";
import { JSONRoom } from "./interfaces/copied/JSONRoomsFile";
import { DOOR_SLOT_TO_DOOR_SLOT_FLAG } from "./objects/doorSlotToDoorSlotFlag";
import { ROOM_SHAPE_TO_DOOR_SLOT_COORDINATES } from "./objects/roomShapeDoorSlotCoordinates";
import { error, parseIntSafe } from "./utils";

export function getJSONRoomDoorSlotFlags(jsonRoom: JSONRoom): number {
  const roomShapeString = jsonRoom.$.shape;
  const roomShapeNumber = parseIntSafe(roomShapeString);
  if (Number.isNaN(roomShapeNumber)) {
    error(
      `Failed to parse the "shape" property of a custom stage room: ${roomShapeString}`,
    );
  }
  const roomShape = roomShapeNumber as RoomShape;

  let doorSlotFlags = 0;

  for (const door of jsonRoom.door) {
    const existsString = door.$.exists;
    if (existsString !== "True" && existsString !== "False") {
      error(
        `Failed to parse the "exists" property of a custom stage room door: ${existsString}`,
      );
    }

    if (existsString === "False") {
      continue;
    }

    const xString = door.$.x;
    const x = parseIntSafe(xString);
    if (Number.isNaN(x)) {
      error(
        `Failed to parse the "x" property of a custom stage room door: ${xString}`,
      );
    }

    const yString = door.$.y;
    const y = parseIntSafe(yString);
    if (Number.isNaN(y)) {
      error(
        `Failed to parse the "y" property of a custom stage room door: ${yString}`,
      );
    }

    const doorSlot = getRoomShapeDoorSlot(roomShape, x, y);
    if (doorSlot === undefined) {
      error(
        `Failed to retrieve the door slot for a custom stage room door at coordinates: [${x}, ${y}]`,
      );
    }

    const doorSlotFlag = doorSlotToDoorSlotFlag(doorSlot);
    doorSlotFlags = addFlag(doorSlotFlags, doorSlotFlag);
  }

  return doorSlotFlags;
}

function getRoomShapeDoorSlot(
  roomShape: RoomShape,
  x: number,
  y: number,
): DoorSlot | undefined {
  const coordinatesMap = ROOM_SHAPE_TO_DOOR_SLOT_COORDINATES[roomShape];
  for (const [doorSlot, [doorX, doorY]] of coordinatesMap.entries()) {
    if (x === doorX && y === doorY) {
      return doorSlot;
    }
  }

  return undefined;
}

function doorSlotToDoorSlotFlag(doorSlot: DoorSlot): DoorSlotFlag {
  return DOOR_SLOT_TO_DOOR_SLOT_FLAG[doorSlot];
}

function addFlag(flags: number, ...flagsToAdd: number[]): number {
  for (const flagToAdd of flagsToAdd) {
    flags |= flagToAdd; // eslint-disable-line no-bitwise,no-param-reassign
  }

  return flags;
}
