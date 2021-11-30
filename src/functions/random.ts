import { traceback } from "./debug";

/**
 * This is the ShiftIdx that Blade recommended after having reviewing the game's internal functions.
 * Any value between 0 and 80 should work equally well.
 * https://www.jstatsoft.org/article/view/v008i14/xorshift.pdf
 */
const RECOMMENDED_SHIFT_IDX = 35;

/**
 * This returns a random float between 0 and 1. It is inclusive on the low end, but exclusive on
 * the high end. (This is because `RNG.RandomFloat()` can return a value of 0.999, but it will never
 * return a value of exactly 1.)
 */
export function getRandom(seed = Random()): float {
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
export function getRandomFloat(min: int, max: int, seed = Random()): float {
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
export function getRandomInt(min: int, max: int, seed = Random()): int {
  const rng = initRNG(seed);

  return rng.RandomInt(max - min + 1) + min;
}

/**
 * Helper function to get the next seed value.
 *
 * This function is useful because it is standard practice to work with seed values directly over
 * RNG objects, since the latter are not serializable.
 */
export function nextSeed(seed: int): int {
  const rng = initRNG(seed);
  rng.Next();
  return rng.GetSeed();
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
export function initRNG(seed = Random()): RNG {
  if (seed === 0) {
    traceback();
    error(
      "You cannot initialize an RNG object with a seed of 0, or the game will crash.",
    );
  }

  const rng = RNG();

  // The game expects seeds in the range of 0 to 4294967295
  rng.SetSeed(seed, RECOMMENDED_SHIFT_IDX);

  return rng;
}
