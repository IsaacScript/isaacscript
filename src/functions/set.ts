import { getRandomArrayElement } from "./array";
import { getRandomSeed } from "./rng";

/**
 * Helper function to add all of the values in one set to another set. The first set passed will be
 * modified in place.
 *
 * This function is variadic, meaning that you can specify N sets to add to the first set.
 */
export function addSetsToSet<T>(
  mainSet: Set<T>,
  ...setsToAdd: Array<Set<T> | ReadonlySet<T>>
): void {
  for (const set of setsToAdd) {
    for (const value of set.values()) {
      mainSet.add(value);
    }
  }
}

/**
 * Helper function to create a new set that is the composition of two or more sets.
 *
 * This function is variadic, meaning that you can specify N sets.
 */
export function combineSets<T>(
  ...sets: Array<Set<T> | ReadonlySet<T>>
): Set<T> {
  const newSet = new Set<T>();
  for (const set of sets) {
    for (const value of set.values()) {
      newSet.add(value);
    }
  }

  return newSet;
}

/** Helper function to copy a set. (You can also use a Set constructor to accomplish this task.) */
export function copySet<T>(oldSet: Set<T> | ReadonlySet<T>): Set<T> {
  const newSet = new Set<T>();
  for (const value of oldSet.values()) {
    newSet.add(value);
  }

  return newSet;
}

/**
 * Helper function to delete all of the values in one set from another set. The first set passed
 * will be modified in place.
 *
 * This function is variadic, meaning that you can specify N sets to remove from the first set.
 */
export function deleteSetsFromSet<T>(
  mainSet: Set<T>,
  ...setsToRemove: Array<Set<T> | ReadonlySet<T>>
): void {
  for (const set of setsToRemove) {
    for (const value of set.values()) {
      mainSet.delete(value);
    }
  }
}

/**
 * Helper function to get a random element from the provided set.
 *
 * @param set The set to get an element from.
 * @param seed Optional. The seed used to select the random element. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomSetElement<T>(
  set: Set<T> | ReadonlySet<T>,
  seed = getRandomSeed(),
  exceptions: T[] | readonly T[] = [],
): T {
  const array = getSortedSetValues(set);
  return getRandomArrayElement(array, seed, exceptions);
}

/**
 * Helper function to get a sorted array based on the contents of a set.
 *
 * Normally, set values are returned in a random order, so use this function when the ordering of
 * the contents is important.
 */
export function getSortedSetValues<T>(set: Set<T> | ReadonlySet<T>): T[] {
  const values = set.values();
  const array = [...values];
  array.sort();

  return array;
}
