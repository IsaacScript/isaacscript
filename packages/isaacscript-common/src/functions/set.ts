import { ReadonlySet } from "../types/ReadonlySet";
import { getArrayCombinations, getRandomArrayElement, sumArray } from "./array";
import { isPrimitive } from "./types";

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
    for (const value of set) {
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
    for (const value of set) {
      newSet.add(value);
    }
  }

  return newSet;
}

/** Helper function to copy a set. (You can also use a Set constructor to accomplish this task.) */
export function copySet<T>(oldSet: Set<T> | ReadonlySet<T>): Set<T> {
  const newSet = new Set<T>();
  for (const value of oldSet) {
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
    for (const value of set) {
      mainSet.delete(value);
    }
  }
}

/**
 * Helper function to get a random element from the provided set.
 *
 * If you want to get an unseeded element, you must explicitly pass `undefined` to the `seedOrRNG`
 * parameter.
 *
 * @param set The set to get an element from.
 * @param seedOrRNG The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. If `undefined` is provided, it will default to
 *                  a random seed.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomSetElement<T>(
  set: Set<T> | ReadonlySet<T>,
  seedOrRNG: Seed | RNG | undefined,
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
 * - [] (if `includeEmptyArray` is set to true)
 * - [1]
 * - [2]
 * - [3]
 * - [1, 2]
 * - [1, 3]
 * - [2, 3]
 * - [1, 2, 3]
 *
 * @param set The set to get the combinations of.
 * @param includeEmptyArray Whether to include an empty array in the combinations.
 */
export function getSetCombinations<T>(
  set: Set<T> | ReadonlySet<T>,
  includeEmptyArray: boolean,
): ReadonlyArray<ReadonlySet<T>> {
  const values = getSortedSetValues(set);
  const combinations = getArrayCombinations(values, includeEmptyArray);

  return combinations.map((array) => new ReadonlySet(array));
}

/**
 * Helper function to get a sorted array based on the contents of a set.
 *
 * Normally, set values are returned in insertion order, so use this function when the ordering of
 * the contents is important.
 */
// eslint-disable-next-line isaacscript/no-mutable-array-return
export function getSortedSetValues<T>(set: Set<T> | ReadonlySet<T>): T[] {
  const values = [...set];

  // Check for problematic types in order to throw a helpful error message.
  const firstElement = values[0];
  if (firstElement !== undefined) {
    const arrayType = type(firstElement);
    if (!isPrimitive(arrayType)) {
      error(
        `Failed to get the sorted set values because the provided set was of type "${arrayType}". Having sets with non-primitive types doesn't make much sense in general, so you might need to rethink what you are doing.`,
      );
    }
  }

  values.sort();

  return values;
}

/**
 * Helper function to convert the keys of an object to a read-only set.
 *
 * Note that the set values will be inserted in a random order, due to how `pairs` works under the
 * hood.
 *
 * Also see the `objectKeysToSet` function.
 */
export function objectKeysToReadonlySet<K extends string | number | symbol, V>(
  object: Record<K, V>,
): ReadonlySet<K> {
  return objectKeysToSet(object);
}

/**
 * Helper function to convert the keys of an object to a set.
 *
 * Note that the set values will be inserted in a random order, due to how `pairs` works under the
 * hood.
 *
 * Also see the `objectKeysToReadonlySet` function.
 */
export function objectKeysToSet<K extends string | number | symbol, V>(
  object: Record<K, V>,
): Set<K> {
  const set = new Set<K>();

  for (const key of Object.keys(object)) {
    set.add(key as K);
  }

  return set;
}

/**
 * Helper function to convert the values of an object to a read-only set.
 *
 * Note that the set values will be inserted in a random order, due to how `pairs` works under the
 * hood.
 *
 * Also see the `objectValuesToSet` function.
 */
export function objectValuesToReadonlySet<
  K extends string | number | symbol,
  V,
>(object: Record<K, V>): ReadonlySet<V> {
  return objectValuesToSet(object);
}

/**
 * Helper function to convert the values of an object to a set.
 *
 * Note that the set values will be inserted in a random order, due to how `pairs` works under the
 * hood.
 *
 * Also see the `objectValuesToReadonlySet` function.
 */
export function objectValuesToSet<K extends string | number | symbol, V>(
  object: Record<K, V>,
): Set<V> {
  const set = new Set<V>();

  for (const key of Object.values(object)) {
    set.add(key as V);
  }

  return set;
}

/**
 * Helper function to add one or more elements to a set at once without having to repeatedly call
 * the `Set.add` method.
 *
 * This function is variadic, meaning that you can pass as many things as you want to add.
 */
export function setAdd<T>(set: Set<T>, ...elements: T[]): void {
  for (const element of elements) {
    set.add(element);
  }
}

/**
 * Helper function to check for one or more elements in a set at once without having to repeatedly
 * call the `Set.has` method.
 *
 * This function is variadic, meaning that you can pass as many things as you want to check for. It
 * will return true if one or more elements are found.
 */
export function setHas<T>(
  set: Set<T> | ReadonlySet<T>,
  ...elements: T[]
): boolean {
  return elements.some((element) => set.has(element));
}

/** Helper function to sum every value in a set together. */
export function sumSet(set: Set<number> | ReadonlySet<number>): number {
  const values = [...set];
  return sumArray(values);
}
