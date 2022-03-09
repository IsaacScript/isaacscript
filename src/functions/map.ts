import { nextSeed } from "./random";

/** Helper function to copy a map. (You can also use a Map constructor to accomplish this task.) */
export function copyMap<K, V>(oldMap: Map<K, V>): Map<K, V> {
  const newMap = new Map<K, V>();
  for (const [key, value] of oldMap.entries()) {
    newMap.set(key, value);
  }

  return newMap;
}

/**
 * Helper function to make using map with `Seed` values easier. Use this instead of manually getting
 * the current value, incrementing it, and then re-setting it.
 */
export function mapGetNextSeed<K>(map: Map<K, Seed>, key: K): Seed | undefined {
  const seed = map.get(key);
  if (seed === undefined) {
    return undefined;
  }

  if (seed === 0) {
    error(`The seed map had a value of 0 for the key of: ${key}`);
  }

  const newSeed = nextSeed(seed);
  map.set(key, newSeed);

  return newSeed;
}
