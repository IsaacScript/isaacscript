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
