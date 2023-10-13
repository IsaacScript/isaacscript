import type { CopyableIsaacAPIClassType } from "../../enums/CopyableIsaacAPIClassType";

declare global {
  /**
   * It is recommended to never use the `RNG` constructor directly and instead use the `newRNG`
   * helper function, which can help avoid crashes.
   *
   * Note that new RNG objects from this constructor are always initialized with a seed of
   * 2853650767. Thus, after invoking the constructor, you must set the seed of the new RNG object
   * to the initial seed that you want. In some cases, this can just be a new random number between
   * 1 and 4294967295. You can use the `Random` global function to get a starting seed for these
   * cases, but check to make sure that values of 0 are not allowed, since that will crash the game.
   * However, in most cases, seeding with a completely random number would be a bug in your mod,
   * because all behavior in Isaac should be deterministic based on the starting seed of the run, or
   * the seed of the level, or the seed of the room, and so on.
   */
  function RNG(this: void): RNG;

  interface RNG extends IsaacAPIClass {
    GetSeed: () => Seed;

    /**
     * "Iterates" the RNG object and returns the iterated seed, which will be a new random number
     * between 1 and 4294967295 (2^32 - 1).
     */
    Next: () => Seed;

    /**
     * Returns a random float between 0 and 1. It is inclusive on the lower end and exclusive on the
     * higher end.
     *
     * Note that this will automatically call the `RNG.Next` method before retrieving the random
     * number. Since this mutates the RNG object, you should use this method with care.
     */
    RandomFloat: () => float;

    /**
     * Returns a random integer between 0 and max. It is inclusive on the lower end and exclusive on
     * the higher end.
     *
     * For example, `rng.RandomInt(4)` will return either 0, 1, 2, or 3.
     *
     * Note that this will automatically call the `RNG.Next` method before retrieving the random
     * number. Since this mutates the RNG object, you should use this method with care.
     */
    RandomInt: (max: int) => int;

    /**
     * It is recommended to never use the `RNG.SetSeed` method directly and instead use the
     * `setSeed` helper function from `isaacscript-common`, since it prevent the game from crashing.
     *
     * When setting the seed with this method, it is recommended to use a shift index of 35, which
     * is what most of the game's internal functions use. Document this number as a constant using
     * SHOUTING_SNAKE_CASE so that you avoid using magic numbers in your program.
     *
     * The shift index table can be found here:
     * https://gist.github.com/bladecoding/17b341ed08ff94d2deb704ebda8ffc5f
     *
     * @param seed
     * @param shiftIdx Can be any value between 0 and 80 (inclusive).
     * @deprecated
     */
    SetSeed: (seed: Seed, shiftIdx: int) => void;

    /** An identifier that does not exist at run-time. */
    __kind: CopyableIsaacAPIClassType.RNG;
  }
}
