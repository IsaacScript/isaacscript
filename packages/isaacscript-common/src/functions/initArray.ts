import { deepCopy } from "./deepCopy";
import { isPrimitive } from "./types";
import { repeat } from "./utils";

/**
 * Initializes an array with all of the elements containing the specified default value.
 *
 * If the provided default value is not a boolean, number, or string, then it will be copied with
 * the `deepCopy` function before adding it to the new array. In this way, you can initialize an
 * array of arrays, or an array of maps, and so on. (If the `deepCopy` function was not used, then
 * all of the array elements would just be references to the same underlying data structure.)
 *
 * For example:
 *
 * ```ts
 * const arrayWithZeroes = initArray(0, 10); // Has 10 elements of 0.
 * const arrayWithArrays = initArray([0], 20); // Has 20 elements of an array with a 0 in it.
 * ```
 */
export function initArray<T>(defaultValue: T, size: int): T[] {
  const array: T[] = [];
  repeat(size, () => {
    if (isPrimitive(defaultValue)) {
      array.push(defaultValue);
    } else {
      const copy = deepCopy(defaultValue);
      array.push(copy);
    }
  });

  return array;
}
