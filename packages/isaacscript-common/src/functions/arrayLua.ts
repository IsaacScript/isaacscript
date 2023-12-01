/**
 * These are a collection of functions for non-TypeScript users so that they can access some of
 * useful methods offered on the `Array` class in the JavaScript standard library.
 *
 * If you are a TypeScript user, you should never use these functions, and instead use the more
 * idiomatic object-oriented approach.
 *
 * @module
 */

/**
 * Helper function for non-TypeScript users to check if every element in the array is equal to a
 * condition.
 *
 * Internally, this just calls `Array.every`.
 */
export function every<T>(
  array: readonly T[],
  func: (value: T, index: number, array: readonly T[]) => boolean,
): boolean {
  return array.every(func);
}

/**
 * Helper function for non-TypeScript users to filter the elements in an array. Returns the filtered
 * array.
 *
 * Internally, this just calls `Array.filter`.
 */
export function filter<T>(
  array: readonly T[],
  func: (value: T, index: number, array: readonly T[]) => boolean,
): readonly T[] {
  return array.filter(func);
}

/**
 * Helper function for non-TypeScript users to find an element in an array.
 *
 * Internally, this just calls `Array.find`.
 */
export function find<T>(
  array: readonly T[],
  func: (value: T, index: number, array: readonly T[]) => boolean,
): T | undefined {
  return array.find(func);
}

/**
 * Helper function for non-TypeScript users to iterate over an array.
 *
 * Internally, this just calls `Array.forEach`.
 */
export function forEach<T>(
  array: readonly T[],
  func: (value: T, index: number, array: readonly T[]) => void,
): void {
  array.forEach(func); // eslint-disable-line unicorn/no-array-for-each
}

// `includes` is not included since there is a normal array helper function of that name.

/**
 * Helper function for non-TypeScript users to convert an array to a string with the specified
 * separator.
 *
 * Internally, this just calls `Array.join`.
 */
export function join<T>(array: readonly T[], separator: string): string {
  return array.join(separator);
}

/**
 * Helper function for non-TypeScript users to convert all of the elements in an array to something
 * else.
 *
 * Internally, this just calls `Array.map`.
 */
export function map<T, U>(
  array: readonly T[],
  func: (value: T, index: number, array: readonly T[]) => U,
): readonly U[] {
  return array.map(func);
}

/**
 * Helper function for non-TypeScript users to check if one or more elements in the array is equal
 * to a condition.
 *
 * Internally, this just calls `Array.some`.
 */
export function some<T>(
  array: readonly T[],
  func: (value: T, index: number, array: readonly T[]) => boolean,
): boolean {
  return array.some(func);
}
