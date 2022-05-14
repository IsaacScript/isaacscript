import { getRandomSeed, isRNG, newRNG } from "./rng";

/**
 * This returns a random float between 0 and 1. It is inclusive on the low end, but exclusive on the
 * high end. (This is because the `RNG.RandomFloat` method will never return a value of exactly 1.)
 *
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 * `RNG.Next` method will be called. Default is `getRandomSeed()`.
 */
export function getRandom(seedOrRNG: Seed | RNG = getRandomSeed()): float {
  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);
  return rng.RandomFloat();
}

/**
 * This returns a random float between min and max.
 *
 * Example:
 * ```ts
 * const realNumberBetweenOneAndThree = getRandomFloat(1, 3);
 * ```
 *
 * @param min The lower bound for the random number (inclusive).
 * @param max The upper bound for the random number (exclusive).
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 * `RNG.Next` method will be called. Default is `getRandomSeed()`.
 */
export function getRandomFloat(
  min: int,
  max: int,
  seedOrRNG: Seed | RNG = getRandomSeed(),
): float {
  if (min > max) {
    const oldMin = min;
    const oldMax = max;
    min = oldMax;
    max = oldMin;
  }

  // From: https://stackoverflow.com/questions/40431966
  return min + getRandom(seedOrRNG) * (max - min);
}

/**
 * This returns a random integer between min and max. It is inclusive on both ends.
 *
 * Note that this function will invoke the `Next` method on the `RNG` object before returning the
 * random number.
 *
 * Example:
 * ```ts
 * const oneTwoOrThree = getRandomInt(1, 3);
 * ```
 *
 * @param min The lower bound for the random number (inclusive).
 * @param max The upper bound for the random number (inclusive).
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 * `RNG.Next` method will be called. Default is `getRandomSeed()`.
 */
export function getRandomInt(
  min: int,
  max: int,
  seedOrRNG: Seed | RNG = getRandomSeed(),
): int {
  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

  if (min > max) {
    const oldMin = min;
    const oldMax = max;
    min = oldMax;
    max = oldMin;
  }

  return rng.RandomInt(max - min + 1) + min;
}
