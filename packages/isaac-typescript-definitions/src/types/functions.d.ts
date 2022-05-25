/**
 * Comparing two API objects directly in mod code will not work, even if the Lua metadata points to
 * the same pointer in memory. As a workaround, use this function to get a numerical hash of the
 * object.
 *
 * A `PtrHash` object is simply a branded number for better type safety and code clarity.
 */
declare function GetPtrHash(
  this: void,
  pointer: Entity | GridEntity | RoomDescriptor | ReadonlyRoomDescriptor,
): PtrHash;

/**
 * Returns a random integer between 0 and 4294967296 (2^32). It is inclusive on the lower end and
 * exclusive on the higher end.
 *
 * For most situations in which you need a random number, you should use the `getRandom`,
 * `getRandomInt`, and `getRandomFloat` helper functions from the standard library instead of this
 * function.
 *
 * This function is mostly useful for generating a random seed. For this purposes, you should always
 * use the `getRandomSeed` helper function instead of invoking this function directly, since it can
 * return a value of 0 and crash the game.
 */
declare function Random(this: void): int;

/**
 * Returns a random vector between (-1, -1) and (1, 1).
 *
 * For larger random vectors, multiply this with a number.
 */
declare function RandomVector(this: void): Vector;
