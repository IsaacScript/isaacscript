/**
 * Comparing two API objects directly in mod code will not work, even if the Lua metadata points to
 * the same pointer in memory. As a workaround, use this function to get a numerical hash of the
 * object.
 *
 * A `PtrHash` object is simply a branded number for better type safety and code clarity.
 */
declare function GetPtrHash(
  this: void,
  pointer: Entity | GridEntity | RoomDescriptor | RoomDescriptorReadOnly,
): PtrHash;

/**
 * Returns a random integer between 0 and 2^32.
 *
 * For most situations in which you need a random number, you should use the `getRandom`,
 * `getRandomInt`, and `getRandomFloat` helper functions from the standard library instead of this
 * function.
 *
 * Since this function is primarily used in generating new random seeds, the return type is
 * annotated as a `Seed`. In the rare case where you need the output of this function for purposes
 * other than a seed, cast it to an `int`.
 */
declare function Random(this: void): Seed;

/**
 * Returns a random vector between (-1, -1) and (1, 1).
 * Multiply this vector by a number for larger random vectors.
 */
declare function RandomVector(this: void): Vector;
