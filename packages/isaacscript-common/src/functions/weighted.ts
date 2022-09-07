import { WeightedArray } from "../types/WeightedArray";
import { arrayToString, sumArray } from "./array";
import { getRandomFloat } from "./random";

/** Get a random value from a `WeightedArray`. (The second element in the array is the weight.) */
export function getRandomFromWeightedArray<T>(
  weightedArray: WeightedArray<T>,
): T {
  if (weightedArray.length === 0) {
    error(
      "Failed to get a random element from a weighted array since the provided array was empty.",
    );
  }

  const weights = weightedArray.map((tuple) => tuple[1]);
  const totalWeight = sumArray(weights);
  const randomWeight = getRandomFloat(0, totalWeight);

  let countNumber = 0;
  for (const value of weightedArray) {
    countNumber += value[1];
    if (countNumber >= randomWeight) {
      return value[0];
    }
  }

  error(
    `Failed to get a random element from a weighted array: ${arrayToString(
      weightedArray,
    )}`,
  );
}
