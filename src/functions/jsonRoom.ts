import { JSONRoom } from "../types/JSONRoom";
import { sumArray } from "./array";
import { log } from "./log";
import { getRandomFloat } from "./random";
import { getRandomSeed } from "./rng";

export function getJSONRoomOfVariant(
  jsonRooms: JSONRoom[],
  variant: int,
): JSONRoom | undefined {
  const jsonRoomsOfVariant = jsonRooms.filter((jsonRoom) => {
    const roomVariantString = jsonRoom.$.variant;
    const roomVariant = tonumber(roomVariantString);
    return roomVariant === variant;
  });

  // The room variant acts as an ID for the room
  // We assume that there should only be a single room per variant
  if (jsonRoomsOfVariant.length === 0) {
    return undefined;
  }

  if (jsonRoomsOfVariant.length === 1) {
    return jsonRoomsOfVariant[0];
  }

  return error(
    `Found ${jsonRoomsOfVariant.length} JSON rooms with a variant of ${variant}, when there should only be 1.`,
  );
}

export function getJSONRoomsOfSubType(
  jsonRooms: JSONRoom[],
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
 */
export function getRandomJSONRoom(
  jsonRooms: JSONRoom[],
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

function getTotalWeightOfJSONRooms(jsonRooms: JSONRoom[]) {
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
  jsonRooms: JSONRoom[],
  chosenWeight: float,
) {
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

  return error(`Failed to get a JSON room with chosen weight: ${chosenWeight}`);
}
