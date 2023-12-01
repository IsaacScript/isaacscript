import { ReadonlySet } from "../types/ReadonlySet.js";
import { getRandomInt } from "./random.js";
import { assertDefined } from "./utils.js";

/**
 * Helper function for determining if two arrays contain the exact same elements. Note that this
 * only performs a shallow comparison.
 */
export function arrayEquals<T>(
  array1: readonly T[],
  array2: readonly T[],
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
 * Builds a new array based on the original array without the specified element(s). Returns the new
 * array. If the specified element(s) are not found in the array, it will simply return a shallow
 * copy of the array.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 */
// eslint-disable-next-line isaacscript/no-mutable-array-return
export function arrayRemove<T>(
  originalArray: readonly T[],
  ...elementsToRemove: readonly T[]
): T[] {
  const elementsToRemoveSet = new ReadonlySet(elementsToRemove);

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
 * array, this function will do nothing.
 *
 * This function is variadic, meaning that you can specify N arguments to remove N elements.
 *
 * If there is more than one matching element in the array, this function will only remove the first
 * matching element. If you want to remove all of the elements, use the `arrayRemoveAllInPlace`
 * function instead.
 *
 * @returns The removed elements. This will be an empty array if no elements were removed.
 */
// eslint-disable-next-line isaacscript/no-mutable-array-return
export function arrayRemoveInPlace<T>(
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  array: T[],
  ...elementsToRemove: readonly T[]
): T[] {
  const removedElements: T[] = [];

  for (const element of elementsToRemove) {
    const index = array.indexOf(element);
    if (index > -1) {
      const removedElement = array.splice(index, 1);
      removedElements.push(...removedElement);
    }
  }

  return removedElements;
}

/** Helper function to remove all of the elements in an array in-place. */
// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export function emptyArray<T>(array: T[]): void {
  array.splice(0, array.length);
}

/**
 * Helper function to get a random element from the provided array.
 *
 * Note that this will only work with arrays that do not contain values of `undefined`, since the
 * function uses `undefined` as an indication that the corresponding element does not exist.
 *
 * @param array The array to get an element from.
 * @param exceptions Optional. An array of elements to skip over if selected.
 */
export function getRandomArrayElement<T>(
  array: readonly T[],
  exceptions: readonly T[] = [],
): T {
  if (array.length === 0) {
    throw new Error(
      "Failed to get a random array element since the provided array is empty.",
    );
  }

  const arrayToUse =
    exceptions.length > 0 ? arrayRemove(array, ...exceptions) : array;
  const randomIndex = getRandomArrayIndex(arrayToUse);
  const randomElement = arrayToUse[randomIndex];
  assertDefined(
    randomElement,
    `Failed to get a random array element since the random index of ${randomIndex} was not valid.`,
  );

  return randomElement;
}

/**
 * Helper function to get a random index from the provided array.
 *
 * @param array The array to get the index from.
 * @param exceptions Optional. An array of indexes that will be skipped over when getting the random
 *                   index. Default is an empty array.
 */
export function getRandomArrayIndex<T>(
  array: readonly T[],
  exceptions: readonly number[] = [],
): number {
  if (array.length === 0) {
    throw new Error(
      "Failed to get a random array index since the provided array is empty.",
    );
  }

  return getRandomInt(0, array.length - 1, exceptions);
}

/** Initializes an array with all elements containing the specified default value. */
// eslint-disable-next-line isaacscript/no-mutable-array-return
export function newArray<T>(length: number, value: T): T[] {
  return Array.from({ length }, () => value);
}
