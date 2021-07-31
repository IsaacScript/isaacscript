import { getRandomInt } from "./util";

/**
 * Helper function for determining if two arrays contain the exact same elements.
 *
 * @category Array
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

/**
 * @category Array
 */
export function getRandomArrayElement<T>(array: T[], seed: int): T {
  const randomIndex = getRandomInt(0, array.length - 1, seed);
  return array[randomIndex];
}

/**
 * Copies and removes the specified element from the array. Returns the copied array.
 *
 * @category Array
 */
export function arrayRemove<T>(array: T[], element: T): T[] {
  const arrayCopy = [...array];
  const index = array.indexOf(element);
  arrayCopy.splice(index, 1);

  return arrayCopy;
}
