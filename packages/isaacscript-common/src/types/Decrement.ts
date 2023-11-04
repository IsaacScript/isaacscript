/**
 * Helper type to subtract one from a number type.
 *
 * From: https://stackoverflow.com/questions/54243431/typescript-increment-number-type
 */
export type Decrement<N extends number> = Arr<N> extends [unknown, ...infer U]
  ? U["length"]
  : never;

type Arr<N extends number, T extends unknown[] = []> = T["length"] extends N
  ? T
  : Arr<N, [...T, unknown]>;
