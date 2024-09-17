import type { CopyableIsaacAPIClassType } from "isaac-typescript-definitions";
import { game } from "../core/cachedClasses";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import type { ReadonlyRecord } from "../types/ReadonlyRecord";
import { traceback } from "./debugFunctions";
import { isaacAPIClassEquals, isIsaacAPIClassOfType } from "./isaacAPIClass";
import { logError } from "./log";
import { getNumbersFromTable, tableHasKeys } from "./table";
import { isTable } from "./types";
import { assertDefined } from "./utils";

export type SerializedRNG = LuaMap<string, unknown> & {
  readonly __serializedRNGBrand: symbol;
  readonly __kind: CopyableIsaacAPIClassType.RNG;
};

/**
 * This is the ShiftIdx that Blade recommended after having reviewing the game's internal functions.
 * Any value between 0 and 80 should work equally well.
 *
 * @see https://www.jstatsoft.org/article/view/v008i14/xorshift.pdf
 */
const RECOMMENDED_SHIFT_IDX = 35;

const OBJECT_NAME = "RNG";
const KEYS = ["seed"] as const;

/** Helper function to copy an `RNG` Isaac API class. */
export function copyRNG(rng: RNG): RNG {
  if (!isRNG(rng)) {
    error(
      `Failed to copy a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
    );
  }

  const seed = rng.GetSeed();
  return newRNG(seed);
}

/**
 * Helper function to convert a `SerializedRNG` object to a normal `RNG` object. (This is used by
 * the save data manager when reading data from the "save#.dat" file.)
 */
export function deserializeRNG(rng: SerializedRNG): RNG {
  if (!isTable(rng)) {
    error(
      `Failed to deserialize a ${OBJECT_NAME} object since the provided object was not a Lua table.`,
    );
  }

  const [seed] = getNumbersFromTable(rng, OBJECT_NAME, ...KEYS);

  assertDefined(
    seed,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: seed`,
  );

  return newRNG(seed as Seed);
}

/**
 * Helper function to get a random `Seed` value to be used in spawning entities and so on. Use this
 * instead of calling the `Random` function directly since that can return a value of 0 and crash
 * the game.
 */
export function getRandomSeed(): Seed {
  const randomNumber = Random(); // eslint-disable-line @typescript-eslint/no-deprecated
  const safeRandomNumber = randomNumber === 0 ? 1 : randomNumber;
  return safeRandomNumber as Seed;
}

/** Helper function to check if something is an instantiated `RNG` object. */
export function isRNG(object: unknown): object is RNG {
  return isIsaacAPIClassOfType(object, OBJECT_NAME);
}

/**
 * Used to determine is the given table is a serialized `RNG` object created by the `deepCopy`
 * function.
 */
export function isSerializedRNG(object: unknown): object is SerializedRNG {
  if (!isTable(object)) {
    return false;
  }

  return tableHasKeys(object, ...KEYS) && object.has(SerializationBrand.RNG);
}

/**
 * Helper function to initialize a new RNG object using Blade's recommended shift index.
 *
 * @param seed Optional. The seed to initialize it with. Default is a random seed.
 */
export function newRNG(seed = getRandomSeed()): RNG {
  const rng = RNG();
  setSeed(rng, seed);
  return rng;
}

export function rngEquals(rng1: RNG, rng2: RNG): boolean {
  return isaacAPIClassEquals(rng1, rng2, KEYS);
}

/**
 * Helper function to convert a `RNG` object to a `SerializedRNG` object. (This is used by the save
 * data manager when writing data from the "save#.dat" file.)
 */
export function serializeRNG(rng: RNG): SerializedRNG {
  if (!isRNG(rng)) {
    error(
      `Failed to serialize a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
    );
  }

  const seed = rng.GetSeed();
  const rngTable = new LuaMap<string, unknown>();
  rngTable.set("seed", seed);
  rngTable.set(SerializationBrand.RNG, "");
  return rngTable as SerializedRNG;
}

/**
 * Helper function to iterate over the provided object and set the seed for all of the values that
 * are RNG objects equal to a particular seed.
 */
export function setAllRNGToSeed(
  object: ReadonlyRecord<string, RNG>,
  seed: Seed,
): void {
  if (!isTable(object)) {
    error(
      `Failed to iterate over the object containing RNG objects since the type of the provided object was: ${typeof object}`,
    );
  }

  let setAtLeastOneSeed = false;
  for (const [_key, value] of object) {
    if (isRNG(value)) {
      setSeed(value, seed);
      setAtLeastOneSeed = true;
    }
  }

  if (!setAtLeastOneSeed) {
    error(
      `Failed to set all RNG objects to seed ${seed} because the parent object did not contain any RNG objects.`,
    );
  }
}

/**
 * Helper function to iterate over the provided object and set the seed for all of the values that
 * are RNG objects equal to the start seed for the current run.
 */
export function setAllRNGToStartSeed(
  object: ReadonlyRecord<string, RNG>,
): void {
  const seeds = game.GetSeeds();
  const startSeed = seeds.GetStartSeed();

  setAllRNGToSeed(object, startSeed);
}

/** Helper function to set a seed to an RNG object using Blade's recommended shift index. */
export function setSeed(rng: RNG, seed: Seed): void {
  if (seed === 0) {
    seed = getRandomSeed();
    logError(
      "Failed to set a RNG object to a seed of 0. Using a random value instead.",
    );
    traceback();
  }

  // The game expects seeds in the range of 1 to 4294967295 (1^32 - 1).
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  rng.SetSeed(seed, RECOMMENDED_SHIFT_IDX);
}
