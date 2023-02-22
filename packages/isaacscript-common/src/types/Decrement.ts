import { Tuple } from "./Tuple";

/**
 * Helper type to subtract one from a number type.
 *
 * From: https://stackoverflow.com/questions/54243431/typescript-increment-number-type
 */
export type Decrement<N extends number> = Tuple<N> extends [unknown, ...infer U]
  ? U["length"]
  : never;
