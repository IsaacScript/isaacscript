import { DefaultMap } from "../classes/DefaultMap";
import { sumArray } from "./array";
import { getPartialMatch } from "./string";

/** Helper function to copy a map. (You can also use a Map constructor to accomplish this task.) */
export function copyMap<K, V>(oldMap: Map<K, V>): Map<K, V> {
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
 * Helper function to get the closest value from a map based on partial search text. For the
 * purposes of this function, both search text and map keys are converted to lowercase before
 * attempting to find a match.
 *
 * For example:
 *
 * ```ts
 * const map = new <string, number>Map([
 *   ["foo", 123],
 *   ["bar", 456],
 * ]);
 * const searchText = "f";
 * const match = getMapPartialMatch(map, searchText); // match is now equal to ["foo", 123]
 *
 * @returns If a match was found, returns a tuple of the map key and value. If a match was not
 * found, returns undefined.
 * ```
 */
export function getMapPartialMatch<T>(
  searchText: string,
  map: ReadonlyMap<string, T>,
): [string, T] | undefined {
  const keys = [...map.keys()];

  const matchingKey = getPartialMatch(searchText, keys);
  if (matchingKey === undefined) {
    return undefined;
  }

  const value = map.get(matchingKey);
  if (value === undefined) {
    error(
      `Failed to get the map value corresponding to the partial match of: ${matchingKey}`,
    );
  }

  return [matchingKey, value];
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
