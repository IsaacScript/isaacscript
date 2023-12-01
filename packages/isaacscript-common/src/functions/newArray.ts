import { deepCopy } from "./deepCopy";
import { repeat } from "./utils";

/**
 * Initializes an array with all of the elements containing the specified default value.
 *
 * The provided default value will be copied with the `deepCopy` function before adding it to the
 * new array. Thus, you can initialize an array of arrays, or an array of maps, and so on. (If the
 * `deepCopy` function was not used, then all of the array elements would just be references to the
 * same underlying data structure.)
 *
 * For example:
 *
 * ```ts
 * const arrayWithZeroes = newArray(0, 10); // Has 10 elements of 0.
 * const arrayWithArrays = newArray([0], 20); // Has 20 elements of an array with a 0 in it.
 * ```
 */
// eslint-disable-next-line isaacscript/no-mutable-return
export function newArray<T>(defaultValue: T, size: int): T[] {
  const array: T[] = [];
  repeat(size, () => {
    const copy = deepCopy(defaultValue);
    array.push(copy);
  });

  return array;
}
