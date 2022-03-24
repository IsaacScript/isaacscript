/**
 * Seed is an integer between 1 and 4294967295 (2^32 - 1). It is branded for extra type safety.
 *
 * In rare cases, the seed value can also be 0, which represents an uninitialized seed. For example,
 * this can happen if you invoke the `Seeds.GetStartSeed` method while in the main menu.
 *
 * If you set the seed of an RNG object to 0, it will cause the game to crash.
 */
declare type Seed = number & { __seedBrand: unknown };
