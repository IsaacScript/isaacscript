import type { DoorSlotFlag } from "isaac-typescript-definitions";
import { DoorSlotFlagZero, RoomShape } from "isaac-typescript-definitions";
import type { JSONEntity, JSONRoom } from "../interfaces/JSONRoomsFile";
import { sumArray } from "./array";
import { doorSlotToDoorSlotFlag, getRoomShapeDoorSlot } from "./doors";
import { isEnumValue } from "./enums";
import { addFlag } from "./flag";
import { log } from "./log";
import { getRandomFloat } from "./random";
import { parseIntSafe } from "./types";
import { assertDefined } from "./utils";

/** This represents either a `JSONRoom` or a `JSONEntity`. */
interface JSONObject {
  $: { weight: string | undefined };
}

/**
 * Helper function to calculate what the resulting `BitFlags<DoorSlotFlag>` value would be for a
 * given JSON room.
 *
 * (A JSON room is an XML file converted to JSON so that it can be directly imported into your mod.)
 */
export function getJSONRoomDoorSlotFlags(
  jsonRoom: JSONRoom,
): BitFlags<DoorSlotFlag> {
  const roomShapeString = jsonRoom.$.shape;
  const roomShape = parseIntSafe(roomShapeString);
  assertDefined(
    roomShape,
    `Failed to parse the "shape" field of a JSON room: ${roomShapeString}`,
  );

  if (!isEnumValue(roomShape, RoomShape)) {
    error(
      `Failed to parse the "shape" field of a JSON room since it was an invalid number: ${roomShape}`,
    );
  }

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
    const x = parseIntSafe(xString);
    assertDefined(
      x,
      `Failed to parse the "x" field of a JSON room door: ${xString}`,
    );

    const yString = door.$.y;
    const y = parseIntSafe(yString);
    assertDefined(
      y,
      `Failed to parse the "y" field of a JSON room door: ${yString}`,
    );

    const doorSlot = getRoomShapeDoorSlot(roomShape, x, y);
    assertDefined(
      doorSlot,
      `Failed to retrieve the door slot for a JSON room door at coordinates: [${x}, ${y}]`,
    );

    const doorSlotFlag = doorSlotToDoorSlotFlag(doorSlot);
    doorSlotFlags = addFlag(doorSlotFlags, doorSlotFlag);
  }

  return doorSlotFlags;
}

/**
 * Helper function to find a specific room from an array of JSON rooms.
 *
 * (A JSON room is an XML file converted to JSON so that it can be directly imported into your mod.)
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
    const roomVariant = parseIntSafe(roomVariantString);
    if (roomVariant === undefined) {
      error(
        `Failed to convert a JSON room variant to an integer: ${roomVariantString}`,
      );
    }

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
 * (A JSON room is an XML file converted to JSON so that it can be directly imported into your mod.)
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
    const roomSubType = parseIntSafe(roomSubTypeString);
    if (roomSubType === undefined) {
      error(
        `Failed to convert a JSON room sub-type to an integer: ${roomSubTypeString}`,
      );
    }

    return roomSubType === subType;
  });
}

/**
 * Helper function to get a random JSON entity from an array of JSON entities.
 *
 * (A JSON entity is an entity inside of a JSON room. A JSON room is an XML file converted to JSON
 * so that it can be directly imported into your mod.)
 *
 * Note that this function does not simply choose a random element in the provided array; it will
 * properly account for each room weight using the algorithm from:
 * https://stackoverflow.com/questions/1761626/weighted-random-numbers
 *
 * If you want an unseeded entity, you must explicitly pass `undefined` to the `seedOrRNG`
 * parameter.
 *
 * @param jsonEntities The array of entities to randomly choose between.
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 * @param verbose Optional. If specified, will write entries to the "log.txt" file that describe
 *                what the function is doing. Default is false.
 */
export function getRandomJSONEntity(
  jsonEntities: JSONEntity[],
  seedOrRNG: Seed | RNG | undefined,
  verbose = false,
): JSONEntity {
  const totalWeight = getTotalWeightOfJSONObject(jsonEntities);
  if (verbose) {
    log(`Total weight of the JSON entities provided: ${totalWeight}`);
  }

  const chosenWeight = getRandomFloat(0, totalWeight, seedOrRNG);
  if (verbose) {
    log(`Randomly chose weight for JSON entity: ${chosenWeight}`);
  }

  const randomJSONEntity = getJSONObjectWithChosenWeight(
    jsonEntities,
    chosenWeight,
  );
  assertDefined(
    randomJSONEntity,
    `Failed to get a JSON entity with chosen weight: ${chosenWeight}`,
  );

  return randomJSONEntity;
}

/**
 * Helper function to get a random JSON room from an array of JSON rooms.
 *
 * (A JSON room is an XML file converted to JSON so that it can be directly imported into your mod.)
 *
 * Note that this function does not simply choose a random element in the provided array; it will
 * properly account for each room weight using the algorithm from:
 * https://stackoverflow.com/questions/1761626/weighted-random-numbers
 *
 * If you want an unseeded room, you must explicitly pass `undefined` to the `seedOrRNG` parameter.
 *
 * @param jsonRooms The array of rooms to randomly choose between.
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 * @param verbose Optional. If specified, will write entries to the "log.txt" file that describe
 *                what the function is doing. Default is false.
 */
export function getRandomJSONRoom(
  jsonRooms: JSONRoom[],
  seedOrRNG: Seed | RNG | undefined,
  verbose = false,
): JSONRoom {
  const totalWeight = getTotalWeightOfJSONObject(jsonRooms);
  if (verbose) {
    log(`Total weight of the JSON rooms provided: ${totalWeight}`);
  }

  const chosenWeight = getRandomFloat(0, totalWeight, seedOrRNG);
  if (verbose) {
    log(`Randomly chose weight for JSON room: ${chosenWeight}`);
  }

  const randomJSONRoom = getJSONObjectWithChosenWeight(jsonRooms, chosenWeight);
  assertDefined(
    randomJSONRoom,
    `Failed to get a JSON room with chosen weight: ${chosenWeight}`,
  );

  return randomJSONRoom;
}

function getTotalWeightOfJSONObject(jsonOjectArray: JSONObject[]): float {
  const weights = jsonOjectArray.map((jsonObject) => {
    const weightString = jsonObject.$.weight;
    const weight = tonumber(weightString);
    assertDefined(
      weight,
      `Failed to parse the weight of a JSON object: ${weightString}.`,
    );

    return weight;
  });

  return sumArray(weights);
}

function getJSONObjectWithChosenWeight<T extends JSONObject>(
  jsonOjectArray: T[],
  chosenWeight: float,
): T | undefined {
  let weightAccumulator = 0;

  for (const jsonObject of jsonOjectArray) {
    const weightString = jsonObject.$.weight;
    const weight = tonumber(weightString);
    assertDefined(
      weight,
      `Failed to parse the weight of a JSON object: ${weightString}`,
    );

    weightAccumulator += weight;
    if (weightAccumulator >= chosenWeight) {
      return jsonObject;
    }
  }

  return undefined;
}
