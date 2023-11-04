import type { ERange } from "./ERange";

/**
 * Helper type to get the valid indexes for a tuple. For example, using a tuple of length 3 will
 * return `0 | 1 | 2`.
 */
export type TupleKeys<T extends { length: number }> = ERange<0, T["length"]>;
