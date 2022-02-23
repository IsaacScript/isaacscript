/** Helper function to copy a map. (You can also use a Map constructor to accomplish this task.) */
export function copyMap<K, V>(oldMap: Map<K, V>): Map<K, V> {
  const newMap = new Map<K, V>();
  for (const [key, value] of oldMap.entries()) {
    newMap.set(key, value);
  }

  return newMap;
}
