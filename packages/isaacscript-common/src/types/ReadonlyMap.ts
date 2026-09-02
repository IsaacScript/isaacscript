/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line complete/type-declaration-immutability
interface ReadonlyMapConstructor {
  new (): ReadonlyMap<any, any>;
  new <K, V>(
    entries?: ReadonlyArray<readonly [K, V]> | Iterable<readonly [K, V]> | null,
  ): ReadonlyMap<K, V>;
  readonly prototype: ReadonlyMap<any, any>;
}

/** An alias for the `Map` constructor that returns a read-only map. */
export const ReadonlyMap = Map as ReadonlyMapConstructor;
