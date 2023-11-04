import type {
  CopyableIsaacAPIClassType,
  Direction,
} from "isaac-typescript-definitions";
import { SerializationBrand } from "../enums/private/SerializationBrand";
import { angleToDirection } from "./direction";
import { isIsaacAPIClassOfType, isaacAPIClassEquals } from "./isaacAPIClass";
import { getRandomFloat } from "./random";
import { isRNG, newRNG } from "./rng";
import {
  copyUserdataValuesToTable,
  getNumbersFromTable,
  tableHasKeys,
} from "./table";
import { isTable } from "./types";
import { assertDefined } from "./utils";

export type SerializedVector = LuaMap<string, unknown> & {
  readonly __serializedVectorBrand: symbol;
  readonly __kind: CopyableIsaacAPIClassType.VECTOR;
};

const OBJECT_NAME = "Vector";
const KEYS = ["X", "Y"] as const;

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

  assertDefined(
    x,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: X`,
  );
  assertDefined(
    y,
    `Failed to deserialize a ${OBJECT_NAME} object since the provided object did not have a value for: Y`,
  );

  return Vector(x, y);
}

/**
 * Helper function to measure a vector to see if it has a non-zero length using a threshold to
 * ignore extremely small values.
 *
 * Use this function instead of explicitly checking if the length is 0 because vectors in the game
 * are unlikely to ever be exactly set to 0. Instead, they will always have some miniscule length.
 *
 * @param vector The vector to measure.
 * @param threshold Optional. The threshold from 0 to consider to be a non-zero vector. Default is
 *                  0.01.
 */
export function doesVectorHaveLength(
  vector: Vector,
  threshold = 0.01,
): boolean {
  return vector.Length() >= threshold;
}

/**
 * Given an array of vectors, this helper function returns the closest one to a provided reference
 * vector.
 *
 * @param referenceVector The vector to compare against.
 * @param vectors The array of vectors to look through.
 */
export function getClosestVectorTo(
  referenceVector: Vector,
  vectors: Vector[],
): Vector | undefined {
  let closestVector: Vector | undefined;
  let closestDistance = math.huge;
  for (const vector of vectors) {
    const distance = referenceVector.Distance(vector);

    if (distance < closestDistance) {
      closestVector = vector;
      closestDistance = distance;
    }
  }

  return closestVector;
}

/**
 * Helper function to get a random vector between (-1, -1) and (1, 1).
 *
 * To get random vectors with a bigger length, multiply this with a number.
 *
 * Use this over the `RandomVector` function when you need the vector to be seeded.
 *
 * If you want to generate an unseeded vector, you must explicitly pass `undefined` to the
 * `seedOrRNG` parameter.
 *
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 */
export function getRandomVector(
  seedOrRNG: Seed | RNG | undefined,
): Readonly<Vector> {
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

/**
 * Helper function to compare two vectors for equality.
 *
 * This function is useful because vectors are not directly comparable. In other words, `Vector(1.2)
 * === Vector(1.2)` will be equal to false.
 */
export function vectorEquals(vector1: Vector, vector2: Vector): boolean {
  return isaacAPIClassEquals(vector1, vector2, KEYS);
}

/** Helper function for finding out which way a vector is pointing. */
export function vectorToDirection(vector: Vector): Direction {
  const angleDegrees = vector.GetAngleDegrees();
  return angleToDirection(angleDegrees);
}

/**
 * Helper function to convert a vector to a string.
 *
 * @param vector The vector to convert.
 * @param round Optional. If true, will round the vector values to the nearest integer. Default is
 *              false.
 */
export function vectorToString(vector: Vector, round = false): string {
  const x = round ? Math.round(vector.X) : vector.X;
  const y = round ? Math.round(vector.Y) : vector.Y;
  return `(${x}, ${y})`;
}
