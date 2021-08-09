import { getRandomInt } from "./random";

/**
 * Helper function for determining if two arrays contain the exact same elements.
 */
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

export function arrayEmpty<T>(array: T[]): void {
  array.splice(0, array.length);
}

export function getRandomArrayElement<T>(array: T[], seed: int): T {
  const randomIndex = getRandomInt(0, array.length - 1, seed);
  return array[randomIndex];
}

/**
 * Copies and removes the specified element from the array. Returns the copied array.
 */
export function arrayRemove<T>(array: T[], element: T): T[] {
  const arrayCopy = [...array];
  const index = array.indexOf(element);
  arrayCopy.splice(index, 1);

  return arrayCopy;
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
  for (let i = 0; i < size; i++) {
    array.push(defaultValue);
  }

  return array;
}
