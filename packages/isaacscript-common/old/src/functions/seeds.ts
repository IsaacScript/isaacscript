import { game } from "../cachedClasses";
import { newRNG } from "./rng";

/** Alias for the `Seeds.GetStartSeedString` method. */
export function getStartSeedString(): string {
  const seeds = game.GetSeeds();
  return seeds.GetStartSeedString();
}

/**
 * Helper function to get the next seed value.
 *
 * This function is useful when you are working with seed values directly over RNG objects.
 */
export function nextSeed(seed: Seed): Seed {
  const rng = newRNG(seed);
  rng.Next();
  return rng.GetSeed();
}
