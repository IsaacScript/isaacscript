import type { Tuple } from "../types/Tuple.js";

type TupleKey<T extends readonly unknown[]> = {
  [L in T["length"]]: Exclude<Partial<Tuple<unknown, L>>["length"], L>;
}[T["length"]];
type TupleValue<T extends readonly unknown[]> = T[0];
type TupleEntry<T extends readonly unknown[]> = [TupleKey<T>, TupleValue<T>];

/**
 * Helper function to get the entries (i.e. indexes and values) of a tuple in a type-safe way.
 *
 * This is useful because the vanilla `Array.entries` method will always have the keys be of type
 * `number`.
 */
export function* tupleEntries<T extends readonly unknown[]>(
  tuple: T,
): Generator<TupleEntry<T>> {
  yield* tuple.entries() as Generator<TupleEntry<T>>;
}

/**
 * Helper function to get the keys (i.e. indexes) of a tuple in a type-safe way.
 *
 * This is useful because the vanilla `Array.keys` method will always have the keys be of type
 * `number`.
 */
export function* tupleKeys<T extends readonly unknown[]>(
  tuple: T,
): Generator<TupleKey<T>> {
  yield* tuple.keys() as Generator<TupleKey<T>>;
}
