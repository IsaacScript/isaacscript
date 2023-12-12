import { isNumber, isString, isTable } from "./types";

export function sortNormal(a: unknown, b: unknown): -1 | 0 | 1 {
  if (!isNumber(a) && !isString(a)) {
    error(
      `Failed to normal sort since the first value was not a number or string and was instead: ${type(
        a,
      )}`,
    );
  }

  if (!isNumber(b) && !isString(b)) {
    error(
      `Failed to normal sort since the second value was not a number or string and was instead: ${type(
        b,
      )}`,
    );
  }

  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

/**
 * Helper function to sort an array of objects by one of the object keys.
 *
 * For example:
 *
 * ```ts
 * const myArray = [
 *   {
 *     name: "alice",
 *     age: 30,
 *   },
 *   {
 *     name: "bob",
 *     age: 20,
 *   },
 * ];
 * myArray.sort(sortObjectArrayByKey("age"));
 * ```
 */
export function sortObjectArrayByKey(key: string) {
  return (a: unknown, b: unknown): -1 | 0 | 1 => {
    if (!isTable(a)) {
      error(
        `Failed to sort an object array by the key of "${key}" since the first element was not a table and was instead: ${type(
          a,
        )}`,
      );
    }

    if (!isTable(b)) {
      error(
        `Failed to sort an object array by the key of "${key}" since the second element was not a table and was instead: ${type(
          b,
        )}.`,
      );
    }

    const aValue = a.get(key);
    const bValue = b.get(key);

    return sortNormal(aValue, bValue);
  };
}

/**
 * Helper function to sort a two-dimensional array by the first element.
 *
 * For example:
 *
 * ```ts
 * const myArray = [[1, 2], [2, 3], [3, 4]];
 * myArray.sort(sortTwoDimensionalArray);
 * ```
 *
 * This function also properly handles when the array elements are strings or numbers (instead of
 * another array).
 *
 * From:
 * https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value
 */
export function sortTwoDimensionalArray<T>(
  a: readonly T[],
  b: readonly T[],
): -1 | 0 | 1 {
  const aType = type(a);
  const bType = type(b);
  if (aType !== bType) {
    error(
      `Failed to two-dimensional sort since the two elements were disparate types: ${a} & ${b} (${aType} & ${bType})`,
    );
  }

  if (aType === "string" || aType === "number") {
    return sortNormal(a, b);
  }

  if (aType !== "table") {
    error(
      "Failed to two-dimensional sort since the first element was not a string, number, or table.",
    );
  }

  if (bType !== "table") {
    error(
      "Failed to two-dimensional sort since the second element was not a string, number, or table.",
    );
  }

  const firstElement1 = a[0];
  const firstElement2 = b[0];

  if (firstElement1 === undefined || firstElement1 === null) {
    error(
      "Failed to two-dimensional sort since the first element of the first array was undefined.",
    );
  }

  if (firstElement2 === undefined || firstElement2 === null) {
    error(
      "Failed to two-dimensional sort since the first element of the second array was undefined.",
    );
  }

  const elementType1 = type(firstElement1);
  const elementType2 = type(firstElement2);
  if (elementType1 !== elementType2) {
    error(
      `Failed to two-dimensional sort since the first element of each array were disparate types: ${firstElement1} & ${firstElement2} (${elementType1} & ${elementType2})`,
    );
  }

  return sortNormal(firstElement1, firstElement2);
}

/**
 * Helper function to sort an array in a stable way.
 *
 * This is useful because by default, the transpiled `Array.sort` method from TSTL is not stable.
 *
 * Under the hood, this uses the merge sort algorithm.
 */
// eslint-disable-next-line isaacscript/no-mutable-return
export function stableSort<T>(
  // eslint-disable-next-line isaacscript/prefer-readonly-parameter-types
  array: T[],
  sortFunc: (a: T, b: T) => -1 | 0 | 1 = sortNormal,
): T[] {
  // Base case: an array of zero or one elements is already sorted
  if (array.length <= 1) {
    return array;
  }

  // Split the array into two halves.
  const middleIndex = Math.floor(array.length / 2);
  const leftArray = array.slice(0, middleIndex);
  const rightArray = array.slice(middleIndex);

  // Recursively sort each half.
  const sortedLeftArray = stableSort(leftArray, sortFunc);
  const sortedRightArray = stableSort(rightArray, sortFunc);

  // Merge the two sorted halves.
  const mergedArray: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while (
    leftIndex < sortedLeftArray.length &&
    rightIndex < sortedRightArray.length
  ) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const left = sortedLeftArray[leftIndex]!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const right = sortedRightArray[rightIndex]!;

    const sortResult = sortFunc(left, right);
    if (sortResult === -1 || sortResult === 0) {
      mergedArray.push(left);
      leftIndex++;
    } else {
      mergedArray.push(right);
      rightIndex++;
    }
  }

  // Add any remaining elements from the left array.
  while (leftIndex < sortedLeftArray.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const left = sortedLeftArray[leftIndex]!;
    mergedArray.push(left);
    leftIndex++;
  }

  // Add any remaining elements from the right array.
  while (rightIndex < sortedRightArray.length) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const right = sortedRightArray[rightIndex]!;
    mergedArray.push(right);
    rightIndex++;
  }

  return mergedArray;
}
