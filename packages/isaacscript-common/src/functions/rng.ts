import { game } from "../cachedClasses";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { isaacAPIClassEquals, isIsaacAPIClassOfType } from "./isaacAPIClass";
import { getNumbersFromTable, tableHasKeys } from "./table";
import { isTable } from "./types";

type SerializedRNG = LuaTable<string, unknown> & {
  readonly __serializedRNGBrand: symbol;
};

interface CopyRNGReturn {
  [SerializationType.NONE]: RNG;
  [SerializationType.SERIALIZE]: SerializedRNG;
  [SerializationType.DESERIALIZE]: RNG;
}

/**
 * This is the ShiftIdx that Blade recommended after having reviewing the game's internal functions.
 * Any value between 0 and 80 should work equally well.
 * https://www.jstatsoft.org/article/view/v008i14/xorshift.pdf
 */
const RECOMMENDED_SHIFT_IDX = 35;

const KEYS = ["seed"];
const OBJECT_NAME = "RNG";

/**
 * Helper function to copy an `RNG` object.
 *
 * @param rng The RNG object to copy. In the case of deserialization, this will actually be a Lua
 *            table instead of an instantiated RNG class.
 * @param serializationType Default is `SerializationType.NONE`.
 */
export function copyRNG<
  R extends RNG | SerializedRNG,
  S extends SerializationType,
>(rng: R, serializationType: S): CopyRNGReturn[S];
export function copyRNG<R extends RNG | SerializedRNG>(
  rng: R,
): CopyRNGReturn[SerializationType.NONE];
export function copyRNG(
  rng: RNG | SerializedRNG,
  serializationType = SerializationType.NONE,
): CopyRNGReturn[keyof CopyRNGReturn] {
  switch (serializationType) {
    case SerializationType.NONE: {
      if (!isRNG(rng)) {
        error(
          `Failed to copy a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
        );
      }

      const seed = rng.GetSeed();
      return newRNG(seed);
    }

    case SerializationType.SERIALIZE: {
      if (!isRNG(rng)) {
        error(
          `Failed to serialize a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
        );
      }

      const seed = rng.GetSeed();
      const rngTable = new LuaTable<string, unknown>();
      rngTable.set("seed", seed);
      rngTable.set(SerializationBrand.RNG, "");
      return rngTable as SerializedRNG;
    }

    case SerializationType.DESERIALIZE: {
      if (!isTable(rng)) {
        error(
          `Failed to deserialize a ${OBJECT_NAME} object since the provided object was not a Lua table.`,
        );
      }

      const [seedNumber] = getNumbersFromTable(
        rng as LuaTable<string, unknown>,
        OBJECT_NAME,
        ...KEYS,
      );
      const seed = seedNumber as Seed;
      return newRNG(seed);
    }
  }
}

/**
 * Helper function to get a random `Seed` value to be used in spawning entities and so on. Use this
 * instead of calling the `Random` function directly since that can return a value of 0 and crash
 * the game.
 */
export function getRandomSeed(): Seed {
  const randomNumber = Random();
  const safeRandomNumber = randomNumber === 0 ? 1 : randomNumber;
  return safeRandomNumber as Seed;
}

/** Helper function to check if something is an instantiated RNG object. */
export function isRNG(object: unknown): object is RNG {
  return isIsaacAPIClassOfType(object, OBJECT_NAME);
}

/**
 * Used to determine is the given table is a serialized `RNG` object created by the save data
 * manager and/or the `deepCopy` function.
 */
export function isSerializedRNG(object: unknown): object is SerializedRNG {
  if (!isTable(object)) {
    return false;
  }

  return tableHasKeys(object, ...KEYS) && object.has(SerializationBrand.RNG);
}

/**
 * Helper function to initialize an RNG object using Blade's recommended shift index.
 *
 * @param seed The seed to initialize it with. Default is `getRandomSeed()`.
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
 * Helper function to iterate over the provided object and set the seed for all of the values that
 * are RNG objects equal to a particular seed.
 */
export function setAllRNGToSeed(object: unknown, seed: Seed): void {
  if (!isTable(object)) {
    error(
      `Failed to iterate over the object containing RNG objects since the type of the provided object was: ${typeof object}`,
    );
  }

  let setAtLeastOneSeed = false;
  for (const [_key, value] of pairs(object)) {
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
export function setAllRNGToStartSeed(object: unknown): void {
  const seeds = game.GetSeeds();
  const startSeed = seeds.GetStartSeed();

  setAllRNGToSeed(object, startSeed);
}

/** Helper function to set a seed to an RNG object using Blade's recommended shift index. */
export function setSeed(rng: RNG, seed: Seed): void {
  if (seed === 0) {
    error(
      "You cannot set an RNG object to a seed of 0, or the game will crash.",
    );
  }

  // The game expects seeds in the range of 1 to 4294967295 (1^32 - 1).
  rng.SetSeed(seed, RECOMMENDED_SHIFT_IDX);
}
