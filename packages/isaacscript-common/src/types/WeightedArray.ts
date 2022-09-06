import { getRandomInt } from "../functions/random";

/** An array where each element is paired with a number indicating that elements 'weight'. */
export type WeightedArray<Type> = Array<[Type, number]>;

/** Get a random value from the WeightedArray using its weighted properties. */
export function getRandomFromWeightedArray<Type>(
  weightedArray: WeightedArray<Type>,
): Type | undefined {
  let total = 0;
  weightedArray.forEach((value) => {
    total += value[1];
  });
  const randomNumber = getRandomInt(1, total);
  let countNumber = 0;
  for (const value of weightedArray) {
    countNumber += value[1];
    if (countNumber >= randomNumber) {
      return value[0];
    }
  }
  return undefined;
}
