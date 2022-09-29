import {
  CopyableIsaacAPIClassType,
  Direction,
} from "isaac-typescript-definitions";
import { SerializationBrand } from "../enums/SerializationBrand";
import { angleToDirection } from "./direction";
import { isaacAPIClassEquals, isIsaacAPIClassOfType } from "./isaacAPIClass";
import { getRandomFloat } from "./random";
import { getRandomSeed, isRNG, newRNG } from "./rng";
import {
  copyUserdataValuesToTable,
  getNumbersFromTable,
  tableHasKeys,
} from "./table";
import { isTable } from "./types";

export type SerializedVector = LuaMap<string, unknown> & {
  readonly __serializedVectorBrand: symbol;
  readonly __kind: CopyableIsaacAPIClassType.VECTOR;
};

const OBJECT_NAME = "Vector";
const KEYS = ["X", "Y"];

/** Helper function to copy a `Vector` Isaac API class. */
export function copyVector(vector: Vector): Vector {
  if (!isVector(vector)) {
    error(
      `Failed to copy a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
    );
  }

  return Vector(vector.X, vector.Y);
}

/**
 * Helper function to convert a `SerializedVector` object to a normal `RNG` object. (This is used by
 * the save data manager when reading data from the "save#.dat" file.)
 */
export function deserializeVector(vector: SerializedVector): Vector {
  if (!isTable(vector)) {
    error(
      `Failed to deserialize a ${OBJECT_NAME} object since the provided object was not a Lua table.`,
    );
  }

  const [x, y] = getNumbersFromTable(vector, OBJECT_NAME, ...KEYS);

  if (x === undefined) {
    error(
      `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: X`,
    );
  }
  if (y === undefined) {
    error(
      `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: Y`,
    );
  }

  return Vector(x, y);
}

/**
 * Helper function to get a random vector between (-1, -1) and (1, 1).
 *
 * To get random vectors with a bigger length, multiply this with a number.
 *
 * Use this over the `RandomVector` function when you need the vector to be seeded.
 *
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 */
export function getRandomVector(
  seedOrRNG: Seed | RNG = getRandomSeed(),
): Vector {
  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

  const x = getRandomFloat(-1, 1, rng);
  const y = getRandomFloat(-1, 1, rng);

  return Vector(x, y);
}

/**
 * Used to determine is the given table is a serialized `Vector` object created by the `deepCopy`
 * function.
 */
export function isSerializedVector(
  object: unknown,
): object is SerializedVector {
  if (!isTable(object)) {
    return false;
  }

  return tableHasKeys(object, ...KEYS) && object.has(SerializationBrand.VECTOR);
}

/** Helper function to check if something is an instantiated `Vector` object. */
export function isVector(object: unknown): object is Vector {
  return isIsaacAPIClassOfType(object, OBJECT_NAME);
}

/**
 * Helper function to convert a `Vector` object to a `SerializedVector` object. (This is used by the
 * save data manager when writing data from the "save#.dat" file.)
 */
export function serializeVector(vector: Vector): SerializedVector {
  if (!isVector(vector)) {
    error(
      `Failed to serialize a ${OBJECT_NAME} object since the provided object was not a userdata ${OBJECT_NAME} class.`,
    );
  }

  const vectorTable = new LuaMap<string, unknown>();
  copyUserdataValuesToTable(vector, KEYS, vectorTable);
  vectorTable.set(SerializationBrand.VECTOR, "");
  return vectorTable as SerializedVector;
}

export function vectorEquals(vector1: Vector, vector2: Vector): boolean {
  return isaacAPIClassEquals(vector1, vector2, KEYS);
}

/** Helper function for finding out which way a vector is pointing. */
export function vectorToDirection(vector: Vector): Direction {
  const angleDegrees = vector.GetAngleDegrees();
  return angleToDirection(angleDegrees);
}

export function vectorToString(vector: Vector, round = false): string {
  const x = round ? Math.round(vector.X) : vector.X;
  const y = round ? Math.round(vector.Y) : vector.Y;
  return `(${x}, ${y})`;
}
