import { SerializationBrand } from "../enums/private/SerializationBrand";
import { SerializationType } from "../enums/SerializationType";
import { ensureAllCases, isUserdataObject } from "./utils";

type SerializedRNG = LuaTable<string, string | number>;

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

/**
 * Helper function to copy an RNG object.
 *
 * @param vector The RNG object to copy. In the case of deserialization, this will actually be a Lua
 * table instead of an instantiated RNG class.
 * @param serializationType Default is `SerializationType.NONE`.
 */
export function copyRNG<
  R extends RNG | SerializedRNG,
  S extends SerializationType,
>(rng: R, serializationType: S): CopyRNGReturn[S];
export function copyRNG(
  rng: RNG | SerializedRNG,
  serializationType = SerializationType.NONE,
): CopyRNGReturn[keyof CopyRNGReturn] {
  switch (serializationType) {
    case SerializationType.NONE: {
      if (!isRNG(rng)) {
        error(
          "Failed to copy an RNG object since the provided object was not a userdata RNG class.",
        );
      }

      const seed = rng.GetSeed();
      return newRNG(seed);
    }

    case SerializationType.SERIALIZE: {
      if (!isRNG(rng)) {
        error(
          "Failed to serialize an RNG object since the provided object was not a userdata RNG class.",
        );
      }

      const seed = rng.GetSeed();
      const rngTable = new LuaTable<string, string | number>();
      rngTable.set("seed", seed);
      rngTable.set(SerializationBrand.RNG, "");
      return rngTable;
    }

    case SerializationType.DESERIALIZE: {
      const rngType = type(rng);
      if (isRNG(rng) || rngType !== "table") {
        error(
          "Failed to deserialize an RNG object since the provided object was not a Lua table.",
        );
      }

      const seedString = rng.get("seed") as string;
      if (seedString === undefined) {
        error('Failed to find the "seed" value of a serialized RNG object.');
      }

      const seedNumber = tonumber(seedString);
      if (seedNumber === undefined) {
        error(
          `Failed to convert the "seed" value of a serialized RNG object to a number: ${seedString}`,
        );
      }

      const seed = seedNumber as Seed;
      return newRNG(seed);
    }

    default: {
      return ensureAllCases(serializationType);
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
  return isUserdataObject(object, "RNG");
}

/**
 * Used to determine is the given table is a serialized Vector created by the save data manager
 * and/or the `deepCopy` function.
 */
export function isSerializedRNG(object: unknown): object is SerializedRNG {
  const objectType = type(object);
  if (objectType !== "table") {
    return false;
  }

  const table = object as LuaTable;
  return table.has(SerializationBrand.RNG) && table.has("seed");
}

/**
 * Helper function to initialize an RNG object.
 *
 * Example:
 * ```ts
 * const startSeed = Game():GetSeeds():GetStartSeed();
 * const rng = initRNG(startSeed);
 * const fiftyFiftyChance = rng.RandomInt(2) === 0;
 * ```
 *
 * It is recommended to not deal with RNG objects directly and instead use seeds, since they are
 * serializable. Also see the `getRandom`, `getRandomInt`, and `getRandomFloat` helper functions.
 *
 * @param seed The seed to initialize it with. Default is `getRandomSeed()`.
 */
export function newRNG(seed = getRandomSeed()): RNG {
  if (seed === 0) {
    error(
      "You cannot initialize an RNG object with a seed of 0, or the game will crash.",
    );
  }

  const rng = RNG();

  // The game expects seeds in the range of 1 to 4294967295
  rng.SetSeed(seed, RECOMMENDED_SHIFT_IDX);

  return rng;
}

/**
 * Helper function to get the next seed value.
 *
 * This function is useful if you are working with data structures that store seed values instead of
 * RNG objects.
 */
export function nextSeed(seed: Seed): Seed {
  const rng = newRNG(seed);
  rng.Next();
  return rng.GetSeed();
}
