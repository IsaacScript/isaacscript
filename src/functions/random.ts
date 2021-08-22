import { RECOMMENDED_SHIFT_IDX } from "../constants";

/**
 * This returns a random float between 0 and 1. It is inclusive on the low end, but exclusive on
 * the high end. (This is because `RNG.RandomFloat()` can return a value of 0.999, but it will never
 * return a value of exactly 1.)
 */
export function getRandom(seed: int): float {
  const rng = initRNG(seed);

  return rng.RandomFloat();
}

/**
 * This returns a random float between min and max. It is inclusive on the low end, but exclusive on
 * the high end. (This is because `RNG.RandomFloat()` can return a value of 0.999, but it will never
 * return a value of exactly 1.)
 *
 * Example:
 * ```
 * const realNumberBetweenOneAndThree = getRandomFloat(1, 3, seed);
 * ```
 */
export function getRandomFloat(min: int, max: int, seed: int): float {
  // From: https://stackoverflow.com/questions/40431966
  return min + getRandom(seed) * (max - min);
}

/**
 * This returns a random integer between min and max, inclusive.
 *
 * Example:
 * ```
 * const oneTwoOrThree = getRandomInt(1, 3, seed);
 * ```
 */
export function getRandomInt(min: int, max: int, seed: int): int {
  const rng = initRNG(seed);

  return rng.RandomInt(max - min + 1) + min;
}

/**
 * Helper function to initialize an RNG object.
 *
 * Example:
 * ```
 * const startSeed = Game():GetSeeds():GetStartSeed();
 * const rng = initRNG(startSeed);
 * const fiftyFiftyChance = rng.RandomInt(2) === 0;
 * ```
 *
 * @param seed The seed to initialize it with.
 * (If you aren't initializing it with a seed, then don't use this function and instead simply call
 * the `RNG()` constructor.)
 */
export function initRNG(seed: int): RNG {
  if (seed === 0) {
    error(
      "You cannot initialize an RNG object with a seed of 0, or the game will crash.",
    );
  }

  const rng = RNG();

  // The game expects seeds in the range of 0 to 4294967295
  rng.SetSeed(seed, RECOMMENDED_SHIFT_IDX);

  return rng;
}
