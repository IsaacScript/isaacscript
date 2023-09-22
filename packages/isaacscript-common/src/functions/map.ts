import type { DefaultMap } from "../classes/DefaultMap";
import { sumArray } from "./array";

/** Helper function to copy a map. (You can also use a Map constructor to accomplish this task.) */
export function copyMap<K, V>(
  oldMap: Map<K, V> | ReadonlyMap<K, V>,
): Map<K, V> {
  const newMap = new Map<K, V>();
  for (const [key, value] of oldMap.entries()) {
    newMap.set(key, value);
  }

  return newMap;
}

/**
 * Helper function to get the value from a `DefaultMap` that corresponds to an entity, assuming that
 * the map uses `PtrHash` as an index.
 */
export function defaultMapGetHash<V, A extends unknown[]>(
  map: DefaultMap<PtrHash, V, A>,
  entity: Entity,
  ...extraArgs: A
): V {
  const ptrHash = GetPtrHash(entity);
  return map.getAndSetDefault(ptrHash, ...extraArgs);
}

/**
 * Helper function to set a value for a `DefaultMap` that corresponds to an entity, assuming that
 * the map uses `PtrHash` as an index.
 *
 * Since `Map` and `DefaultMap` set values in the same way, this function is simply an alias for the
 * `mapSetHash` helper function.
 */
export function defaultMapSetHash<V>(
  map: Map<PtrHash, V>,
  entity: Entity,
  value: V,
): void {
  mapSetHash(map, entity, value);
}

/**
 * Helper function to get a copy of a map with the keys and the values reversed.
 *
 * For example:
 *
 * ```ts
 * new Map<string, number>([
 *   ["foo", 1],
 *   ["bar", 2],
 * ]);
 * ```
 *
 * Would be reversed to:
 *
 * ```ts
 * new Map<number, string>([
 *   [1, "foo"],
 *   [2, "bar"],
 * ]);
 * ```
 */
export function getReversedMap<K, V>(map: Map<K, V>): Map<V, K>;
export function getReversedMap<K, V>(map: ReadonlyMap<K, V>): ReadonlyMap<V, K>;
export function getReversedMap<K, V>(
  map: Map<K, V> | ReadonlyMap<K, V>,
): Map<V, K> {
  const reverseMap = new Map<V, K>();

  for (const [key, value] of map) {
    reverseMap.set(value, key);
  }

  return reverseMap;
}

/**
 * Helper function to set a value for a `DefaultMap` that corresponds to an entity, assuming that
 * the map uses `PtrHash` as an index.
 */
export function mapSetHash<V>(
  map: Map<PtrHash, V>,
  entity: Entity,
  value: V,
): void {
  const hash = GetPtrHash(entity);
  map.set(hash, value);
}

/** Helper function to sum every value in a map together. */
export function sumMap(
  map: Map<unknown, number> | ReadonlyMap<unknown, number>,
): number {
  const values = [...map.values()];
  return sumArray(values);
}
