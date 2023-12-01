import type { DefaultMap } from "../classes/DefaultMap";
import { sumArray } from "./array";

/** Helper function to copy a map. (You can also use a Map constructor to accomplish this task.) */
// eslint-disable-next-line isaacscript/no-mutable-return
export function copyMap<K, V>(oldMap: ReadonlyMap<K, V>): Map<K, V> {
  const newMap = new Map<K, V>();
  for (const [key, value] of oldMap) {
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
export function getReversedMap<K, V>(
  map: ReadonlyMap<K, V>,
): ReadonlyMap<V, K> {
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

/**
 * Helper function to convert an object to a map.
 *
 * This is useful when you need to construct a type safe object with the `satisfies` operator, but
 * then later on you need to query it in a way where you expect the return value to be T or
 * undefined. In this situation, by converting the object to a map, you can avoid unsafe type
 * assertions.
 *
 * Note that the map values will be inserted in a random order, due to how `pairs` works under the
 * hood.
 *
 * Also see the `objectToReadonlyMap` function.
 */
// eslint-disable-next-line isaacscript/no-mutable-return
export function objectToMap<K extends string | number | symbol, V>(
  object: Record<K, V>,
): Map<K, V> {
  const map = new Map<K, V>();

  for (const [key, value] of Object.entries(object)) {
    map.set(key as K, value as V);
  }

  return map;
}

/**
 * Helper function to convert an object to a read-only map.
 *
 * This is useful when you need to construct a type safe object with the `satisfies` operator, but
 * then later on you need to query it in a way where you expect the return value to be T or
 * undefined. In this situation, by converting the object to a map, you can avoid unsafe type
 * assertions.
 *
 * Note that the map values will be inserted in a random order, due to how `pairs` works under the
 * hood.
 *
 * Also see the `objectToMap` function.
 */
export function objectToReadonlyMap<K extends string | number | symbol, V>(
  object: Record<K, V>,
): ReadonlyMap<K, V> {
  return objectToMap(object);
}

/** Helper function to sum every value in a map together. */
export function sumMap(map: ReadonlyMap<unknown, number>): number {
  const values = [...map.values()];
  return sumArray(values);
}
