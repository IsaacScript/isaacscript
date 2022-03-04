import { getRandomInt, nextSeed } from "./random";
import { repeat } from "./utils";

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
 * entire array will be copied.
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
    newArray.push(oldElement);
  }

  return newArray;
}

export function emptyArray<T>(array: T[]): void {
  array.splice(0, array.length);
}

/** Helper function to return the last element of an array. */
export function getLastElement<T>(array: T[]): T {
  return array[array.length - 1];
}

/**
 * Initializes an array with all elements containing the specified default value.
 *
 * Example:
 * ```
 * const playerTransformations = initArray(false, PlayerForm.NUM_PLAYER_FORMS - 1);
 * ```
 */
export function initArray<T>(defaultValue: T, size: int): T[] {
  const array: T[] = [];
  repeat(size, () => {
    array.push(defaultValue);
  });

  return array;
}

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
 */
export function shuffleArray<T>(
  originalArray: T[] | readonly T[],
  seed = Random(),
): T[] {
  const array = copyArray(originalArray);
  shuffleArrayInPlace(array, seed);

  return array;
}

/**
 * Shuffles the provided array in-place using the Fisher-Yates algorithm.
 *
 * From: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
export function shuffleArrayInPlace<T>(array: T[], seed = Random()): void {
  let currentIndex = array.length;
  let randomIndex: int;

  while (currentIndex > 0) {
    currentIndex -= 1;
    seed = nextSeed(seed);
    randomIndex = getRandomArrayIndex(array, seed);

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

export function sumArray(array: number[] | readonly number[]): number {
  return array.reduce((accumulator, element) => accumulator + element, 0);
}

export function arrayToString<T>(array: T[]): string {
  if (array.length === 0) {
    return "[]";
  }

  const strings = array.map((element) => tostring(element));
  const commaSeparatedStrings = strings.join(", ");
  return `[${commaSeparatedStrings}]`;
}

/**
 * Shallow copies and removes the specified element(s) from the array. Returns the copied array. If
 * the specified element(s) are not found in the array, it will simply return a shallow copy of the
 * array.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 */
export function arrayRemove<T>(
  originalArray: T[] | readonly T[],
  ...elementsToRemove: T[]
): T[] {
  const elementsToRemoveSet = new Set(elementsToRemove);

  const array: T[] = [];
  for (const element of originalArray) {
    if (!elementsToRemoveSet.has(element)) {
      array.push(element);
    }
  }

  return array;
}

/**
 * Removes the specified element(s) from the array. If the specified element(s) are not found in the
 * array, this function will do nothing. Returns whether or not one or more elements were removed.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
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
 * Helper function to get a random element from the provided array.
 *
 * @param array The array to get an element from.
 * @param seed Optional. The seed used to select the random element. `Random()` by default.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomArrayElement<T>(
  array: T[] | readonly T[],
  seed = Random(),
  exceptions: T[] | readonly T[] = [],
): T {
  const arrayWithoutExceptions = arrayRemove(array, ...exceptions);
  const randomIndex = getRandomArrayIndex(arrayWithoutExceptions, seed);
  return arrayWithoutExceptions[randomIndex];
}

/**
 * Helper function to get a random element from the provided array. Once the random element is
 * decided, it is then removed from the array (in-place).
 *
 * @param array The array to get an element from.
 * @param seed Optional. The seed used to select the random element. `Random()` by default.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomArrayElementAndRemove<T>(
  array: T[],
  seed = Random(),
  exceptions: T[] | readonly T[] = [],
) {
  const randomArrayElement = getRandomArrayElement(array, seed, exceptions);
  arrayRemoveInPlace(array, randomArrayElement);
  return randomArrayElement;
}

export function getRandomArrayIndex<T>(
  array: T[] | readonly T[],
  seed = Random(),
): int {
  if (array.length === 0) {
    error(
      "Failed to get a random array index since the provided array is empty.",
    );
  }

  return getRandomInt(0, array.length - 1, seed);
}

/**
 * Since Lua uses tables for every non-primitive data structure, it is non-trivial to determine if a
 * particular table is being used as an array. isArray returns true if:
 *
 * - the table contains all numerical indexes that are contiguous, starting at 1
 * - the table has no keys (i.e. an "empty" table)
 */
export function isArray(table: LuaTable): boolean {
  // First, if there is a metatable, this cannot be a simple array and must be a more complex object
  const metatable = getmetatable(table);
  if (metatable !== undefined) {
    return false;
  }

  // Second, handle the case of non-numerical keys
  // (and count the entries in the table)
  let numEntries = 0;
  for (const [key] of pairs(table)) {
    numEntries += 1;

    if (typeof key !== "number") {
      return false;
    }
  }

  // Third, check for non-contiguous elements
  // (Lua tables start at an index of 1)
  for (let i = 1; i <= numEntries; i++) {
    const element = table.get(i) as unknown | undefined;
    if (element === undefined) {
      return false;
    }
  }

  return true;
}
