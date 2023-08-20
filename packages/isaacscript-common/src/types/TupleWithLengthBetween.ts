import type { Range } from "./Range";

/**
 * Helper type that validates that a tuple has a length between `MinLength` and `MaxLength`
 * (inclusive on both ends).
 *
 * For example, `TupleWithLengthBetween<string, 2, 4>` will allow string tuples of size 2, 3, or 4.
 */
export type TupleWithLengthBetween<
  T,
  MinLength extends number,
  MaxLength extends number,
> = (T[] | readonly T[]) & {
  length: Range<MinLength, MaxLength>;
};
