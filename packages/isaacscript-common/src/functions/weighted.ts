import { WeightedArray } from "../types/WeightedArray";
import { sumArray } from "./array";
import { getRandomFloat } from "./random";
import { getRandomSeed } from "./rng";

/**
 * Get a random value from a `WeightedArray`. (A `WeightedArray` is an array of tuples, where the
 * first element in the tuple is a value, and the second element in the tuple is a float
 * corresponding to the value's weight.)
 */
export function getRandomFromWeightedArray<T>(
  weightedArray: WeightedArray<T>,
  seedOrRNG: Seed | RNG = getRandomSeed(),
): T {
  const randomIndex = getRandomIndexFromWeightedArray(weightedArray, seedOrRNG);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const randomElement = weightedArray[randomIndex]!;
  return randomElement[0];
}

/**
 * Get a random index from a `WeightedArray`. (A `WeightedArray` is an array of tuples, where the
 * first element in the tuple is a value, and the second element in the tuple is a float
 * corresponding to the value's weight.)
 */
export function getRandomIndexFromWeightedArray<T>(
  weightedArray: WeightedArray<T>,
  seedOrRNG: Seed | RNG = getRandomSeed(),
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
  for (let i = 0; i < weightedArray.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tuple = weightedArray[i]!;
    const [_element, weight] = tuple;

    weightAccumulator += weight;
    if (weightAccumulator >= randomWeight) {
      return i;
    }
  }

  error("Failed to get a random index from a weighted array.");
}
