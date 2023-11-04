/**
 * Helper function to get the number of elapsed seconds since a starting time.
 *
 * This function always returns a whole number (using `Math.floor` on the result).
 *
 * For example:
 *
 * ```ts
 * const startTime = Date.now();
 * doSomething();
 * const elapsedSeconds = getElapsedSeconds(startTime);
 * ```
 */
export function getElapsedSeconds(startTime: number): number {
  const endTime = Date.now();
  const elapsedMilliseconds = endTime - startTime;
  const elapsedSeconds = elapsedMilliseconds / 1000;

  return Math.floor(elapsedSeconds);
}
