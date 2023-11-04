import { sumArray } from "../../../../functions/array";
import { log } from "../../../../functions/log";
import { getRandomFloat } from "../../../../functions/random";
import type {
  CustomStageBossPoolEntry,
  CustomStageRoomMetadata,
} from "../../../../interfaces/CustomStageTSConfig";

/**
 * Helper function to get a random custom stage room from an array of custom stage rooms.
 *
 * Note that this function does not simply choose a random element in the provided array; it will
 * properly account for each room weight using the algorithm from:
 * https://stackoverflow.com/questions/1761626/weighted-random-numbers
 */
export function getRandomCustomStageRoom(
  roomsMetadata: readonly CustomStageRoomMetadata[],
  seedOrRNG: Seed | RNG | undefined,
  verbose = false,
): CustomStageRoomMetadata {
  const totalWeight = getTotalWeightOfCustomStageRooms(roomsMetadata);
  if (verbose) {
    log(`Total weight of the custom stage rooms provided: ${totalWeight}`);
  }

  const chosenWeight = getRandomFloat(0, totalWeight, seedOrRNG);
  if (verbose) {
    log(`Randomly chose weight for custom stage room: ${chosenWeight}`);
  }

  return getCustomStageRoomWithChosenWeight(roomsMetadata, chosenWeight);
}

function getTotalWeightOfCustomStageRooms(
  roomsMetadata: readonly CustomStageRoomMetadata[],
): float {
  const weights = roomsMetadata.map((roomMetadata) => roomMetadata.weight);
  return sumArray(weights);
}

function getCustomStageRoomWithChosenWeight(
  roomsMetadata: readonly CustomStageRoomMetadata[],
  chosenWeight: float,
): CustomStageRoomMetadata {
  for (const roomMetadata of roomsMetadata) {
    if (chosenWeight < roomMetadata.weight) {
      return roomMetadata;
    }

    chosenWeight -= roomMetadata.weight;
  }

  error(
    `Failed to get a custom stage room with chosen weight: ${chosenWeight}`,
  );
}

export function getRandomBossRoomFromPool(
  roomsMetadata: readonly CustomStageRoomMetadata[],
  bossPool: readonly CustomStageBossPoolEntry[],
  seedOrRNG: Seed | RNG | undefined,
  verbose = false,
): CustomStageRoomMetadata {
  const totalWeight = getTotalWeightOfBossPool(bossPool);
  if (verbose) {
    log(`Total weight of the custom stage boss pool provided: ${totalWeight}`);
  }

  const chosenWeight = getRandomFloat(0, totalWeight, seedOrRNG);
  if (verbose) {
    log(`Randomly chose weight for custom stage boss pool: ${chosenWeight}`);
  }

  const bossEntry = getBossEntryWithChosenWeight(bossPool, chosenWeight);

  const roomsMetadataForBoss = roomsMetadata.filter(
    (roomMetadata) => roomMetadata.subType === bossEntry.subType,
  );
  return getRandomCustomStageRoom(roomsMetadataForBoss, seedOrRNG, verbose);
}

function getTotalWeightOfBossPool(
  bossPool: readonly CustomStageBossPoolEntry[],
): float {
  const weights = bossPool.map((bossEntry) => bossEntry.weight);
  return sumArray(weights);
}

function getBossEntryWithChosenWeight(
  bossPool: readonly CustomStageBossPoolEntry[],
  chosenWeight: float,
): CustomStageBossPoolEntry {
  for (const bossEntry of bossPool) {
    if (chosenWeight < bossEntry.weight) {
      return bossEntry;
    }

    chosenWeight -= bossEntry.weight;
  }

  error(
    `Failed to get a custom stage boss entry with chosen weight: ${chosenWeight}`,
  );
}
