/**
 * Helper function to find a value in a map. Similar to the `Array.find` method, but works for maps.
 *
 * This is efficient such that it avoids converting the entire map into an array.
 */
export function mapFind<K, V>(
  map: ReadonlyMap<K, V>,
  predicate: (value: V) => boolean,
): V | undefined {
  for (const value of map.values()) {
    const match = predicate(value);
    if (match) {
      return value;
    }
  }

  return undefined;
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
