/**
 * This is the ShiftIdx that Blade recommended after having reviewing the game's internal functions.
 * Any value between 0 and 80 should work equally well.
 * https://www.jstatsoft.org/article/view/v008i14/xorshift.pdf
 */
const RECOMMENDED_SHIFT_IDX = 35;

/**
 * This returns a random float between 0 and 1. It is inclusive on the low end, but exclusive on
 * the high end. (This is because the `RNG.RandomFloat` method can return a value of 0.999, but it
 * will never return a value of exactly 1.)
 */
export function getRandom(seed = getRandomSeed()): float {
  const rng = initRNG(seed);

  return rng.RandomFloat();
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
  // From: https://stackoverflow.com/questions/40431966
  return min + getRandom(seed) * (max - min);
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
  const rng = initRNG(seed);

  return rng.RandomInt(max - min + 1) + min;
}

/**
 * Helper function to get a random `Seed` value to be used in spawning entities and so on. Use this
 * instead of calling the `Random` function directly since that can return a value of 0 and crash
 * the game.
 */
export function getRandomSeed(): Seed {
  const random = Random();
  const safeRandomValue = random === 0 ? 1 : random;
  return safeRandomValue as Seed;
}

/**
 * Helper function to initialize an RNG object.
 *
 * Example:
 * ```ts
 * const startSeed = Game():GetSeeds():GetStartSeed();
 * const rng = initRNG(startSeed);
 * const fiftyFiftyChance = rng.RandomInt(2) === 0;
 * ```
 *
 * It is recommended to not deal with RNG objects directly and instead use seeds. Also see the
 * `getRandom`, `getRandomInt`, and `getRandomFloat` helper functions.
 *
 * @param seed The seed to initialize it with. Default is `getRandomSeed()`.
 */
export function initRNG(seed = getRandomSeed()): RNG {
  if (seed === 0) {
    error(
      "You cannot initialize an RNG object with a seed of 0, or the game will crash.",
    );
  }

  const rng = RNG();

  // The game expects seeds in the range of 1 to 4294967295
  rng.SetSeed(seed, RECOMMENDED_SHIFT_IDX);

  return rng;
}

/**
 * Helper function to get the next seed value.
 *
 * This function is useful because it is standard practice to work with seed values directly over
 * RNG objects, since the latter are not serializable.
 */
export function nextSeed(seed: Seed): Seed {
  const rng = initRNG(seed);
  rng.Next();
  return rng.GetSeed();
}
