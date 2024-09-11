import type { IRange } from "./IRange";

/**
 * Helper type that validates that a tuple does not have a length greater than N.
 *
 * For example, `TupleWithMaxLength<string, 3>` will allow string tuples of size 0, 1, 2, or 3.
 */
export type TupleWithMaxLength<T, MaxLength extends number> = readonly T[] & {
  length: IRange<0, MaxLength>;
};

// -----
// Tests
// -----

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable complete/require-unannotated-const-assertions */

// Tuple of length 0 with max length 0.
const zeroZero: TupleWithMaxLength<string, 0> = [] as const;

// @ts-expect-error Tuple of length 1 with max length 0.
const oneZero: TupleWithMaxLength<string, 0> = ["1"] as const;

// Tuple of length 0 with max length 1.
const zeroOne: TupleWithMaxLength<string, 1> = [] as const;

// Tuple of length 1 with max length 1.
const oneOne: TupleWithMaxLength<string, 1> = ["1"] as const;

// @ts-expect-error Tuple of length 2 with max length 1.
const twoOne: TupleWithMaxLength<string, 1> = ["1", "2"] as const;

// Tuple of length 0 with max length 2.
const zeroTwo: TupleWithMaxLength<string, 2> = [] as const;

// Tuple of length 1 with max length 2.
const oneTwo: TupleWithMaxLength<string, 2> = ["1"] as const;

// Tuple of length 2 with max length 2.
const twoTwo: TupleWithMaxLength<string, 2> = ["1", "2"] as const;

// @ts-expect-error Tuple of length 3 with max length 2.
const threeTwo: TupleWithMaxLength<string, 2> = ["1", "2", "3"] as const;

/* eslint-enable @typescript-eslint/no-unused-vars */
/* eslint-enable complete/require-unannotated-const-assertions */
