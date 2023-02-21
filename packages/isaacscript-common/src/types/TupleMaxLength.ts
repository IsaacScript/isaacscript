import { NaturalNumbersLessThan } from "./NaturalNumbersLessThan";

/**
 * Helper type that validates that a tuple does not have a length greater than N - 1.
 *
 * For example, `TupleMaxLength<string, 4>` will allow string tuples of size 0, 1, 2, or 3.
 */
export type TupleMaxLength<T, MaxLength extends number> = (
  | T[]
  | readonly T[]
) & {
  length: NaturalNumbersLessThan<MaxLength>;
};
