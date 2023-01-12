/**
 * Helper function to return an array of integers with the specified range, inclusive on the lower
 * end and exclusive on the high end. (The "e" stands for exclusive.)
 *
 * - For example, `eRange(1, 3)` will return `[1, 2]`.
 * - For example, `eRange(2)` will return `[0, 1]`.
 *
 * @param start The integer to start at.
 * @param end Optional. The integer to end at. If not specified, then the start will be 0 and the
 *            first argument will be the end.
 * @param increment Optional. The increment to use. Default is 1.
 */
export function eRange(start: number, end?: number, increment = 1): number[] {
  if (end === undefined) {
    return eRange(0, start);
  }

  const array: number[] = [];
  for (let i = start; i < end; i += increment) {
    array.push(i);
  }

  return array;
}

/**
 * Helper function to return an array of integers with the specified range, inclusive on both ends.
 * (The "i" stands for inclusive.)
 *
 * - For example, `iRange(1, 3)` will return `[1, 2, 3]`.
 * - For example, `iRange(2)` will return `[0, 1, 2]`.
 *
 * @param start The integer to start at.
 * @param end Optional. The integer to end at. If not specified, then the start will be 0 and the
 *            first argument will be the end.
 * @param increment Optional. The increment to use. Default is 1.
 */
export function iRange(start: number, end?: number, increment = 1): number[] {
  if (end === undefined) {
    return iRange(0, start);
  }

  const exclusiveEnd = end + 1;
  return eRange(start, exclusiveEnd, increment);
}

/**
 * This is a more reliable version of `parseInt`. By default, `parseInt('1a')` will return "1",
 * which is unexpected. This returns either an integer or NaN.
 */
export function parseIntSafe(input: string): number {
  if (typeof input !== "string") {
    return NaN;
  }

  // Remove all leading and trailing whitespace.
  let trimmedInput = input.trim();

  const isNegativeNumber = trimmedInput.startsWith("-");
  if (isNegativeNumber) {
    // Remove the leading minus sign before we match the regular expression.
    trimmedInput = trimmedInput.substring(1);
  }

  if (/^\d+$/.exec(trimmedInput) === null) {
    // "\d" matches any digit (same as "[0-9]").
    return NaN;
  }

  if (isNegativeNumber) {
    // Add the leading minus sign back.
    trimmedInput = `-${trimmedInput}`;
  }

  return Number.parseInt(trimmedInput, 10);
}
