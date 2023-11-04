/**
 * Helper type to add one to a number type.
 *
 * From: https://stackoverflow.com/questions/54243431/typescript-increment-number-type
 */
export type Increment<N extends number> = [...Arr<N>, unknown]["length"] &
  number;

type Arr<N extends number, T extends unknown[] = []> = T["length"] extends N
  ? T
  : Arr<N, [...T, unknown]>;
