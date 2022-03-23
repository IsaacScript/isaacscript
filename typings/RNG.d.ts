declare function RNG(this: void): RNG;

declare interface RNG {
  GetSeed(): Seed;
  Next(): Seed;

  /**
   * Returns a random float between 0 and 1. It is inclusive on the lower end and exclusive on the
   * higher end.
   *
   * Note that this will automatically call the `RNG.Next` method before retrieving the random
   * number. Since this mutates the RNG object, you should use this method with care.
   */
  RandomFloat(): float;

  /**
   * Returns a random integer between 0 and max. It is inclusive on the lower end and exclusive on
   * the higher end.
   *
   * For example, `rng.RandomInt(4)` will return either 0, 1, 2, or 3.
   *
   * Note that this will automatically call the `RNG.Next` method before retrieving the random
   * number. Since this mutates the RNG object, you should use this method with care.
   */
  RandomInt(max: int): int;

  SetSeed(seed: Seed, shiftIdx: int): void;
}
