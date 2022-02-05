import { JSONRoom } from "../types/JSONRoom";
import { log } from "./log";
import { getRandomFloat } from "./random";

export function getJSONRoomOfVariant(
  jsonRooms: JSONRoom[],
  variant: int,
): JSONRoom | undefined {
  for (const jsonRoom of jsonRooms) {
    const roomVariantString = jsonRoom.$.variant;
    const roomVariant = tonumber(roomVariantString);
    if (roomVariant === variant) {
      return jsonRoom;
    }
  }

  return undefined;
}

export function getJSONRoomsOfSubType(
  jsonRooms: JSONRoom[],
  subType: int,
): JSONRoom[] {
  const jsonRoomsOfSubType: JSONRoom[] = [];
  for (const jsonRoom of jsonRooms) {
    const roomSubTypeString = jsonRoom.$.subtype;
    const roomSubType = tonumber(roomSubTypeString);
    if (roomSubType === subType) {
      jsonRoomsOfSubType.push(jsonRoom);
    }
  }

  return jsonRoomsOfSubType;
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
  seed = Random(),
  verbose = false,
): JSONRoom {
  const totalWeight = getTotalWeightOfJSONRooms(jsonRooms);
  if (verbose) {
    log(`Total weight of the JSON rooms provided: ${totalWeight}`);
  }

  const chosenWeight = getRandomFloat(0, totalWeight, seed);
  if (verbose) {
    log(`Randomly chose weight: ${chosenWeight}`);
  }

  return getJSONRoomWithChosenWeight(jsonRooms, chosenWeight);
}

function getTotalWeightOfJSONRooms(jsonRooms: JSONRoom[]) {
  let totalWeight = 0;

  for (const jsonRoom of jsonRooms) {
    const roomWeightString = jsonRoom.$.weight;
    const roomWeight = tonumber(roomWeightString);
    if (roomWeight === undefined) {
      error(`Failed to parse the weight of a room: ${roomWeightString}.`);
    }

    totalWeight += roomWeight;
  }

  return totalWeight;
}

function getJSONRoomWithChosenWeight(
  jsonRooms: JSONRoom[],
  chosenWeight: float,
) {
  for (const jsonRoom of jsonRooms) {
    const roomWeightString = jsonRoom.$.weight;
    const roomWeight = tonumber(roomWeightString);
    if (roomWeight === undefined) {
      error(`Failed to parse the weight of a room: ${roomWeightString}`);
    }

    if (chosenWeight < roomWeight) {
      return jsonRoom;
    }

    chosenWeight -= roomWeight;
  }

  return error(`Failed to get a room with chosen weight: ${chosenWeight}`);
}
