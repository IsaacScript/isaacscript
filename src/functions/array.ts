import { getRandomInt, nextSeed } from "./random";

export function arrayEmpty<T>(array: T[]): void {
  array.splice(0, array.length);
}

/** Helper function for determining if two arrays contain the exact same elements. */
export function arrayEquals<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

export function arrayInArray<T>(
  arrayToMatch: T[],
  parentArray: T[][],
): boolean {
  for (const element of parentArray) {
    if (arrayEquals(element, arrayToMatch)) {
      return true;
    }
  }

  return false;
}

/**
 * Initializes an array with all elements containing the specified default value.
 *
 * Example:
 * ```
 * const playerTransformations = initArray(false, PlayerForm.NUM_PLAYER_FORMS - 1);
 * ```
 */
export function arrayInit<T>(defaultValue: T, size: int): T[] {
  const array: T[] = [];
  for (let i = 0; i < size; i++) {
    array.push(defaultValue);
  }

  return array;
}

/**
 * Shallow copies and shuffles the array using the Fisher-Yates algorithm. Returns the copied array.
 *
 * From: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
export function arrayShuffle<T>(originalArray: T[], seed = Random()): T[] {
  const array = [...originalArray];
  arrayShuffleInPlace(array, seed);

  return array;
}

/**
 * Shuffles the provided array in-place using the Fisher-Yates algorithm.
 *
 * From: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 */
export function arrayShuffleInPlace<T>(array: T[], seed = Random()): void {
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

export function arraySum(array: int[]): int {
  let sum = 0;
  for (const element of array) {
    sum += element;
  }

  return sum;
}

export function arrayToString<T>(array: T[]): string {
  if (array.length === 0) {
    return "[]";
  }

  const strings: string[] = [];
  for (const [, value] of ipairs(array)) {
    strings.push(tostring(value));
  }

  return `[${strings.join(", ")}]`;
}

/**
 * Shallow copies and removes the specified element(s) from the array. Returns the copied array. If
 * the specified element(s) are not found in the array, it will simply return a shallow copy of the
 * array.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 */
export function arrayRemove<T>(originalArray: T[], ...elements: T[]): T[] {
  const array = [...originalArray];

  for (const element of elements) {
    const index = array.indexOf(element);
    array.splice(index, 1);
  }

  return array;
}

/**
 * Removes the specified element(s) from the array. If the specified element(s) are not found in the
 * array, this function will do nothing. Returns whether or not one or more elements were found.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 */
export function arrayRemoveInPlace<T>(array: T[], ...elements: T[]): boolean {
  let removedOneOrMoreElements = false;

  for (const element of elements) {
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
  array: T[],
  seed = Random(),
  exceptions: T[] = [],
): T {
  const arrayWithoutExceptions = arrayRemove(array, ...exceptions);
  const randomIndex = getRandomArrayIndex(arrayWithoutExceptions, seed);
  return arrayWithoutExceptions[randomIndex];
}

export function getRandomArrayIndex<T>(array: T[], seed = Random()): int {
  if (array.length === 0) {
    error(
      "Failed to get a random array index since the provided array is empty.",
    );
  }

  const randomIndex = getRandomInt(0, array.length - 1, seed);
  return randomIndex;
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

    const keyType = type(key);
    if (keyType !== "number") {
      return false;
    }
  }

  // Third, check for non-contiguous elements
  for (let i = 1; i <= numEntries; i++) {
    const element = table.get(i) as unknown | undefined;
    if (element === undefined) {
      return false;
    }
  }

  return true;
}
