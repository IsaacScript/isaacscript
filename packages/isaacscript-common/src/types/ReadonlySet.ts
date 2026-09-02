/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line complete/type-declaration-immutability
interface ReadonlySetConstructor {
  new <T = any>(values?: readonly T[] | Iterable<T> | null): ReadonlySet<T>;
  readonly prototype: ReadonlySet<any>;
}

/** An alias for the `Set` constructor that returns a read-only set. */
export const ReadonlySet = Set as ReadonlySetConstructor;
