import { game } from "../cachedClasses";

/** Alias for the `Seeds.GetStartSeedString` method. */
export function getStartSeedString(): string {
  const seeds = game.GetSeeds();
  return seeds.GetStartSeedString();
}
