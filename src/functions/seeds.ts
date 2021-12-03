/** Helper function to get the seed of the current run. */
export function getStartSeedString(): string {
  const game = Game();
  const seeds = game.GetSeeds();

  return seeds.GetStartSeedString();
}
