import { getArrayCombinations, getRandomArrayElement } from "./array";
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
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomSetElement<T>(
  set: Set<T> | ReadonlySet<T>,
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: T[] | readonly T[] = [],
): T {
  const array = getSortedSetValues(set);
  return getRandomArrayElement(array, seedOrRNG, exceptions);
}

/**
 * Helper function to get all possible combinations of the given set. This includes the combination
 * of an empty set.
 *
 * For example, if this function is provided a set containing 1, 2, and 3, then it will return an
 * array containing the following sets:
 *
 * - []
 * - [1]
 * - [2]
 * - [3]
 * - [1, 2]
 * - [1, 3]
 * - [2, 3]
 * - [1, 2, 3]
 *
 * @param set The set to get the combinations of.
 * @param includeEmptyArray Whether or not to include an empty array in the combinations.
 */
export function getSetCombinations<T>(
  set: Set<T> | ReadonlySet<T>,
  includeEmptyArray: boolean,
): ReadonlyArray<ReadonlySet<T>> {
  const values = getSortedSetValues(set);
  const combinations = getArrayCombinations(values, includeEmptyArray);

  return combinations.map((array) => new Set(array));
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
