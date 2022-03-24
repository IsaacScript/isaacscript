/** Helper function to copy a map. (You can also use a Map constructor to accomplish this task.) */
export function copyMap<K, V>(oldMap: Map<K, V>): Map<K, V> {
  const newMap = new Map<K, V>();
  for (const [key, value] of oldMap.entries()) {
    newMap.set(key, value);
  }

  return newMap;
}

/**
 * Helper function to get the closest value from a map based on partial search text. For the
 * purposes of this function, both search text and map keys are converted to lowercase before
 * attempting to find a match.
 *
 * Example:
 * ```ts
 * const map = new <string, number>Map([
 *   ["foo", 123],
 *   ["bar", 456],
 * ]);
 * const searchText = "f";
 * const match = getMapPartialMatch(map, searchText); // match is now equal to 123
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
  keys.sort();

  searchText = searchText.toLowerCase();
  searchText = searchText.replaceAll(" ", "");

  const matchingKeys = keys.filter((key) =>
    key.toLowerCase().startsWith(searchText),
  );
  matchingKeys.sort();

  const matchingKey = matchingKeys[0];
  if (matchingKey === undefined) {
    return undefined;
  }

  const value = map.get(matchingKey);
  if (value === undefined) {
    return undefined;
  }

  return [matchingKey, value];
}
