declare function RNG(this: void): RNG;

declare interface RNG {
  GetSeed(): Seed;
  Next(): Seed;

  /**
   * Generates a random float between 0 and 1.
   * It is inclusive on the bottom and exclusive on the top.
   */
  RandomFloat(): float;

  /**
   * Generates a random integer between 0 and max - 1. For example, `rng.RandomInt(4)` will return
   * either 0, 1, 2, or 3.
   *
   * @param max
   */
  RandomInt(max: int): int;

  SetSeed(seed: Seed, shiftIdx: int): void;
}
