import { getRandomInt } from "./random";
import { getRandomSeed, isRNG, newRNG } from "./rng";
import { isNumber, isTable } from "./types";
import { eRange } from "./utils";

/**
 * Helper function for determining if two arrays contain the exact same elements. Note that this
 * only performs a shallow comparison.
 */
export function arrayEquals<T>(
  array1: T[] | readonly T[],
  array2: T[] | readonly T[],
): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  return array1.every((array1Element, i) => {
    const array2Element = array2[i];
    return array1Element === array2Element;
  });
}

/**
 * Shallow copies and removes the specified element(s) from the array. Returns the copied array. If
 * the specified element(s) are not found in the array, it will simply return a shallow copy of the
 * array.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 *
 * If there is more than one matching element in the array, this function will only remove the first
 * matching element. If you want to remove all of the elements, use the `arrayRemoveAll` function
 * instead.
 */
export function arrayRemove<T>(
  originalArray: T[] | readonly T[],
  ...elementsToRemove: T[]
): T[] {
  const array = copyArray(originalArray);
  arrayRemoveInPlace(array, ...elementsToRemove);
  return array;
}

/**
 * Shallow copies and removes the specified element(s) from the array. Returns the copied array. If
 * the specified element(s) are not found in the array, it will simply return a shallow copy of the
 * array.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 *
 * If there is more than one matching element in the array, this function will remove every matching
 * element. If you want to only remove the first matching element, use the `arrayRemove` function
 * instead.
 */
export function arrayRemoveAll<T>(
  originalArray: T[] | readonly T[],
  ...elementsToRemove: T[]
): T[] {
  const array = copyArray(originalArray);
  arrayRemoveAllInPlace(array, ...elementsToRemove);
  return array;
}

/**
 * Removes all of the specified element(s) from the array. If the specified element(s) are not found
 * in the array, this function will do nothing.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 *
 * If there is more than one matching element in the array, this function will remove every matching
 * element. If you want to only remove the first matching element, use the `arrayRemoveInPlace`
 * function instead.
 *
 * @returns True if one or more elements were removed, false otherwise.
 */
export function arrayRemoveAllInPlace<T>(
  array: T[],
  ...elementsToRemove: T[]
): boolean {
  let removedOneOrMoreElements = false;
  for (const element of elementsToRemove) {
    let index: number;
    do {
      index = array.indexOf(element);
      if (index > -1) {
        removedOneOrMoreElements = true;
        array.splice(index, 1);
      }
    } while (index > -1);
  }

  return removedOneOrMoreElements;
}

/**
 * Removes the specified element(s) from the array. If the specified element(s) are not found in the
 * array, this function will do nothing.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 *
 * If there is more than one matching element in the array, this function will only remove the first
 * matching element. If you want to remove all of the elements, use the `arrayRemoveAllInPlace`
 * function instead.
 *
 * @returns True if one or more elements were removed, false otherwise.
 */
export function arrayRemoveInPlace<T>(
  array: T[],
  ...elementsToRemove: T[]
): boolean {
  let removedOneOrMoreElements = false;
  for (const element of elementsToRemove) {
    const index = array.indexOf(element);
    if (index > -1) {
      removedOneOrMoreElements = true;
      array.splice(index, 1);
    }
  }

  return removedOneOrMoreElements;
}

/**
 * Shallow copies and removes the elements at the specified indexes from the array. Returns the
 * copied array. If the specified indexes are not found in the array, it will simply return a
 * shallow copy of the array.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 */
export function arrayRemoveIndex<T>(
  originalArray: T[] | readonly T[],
  ...indexesToRemove: int[]
): T[] {
  const indexesToRemoveSet = new Set(indexesToRemove);

  const array: T[] = [];
  originalArray.forEach((element, i) => {
    if (!indexesToRemoveSet.has(i)) {
      array.push(element);
    }
  });

  return array;
}

/**
 * Removes the elements at the specified indexes from the array. If the specified indexes are not
 * found in the array, this function will do nothing. Returns true if one or more elements were
 * removed.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 *
 * @returns Whether or not any array elements were removed.
 */
export function arrayRemoveIndexInPlace<T>(
  array: T[],
  ...indexesToRemove: int[]
): boolean {
  const legalIndexes = indexesToRemove.filter(
    (i) => i >= 0 && i < array.length,
  );
  legalIndexes.sort();

  if (legalIndexes.length === 0) {
    return false;
  }

  for (let i = array.length - 1; i >= 0; i--) {
    array.splice(i, 1);
  }

  return true;
}

export function arrayToString<T>(array: T[] | readonly T[]): string {
  if (array.length === 0) {
    return "[]";
  }

  const strings = array.map((element) => tostring(element));
  const commaSeparatedStrings = strings.join(", ");
  return `[${commaSeparatedStrings}]`;
}

/**
 * Helper function to combine two or more arrays. Returns a new array that is the composition of all
 * of the specified arrays.
 *
 * This function is variadic, meaning that you can specify N arguments to combine N arrays. Note
 * that this will only perform a shallow copy of the array elements.
 */
export function combineArrays<T>(...arrays: Array<T[] | readonly T[]>): T[] {
  const elements: T[] = [];
  for (const array of arrays) {
    for (const element of array) {
      elements.push(element);
    }
  }

  return elements;
}

/**
 * Helper function to perform a shallow copy.
 *
 * @param oldArray The array to copy.
 * @param numElements Optional. If specified, will only copy the first N elements. By default, the
 *                    entire array will be copied.
 */
export function copyArray<T>(
  oldArray: T[] | readonly T[],
  numElements?: int,
): T[] {
  if (numElements === undefined) {
    numElements = oldArray.length;
  }

  const newArray: T[] = [];
  for (let i = 0; i < numElements; i++) {
    const oldElement = oldArray[i];
    if (oldElement !== undefined) {
      newArray.push(oldElement);
    }
  }

  return newArray;
}

/** Helper function to remove all of the elements in an array in-place. */
export function emptyArray<T>(array: T[]): void {
  array.splice(0, array.length);
}

/**
 * Helper function to get all possible combinations of the given array. This includes the
 * combination of an empty array.
 *
 * For example, if this function is provided an array containing 1, 2, and 3, then it will return an
 * array containing the following arrays:
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
 * From: https://github.com/firstandthird/combinations/blob/master/index.js
 *
 * @param array The array to get the combinations of.
 * @param includeEmptyArray Whether or not to include an empty array in the combinations.
 * @param min Optional. The minimum number of elements to include in each combination. Default is 1.
 * @param max Optional. The maximum number of elements to include in each combination. Default is
 *            the length of the array.
 */
export function getArrayCombinations<T>(
  array: T[] | readonly T[],
  includeEmptyArray: boolean,
  min?: int,
  max?: int,
): ReadonlyArray<readonly T[]> {
  if (min === undefined || min <= 0) {
    min = 1;
  }
  if (max === undefined || max <= 0) {
    max = array.length;
  }

  const addCombinations = (
    n: number,
    src: T[] | readonly T[],
    got: T[],
    all: Array<T[] | readonly T[]>,
  ) => {
    if (n === 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }

      return;
    }

    for (let j = 0; j < src.length; j++) {
      const value = src[j]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      addCombinations(n - 1, src.slice(j + 1), got.concat([value]), all);
    }
  };

  const all: Array<T[] | readonly T[]> = [];
  for (let i = min; i < array.length; i++) {
    addCombinations(i, array, [], all);
  }
  if (array.length === max) {
    all.push(array);
  }

  // Finally, account for the empty array combination.
  if (includeEmptyArray) {
    all.unshift([]);
  }

  return all;
}

/**
 * Helper function to get an array containing the indexes of an array.
 *
 * For example, an array of `["Apple", "Banana"]` would return an array of `[0, 1]`.
 */
export function getArrayIndexes<T>(array: T[] | readonly T[]): int[] {
  return eRange(array.length);
}

/**
 * Helper function to return the last element of an array.
 *
 * If the array is empty, this will return undefined.
 */
export function getLastElement<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

/**
 * Helper function to get a random element from the provided array.
 *
 * @param array The array to get an element from.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomArrayElement<T>(
  array: T[] | readonly T[],
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: T[] | readonly T[] = [],
): T {
  if (array.length === 0) {
    error(
      "Failed to get a random array element since the provided array is empty.",
    );
  }

  const arrayWithoutExceptions = arrayRemove(array, ...exceptions);
  const randomIndex = getRandomArrayIndex(arrayWithoutExceptions, seedOrRNG);
  const randomElement = arrayWithoutExceptions[randomIndex];
  if (randomElement === undefined) {
    error(
      `Failed to get a random array element since the random index of ${randomIndex} was not valid.`,
    );
  }

  return randomElement;
}

/**
 * Helper function to get a random element from the provided array. Once the random element is
 * decided, it is then removed from the array (in-place).
 *
 * @param array The array to get an element from.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomArrayElementAndRemove<T>(
  array: T[],
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: T[] | readonly T[] = [],
): T {
  const randomArrayElement = getRandomArrayElement(
    array,
    seedOrRNG,
    exceptions,
  );
  arrayRemoveInPlace(array, randomArrayElement);
  return randomArrayElement;
}

/**
 * Helper function to get a random index from the provided array.
 *
 * @param array The array to get the index from.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 * @param exceptions Optional. An array of indexes that will be skipped over when getting the random
 *                   index. Default is an empty array.
 */
export function getRandomArrayIndex<T>(
  array: T[] | readonly T[],
  seedOrRNG: Seed | RNG = getRandomSeed(),
  exceptions: int[] | readonly int[] = [],
): int {
  if (array.length === 0) {
    error(
      "Failed to get a random array index since the provided array is empty.",
    );
  }

  return getRandomInt(0, array.length - 1, seedOrRNG, exceptions);
}

/**
 * Since Lua uses tables for every non-primitive data structure, it is non-trivial to determine if a
 * particular table is being used as an array. `isArray` returns true if:
 *
 * - the table contains all numerical indexes that are contiguous, starting at 1
 * - the table has no keys (i.e. an "empty" table)
 */
export function isArray(object: unknown): object is unknown[] {
  if (!isTable(object)) {
    return false;
  }

  // First, if there is a metatable, this cannot be a simple array and must be a more complex
  // object.
  const metatable = getmetatable(object);
  if (metatable !== undefined) {
    return false;
  }

  // Second, handle the case of an "empty" table.
  const keys = Object.keys(object);
  if (keys.length === 0) {
    return true;
  }

  // Third, handle the case of non-numerical keys.
  const hasAllNumberKeys = keys.every((key) => isNumber(key));
  if (!hasAllNumberKeys) {
    return false;
  }

  // Fourth, check for non-contiguous elements. (Lua tables start at an index of 1.)
  for (let i = 1; i <= keys.length; i++) {
    const element = object.get(i);
    if (element === undefined) {
      return false;
    }
  }

  return true;
}

/**
 * Helper function to see if every element in the array is N + 1.
 *
 * For example, `[2, 3, 4]` would return true, and `[2, 3, 5]` would return false.
 */
export function isArrayContiguous(array: int[]): boolean {
  let lastValue: int | undefined;
  for (const element of array) {
    if (lastValue === undefined) {
      lastValue = element - 1;
    }

    if (element !== lastValue - 1) {
      return false;
    }
  }

  return true;
}

/** Checks if an array is in the provided 2-dimensional array. */
export function isArrayInArray<T>(
  arrayToMatch: T[] | readonly T[],
  parentArray: Array<T[] | readonly T[]>,
): boolean {
  return parentArray.some((element) => arrayEquals(element, arrayToMatch));
}

/**
 * Shallow copies and shuffles the array using the Fisher-Yates algorithm. Returns the copied array.
 *
 * From: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 *
 * @param originalArray The array to shuffle.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 */
export function shuffleArray<T>(
  originalArray: T[] | readonly T[],
  seedOrRNG: Seed | RNG = getRandomSeed(),
): T[] {
  const array = copyArray(originalArray);
  shuffleArrayInPlace(array, seedOrRNG);

  return array;
}

/**
 * Shuffles the provided array in-place using the Fisher-Yates algorithm.
 *
 * From: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 *
 * @param array The array to shuffle.
 * @param seedOrRNG Optional. The `Seed` or `RNG` object to use. If an `RNG` object is provided, the
 *                  `RNG.Next` method will be called. Default is `getRandomSeed()`.
 */
export function shuffleArrayInPlace<T>(
  array: T[],
  seedOrRNG: Seed | RNG = getRandomSeed(),
): void {
  let currentIndex = array.length;

  const rng = isRNG(seedOrRNG) ? seedOrRNG : newRNG(seedOrRNG);

  while (currentIndex > 0) {
    currentIndex--;

    const randomIndex = getRandomArrayIndex(array, rng);
    swapArrayElements(array, currentIndex, randomIndex);
  }
}

/** Helper function to sum every value in an array together. */
export function sumArray(array: number[] | readonly number[]): number {
  return array.reduce((accumulator, element) => accumulator + element);
}

/**
 * Helper function to swap two different array elements. (The elements will be swapped in-place.)
 */
export function swapArrayElements<T>(array: T[], i: number, j: number): void {
  const value1 = array[i]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
  const value2 = array[j]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion

  array[i] = value2;
  array[j] = value1;
}
