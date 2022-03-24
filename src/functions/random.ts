import { getRandomSeed, newRNG } from "./rng";

/**
 * This returns a random float between 0 and 1. It is inclusive on the low end, but exclusive on
 * the high end. (This is because the `RNG.RandomFloat` method can return a value of 0.999, but it
 * will never return a value of exactly 1.)
 */
export function getRandom(seed = getRandomSeed()): float {
  const rng = newRNG(seed);
  return getRandomFromRNG(rng);
}

/**
 * This returns a random float between min and max. It is inclusive on the low end, but exclusive on
 * the high end. (This is because the `RNG.RandomFloat` method can return a value of 0.999, but it
 * will never return a value of exactly 1.)
 *
 * Example:
 * ```ts
 * const realNumberBetweenOneAndThree = getRandomFloat(1, 3, seed);
 * ```
 */
export function getRandomFloat(
  min: int,
  max: int,
  seed = getRandomSeed(),
): float {
  const rng = newRNG(seed);
  return getRandomFloatFromRNG(min, max, rng);
}

/**
 * This returns a random float between min and max. It is inclusive on the low end, but exclusive on
 * the high end. (This is because the `RNG.RandomFloat` method can return a value of 0.999, but it
 * will never return a value of exactly 1.)
 *
 * Note that this function will invoke the `Next` method on the `RNG` object before returning the
 * random number.
 */
export function getRandomFloatFromRNG(min: int, max: int, rng: RNG): float {
  if (min > max) {
    const oldMin = min;
    const oldMax = max;
    min = oldMax;
    max = oldMin;
  }

  // From: https://stackoverflow.com/questions/40431966
  return min + getRandomFromRNG(rng) * (max - min);
}

/**
 * This returns a random float between 0 and 1. It is inclusive on the low end, but exclusive on
 * the high end. (This is because the `RNG.RandomFloat` method can return a value of 0.999, but it
 * will never return a value of exactly 1.)
 *
 * Note that this function will invoke the `Next` method on the `RNG` object before returning the
 * random number.
 */
export function getRandomFromRNG(rng: RNG): float {
  return rng.RandomFloat();
}

/**
 * This returns a random integer between min and max, inclusive.
 *
 * Example:
 * ```ts
 * const oneTwoOrThree = getRandomInt(1, 3, seed);
 * ```
 */
export function getRandomInt(min: int, max: int, seed = getRandomSeed()): int {
  const rng = newRNG(seed);
  return getRandomIntFromRNG(min, max, rng);
}

/**
 * This returns a random integer between min and max, inclusive.
 *
 * Note that this function will invoke the `Next` method on the `RNG` object before returning the
 * random number.
 */
export function getRandomIntFromRNG(min: int, max: int, rng: RNG): int {
  if (min > max) {
    const oldMin = min;
    const oldMax = max;
    min = oldMax;
    max = oldMin;
  }

  return rng.RandomInt(max - min + 1) + min;
}

/**
 * Helper function to get the next seed value.
 *
 * This function is useful because it is standard practice to work with seed values directly over
 * RNG objects, since the latter are not serializable.
 */
export function nextSeed(seed: Seed): Seed {
  const rng = newRNG(seed);
  rng.Next();
  return rng.GetSeed();
}
