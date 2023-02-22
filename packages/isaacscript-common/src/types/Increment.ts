import { Tuple } from "./Tuple";

/**
 * Helper type to add one to a number type.
 *
 * From: https://stackoverflow.com/questions/54243431/typescript-increment-number-type
 */
export type Increment<N extends number> = [...Tuple<N>, unknown]["length"];
