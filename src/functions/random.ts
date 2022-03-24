import { newRNG } from "./rng";

/**
 * This returns a random float between 0 and 1. It is inclusive on the low end, but exclusive on
 * the high end. (This is because the `RNG.RandomFloat` method can return a value of 0.999, but it
 * will never return a value of exactly 1.)
 *
 * Note that this function will invoke the `Next` method on the `RNG` object before returning the
 * random number.
 */
export function getRandom(rng = newRNG()): float {
  return rng.RandomFloat();
}

/**
 * This returns a random float between min and max. It is inclusive on the low end, but exclusive on
 * the high end. (This is because the `RNG.RandomFloat` method can return a value of 0.999, but it
 * will never return a value of exactly 1.)
 *
 * Note that this function will invoke the `Next` method on the `RNG` object before returning the
 * random number.
 *
 * Example:
 * ```ts
 * const realNumberBetweenOneAndThree = getRandomFloat(1, 3);
 * ```
 */
export function getRandomFloat(min: int, max: int, rng = newRNG()): float {
  if (min > max) {
    const oldMin = min;
    const oldMax = max;
    min = oldMax;
    max = oldMin;
  }

  // From: https://stackoverflow.com/questions/40431966
  return min + getRandom(rng) * (max - min);
}

/**
 * This returns a random float between min and max. It is inclusive on the low end, but exclusive on
 * the high end. (This is because the `RNG.RandomFloat` method can return a value of 0.999, but it
 * will never return a value of exactly 1.)
 */
export function getRandomFloatFromSeed(min: int, max: int, seed: Seed): float {
  const rng = newRNG(seed);
  return getRandomFloat(min, max, rng);
}

/**
 * This returns a random float between 0 and 1. It is inclusive on the low end, but exclusive on
 * the high end. (This is because the `RNG.RandomFloat` method can return a value of 0.999, but it
 * will never return a value of exactly 1.)
 */
export function getRandomFromSeed(seed: Seed): float {
  const rng = newRNG(seed);
  return getRandom(rng);
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
 */
export function getRandomInt(min: int, max: int, rng = newRNG()): int {
  if (min > max) {
    const oldMin = min;
    const oldMax = max;
    min = oldMax;
    max = oldMin;
  }

  return rng.RandomInt(max - min + 1) + min;
}

/** This returns a random integer between min and max. It is inclusive on both ends. */
export function getRandomIntFromSeed(min: int, max: int, seed: Seed): int {
  const rng = newRNG(seed);
  return getRandomInt(min, max, rng);
}
