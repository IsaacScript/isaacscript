import type { TupleWithLengthBetween } from "./TupleWithLengthBetween";

/**
 * Helper type that validates that a tuple does not have a length greater than N.
 *
 * For example, `TupleWithMaxLength<string, 3>` will allow string tuples of size 0, 1, 2, or 3.
 */
export type TupleWithMaxLength<T, MaxLength extends number> = (
  | T[]
  | readonly T[]
) & {
  length: TupleWithLengthBetween<T, 0, MaxLength>;
};
