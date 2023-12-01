/**
 * Helper type to represent any function. This is safer than using the built-in `Function` type, as
 * it does not completely turn off all type safety.
 */
export type AnyFunction = (...args: readonly unknown[]) => unknown;
