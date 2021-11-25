import { JSONRoom } from "../types/JSONRoom";
import { getRandomFloat } from "./random";

export function getJSONRoomOfVariant(
  jsonRooms: JSONRoom[],
  variant: int,
): JSONRoom | null {
  for (const jsonRoom of jsonRooms) {
    const roomVariantString = jsonRoom.$.variant;
    const roomVariant = tonumber(roomVariantString);
    if (roomVariant === variant) {
      return jsonRoom;
    }
  }

  return null;
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

export function getRandomJSONRoom(
  jsonRooms: JSONRoom[],
  seed = Random(),
): JSONRoom {
  // Since each room has an individual weight, we need to get a random weighted selection
  // Algorithm from: https://stackoverflow.com/questions/1761626/weighted-random-numbers
  const totalWeight = getTotalWeightOfJSONRooms(jsonRooms);
  const chosenWeight = getRandomFloat(0, totalWeight, seed);
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

  error(`Failed to get a room with chosen weight: ${chosenWeight}`);
  return jsonRooms[0];
}
