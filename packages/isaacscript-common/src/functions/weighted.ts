import type { WeightedArray } from "../types/WeightedArray";
import { sumArray } from "./array";
import { getRandomFloat } from "./random";
import { assertDefined } from "./utils";

/**
 * Get a random value from a `WeightedArray`. (A `WeightedArray` is an array of tuples, where the
 * first element in the tuple is a value, and the second element in the tuple is a float
 * corresponding to the value's weight.)
 *
 * If you want to get an unseeded element, you must explicitly pass `undefined` to the `seedOrRNG`
 * parameter.
 *
 * @param weightedArray The array to pick from.
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 */
export function getRandomFromWeightedArray<T>(
  weightedArray: Readonly<WeightedArray<T>>,
  seedOrRNG: Seed | RNG | undefined,
): T {
  const randomIndex = getRandomIndexFromWeightedArray(weightedArray, seedOrRNG);

  const randomElement = weightedArray[randomIndex];
  assertDefined(
    randomElement,
    `Failed to get an element from a weighted array using a random index of: ${randomIndex}`,
  );

  return randomElement[0];
}

/**
 * Get a random index from a `WeightedArray`. (A `WeightedArray` is an array of tuples, where the
 * first element in the tuple is a value, and the second element in the tuple is a float
 * corresponding to the value's weight.)
 *
 * If you want to get an unseeded index, you must explicitly pass `undefined` to the `seedOrRNG`
 * parameter.
 *
 * @param weightedArray The array to pick from.
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 */
export function getRandomIndexFromWeightedArray<T>(
  weightedArray: Readonly<WeightedArray<T>>,
  seedOrRNG: Seed | RNG | undefined,
): int {
  if (weightedArray.length === 0) {
    error(
      "Failed to get a random index from a weighted array since the provided array was empty.",
    );
  }

  const weights = weightedArray.map((tuple) => tuple[1]);
  const totalWeight = sumArray(weights);
  const randomWeight = getRandomFloat(0, totalWeight, seedOrRNG);

  let weightAccumulator = 0;
  for (const [i, tuple] of weightedArray.entries()) {
    const [_element, weight] = tuple;

    weightAccumulator += weight;
    if (weightAccumulator >= randomWeight) {
      return i;
    }
  }

  error("Failed to get a random index from a weighted array.");
}
