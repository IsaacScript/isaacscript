/** Alias for the `Seeds.GetStartSeedString` method. */
export function getStartSeedString(): string {
  const game = Game();
  const seeds = game.GetSeeds();

  return seeds.GetStartSeedString();
}
