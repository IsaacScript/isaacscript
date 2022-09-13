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
 * Internally, this just calls `array.every`.
 */
export function every<T>(
  array: T[],
  func: (value: T, index: number, array: T[]) => boolean,
): boolean {
  return array.every(func);
}

/**
 * Helper function for non-TypeScript users to filter the elements in an array. Returns the filtered
 * array.
 *
 * Internally, this just calls `array.filter`.
 */
export function filter<T>(
  array: T[],
  func: (value: T, index: number, array: T[]) => boolean,
): T[] {
  return array.filter(func);
}

/**
 * Helper function for non-TypeScript users to find an element in an array.
 *
 * Internally, this just calls `array.find`.
 */
export function find<T>(
  array: T[],
  func: (value: T, index: number, array: T[]) => boolean,
): T | undefined {
  return array.find(func);
}

/**
 * Helper function for non-TypeScript users to iterate over an array.
 *
 * Internally, this just calls `array.forEach`.
 */
export function forEach<T>(
  array: T[],
  func: (value: T, index: number, array: T[]) => void,
): void {
  array.forEach(func);
}

/**
 * Helper function for non-TypeScript users to check if an element is in an array.
 *
 * Since this takes O(N) time, using this function is usually a mistake, since you can use a `Map`
 * data structure to get O(1) lookups.
 *
 * Internally, this just calls `array.includes`.
 */
export function includes<T>(array: T[], element: T): boolean {
  return array.includes(element);
}

/**
 * Helper function for non-TypeScript users to convert an array to a string with the specified
 * separator.
 *
 * Internally, this just calls `array.join`.
 */
export function join<T>(array: T[], separator: string): string {
  return array.join(separator);
}

/**
 * Helper function for non-TypeScript users to convert all of the elements in an array to something
 * else.
 *
 * Internally, this just calls `array.map`.
 */
export function map<T, U>(
  array: T[],
  func: (value: T, index: number, array: T[]) => U,
): U[] {
  return array.map(func);
}

/**
 * Helper function for non-TypeScript users to check if one or more elements in the array is equal
 * to a condition.
 *
 * Internally, this just calls `array.some`.
 */
export function some<T>(
  array: T[],
  func: (value: T, index: number, array: T[]) => boolean,
): boolean {
  return array.some(func);
}
