import type { IRange } from "./IRange";

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
> = readonly T[] & {
  length: IRange<MinLength, MaxLength>;
};

// -----
// Tests
// -----

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable complete/require-unannotated-const-assertions */

// @ts-expect-error Tuple of length 0 with min length 1 and max length 2.
const zeroOneTwo: TupleWithLengthBetween<string, 1, 2> = [] as const;

// Tuple of length 1 with min length 1 and max length 2.
const oneOneTwo: TupleWithLengthBetween<string, 1, 2> = ["1"] as const;

// Tuple of length 2 with min length 1 and max length 2.
const twoOneTwo: TupleWithLengthBetween<string, 1, 2> = ["1", "2"] as const;

// @ts-expect-error Tuple of length 3 with min length 1 and max length 2.
const threeOneTwo: TupleWithLengthBetween<string, 1, 2> = [
  "1",
  "2",
  "3",
] as const;

/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable complete/require-unannotated-const-assertions */

// See "TupleWithMaxLength.ts" for more tests.
