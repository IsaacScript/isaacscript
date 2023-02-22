/**
 * Helper type to represent a tuple of length N.
 *
 * This is used by the `Increment` and `Decrement` helper types.
 *
 * From: https://stackoverflow.com/questions/54243431/typescript-increment-number-type
 */
export type Tuple<
  N extends number,
  T extends unknown[] = [],
> = T["length"] extends N ? T : Tuple<N, [...T, unknown]>;
