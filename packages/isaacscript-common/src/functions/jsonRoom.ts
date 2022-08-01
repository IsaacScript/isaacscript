import {
  DoorSlotFlag,
  DoorSlotFlagZero,
  RoomShape,
} from "isaac-typescript-definitions";
import { JSONRoom } from "../interfaces/JSONRoomsFile";
import { sumArray } from "./array";
import { doorSlotToDoorSlotFlag, getRoomShapeDoorSlot } from "./doors";
import { addFlag } from "./flag";
import { log } from "./log";
import { getRandomFloat } from "./random";
import { getRandomSeed } from "./rng";

/**
 * Helper function to calculate what the resulting `BitFlags<DoorSlotFlag>` value would be for a
 * given JSON room.
 */
export function getJSONRoomDoorSlotFlags(
  jsonRoom: JSONRoom,
): BitFlags<DoorSlotFlag> {
  const roomShapeString = jsonRoom.$.shape;
  const roomShapeNumber = tonumber(roomShapeString);
  if (roomShapeNumber === undefined) {
    error(
      `Failed to parse the "shape" field of a JSON room: ${roomShapeString}`,
    );
  }
  const roomShape = roomShapeNumber as RoomShape;

  let doorSlotFlags = DoorSlotFlagZero;

  for (const door of jsonRoom.door) {
    const existsString = door.$.exists;
    if (existsString !== "True" && existsString !== "False") {
      error(
        `Failed to parse the "exists" field of a JSON room door: ${existsString}`,
      );
    }

    if (existsString === "False") {
      continue;
    }

    const xString = door.$.x;
    const x = tonumber(xString);
    if (x === undefined) {
      error(`Failed to parse the "x" field of a JSON room door: ${xString}`);
    }

    const yString = door.$.y;
    const y = tonumber(yString);
    if (y === undefined) {
      error(`Failed to parse the "y" field of a JSON room door: ${yString}`);
    }

    const doorSlot = getRoomShapeDoorSlot(roomShape, x, y);
    if (doorSlot === undefined) {
      error(
        `Failed to retrieve the door slot for a JSON room door at coordinates: [${x}, ${y}]`,
      );
    }

    const doorSlotFlag = doorSlotToDoorSlotFlag(doorSlot);
    doorSlotFlags = addFlag(doorSlotFlags, doorSlotFlag);
  }

  return doorSlotFlags;
}

/**
 * Helper function to find a specific room from an array of JSON rooms.
 *
 * @param jsonRooms The array of rooms to search through.
 * @param variant The room variant to select. (The room variant can be thought of as the ID of the
 *                room.)
 */
export function getJSONRoomOfVariant(
  jsonRooms: JSONRoom[] | readonly JSONRoom[],
  variant: int,
): JSONRoom | undefined {
  const jsonRoomsOfVariant = jsonRooms.filter((jsonRoom) => {
    const roomVariantString = jsonRoom.$.variant;
    const roomVariant = tonumber(roomVariantString);
    return roomVariant === variant;
  });

  // The room variant acts as an ID for the room. We assume that there should only be a single room
  // per variant.
  if (jsonRoomsOfVariant.length === 0) {
    return undefined;
  }

  if (jsonRoomsOfVariant.length === 1) {
    return jsonRoomsOfVariant[0];
  }

  error(
    `Found ${jsonRoomsOfVariant.length} JSON rooms with a variant of ${variant}, when there should only be 1.`,
  );
}

/**
 * Helper function to find all of the JSON rooms that match the sub-type provided.
 *
 * @param jsonRooms The array of rooms to search through.
 * @param subType The sub-type to match.
 */
export function getJSONRoomsOfSubType(
  jsonRooms: JSONRoom[] | readonly JSONRoom[],
  subType: int,
): JSONRoom[] {
  return jsonRooms.filter((jsonRoom) => {
    const roomSubTypeString = jsonRoom.$.subtype;
    const roomSubType = tonumber(roomSubTypeString);
    return roomSubType === subType;
  });
}

/**
 * Helper function to get a random JSON room from an array of JSON rooms.
 *
 * Note that this function does not simply choose a random element in the provided array; it will
 * properly account for each room weight using the algorithm from:
 * https://stackoverflow.com/questions/1761626/weighted-random-numbers
 *
 * @param jsonRooms The array of rooms to random choose between.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param verbose Optional. If specified, will write entries to the "log.txt" file that describe
 *                what the function is doing. Default is false.
 */
export function getRandomJSONRoom(
  jsonRooms: JSONRoom[] | readonly JSONRoom[],
  seedOrRNG: Seed | RNG = getRandomSeed(),
  verbose = false,
): JSONRoom {
  const totalWeight = getTotalWeightOfJSONRooms(jsonRooms);
  if (verbose) {
    log(`Total weight of the JSON rooms provided: ${totalWeight}`);
  }

  const chosenWeight = getRandomFloat(0, totalWeight, seedOrRNG);
  if (verbose) {
    log(`Randomly chose weight for JSON room: ${chosenWeight}`);
  }

  return getJSONRoomWithChosenWeight(jsonRooms, chosenWeight);
}

function getTotalWeightOfJSONRooms(
  jsonRooms: JSONRoom[] | readonly JSONRoom[],
): float {
  const weights = jsonRooms.map((jsonRoom) => {
    const roomWeightString = jsonRoom.$.weight;
    const roomWeight = tonumber(roomWeightString);
    if (roomWeight === undefined) {
      error(`Failed to parse the weight of a JSON room: ${roomWeightString}.`);
    }
    return roomWeight;
  });

  return sumArray(weights);
}

function getJSONRoomWithChosenWeight(
  jsonRooms: JSONRoom[] | readonly JSONRoom[],
  chosenWeight: float,
): JSONRoom {
  for (const jsonRoom of jsonRooms) {
    const roomWeightString = jsonRoom.$.weight;
    const roomWeight = tonumber(roomWeightString);
    if (roomWeight === undefined) {
      error(`Failed to parse the weight of a JSON room: ${roomWeightString}`);
    }

    if (chosenWeight < roomWeight) {
      return jsonRoom;
    }

    chosenWeight -= roomWeight;
  }

  error(`Failed to get a JSON room with chosen weight: ${chosenWeight}`);
}
