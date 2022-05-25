import { log } from "./log";

/**
 * Helper function to benchmark the performance of a function.
 *
 * This function is variadic, which means that you can supply as many as you want to benchmark.
 *
 * @returns An array containing the average time in milliseconds for each function. (This will also
 *          be printed to the log.)
 */
export function benchmark(
  numTrials: int,
  ...functions: Array<() => void>
): int[] {
  log(`Benchmarking ${functions.length} function(s) with ${numTrials} trials.`);

  const averages: int[] = [];
  functions.forEach((func, i) => {
    let totalTimeMilliseconds = 0;
    for (let j = 0; j < numTrials; j++) {
      const startTimeMilliseconds = Isaac.GetTime();
      func();
      const endTimeMilliseconds = Isaac.GetTime();
      const elapsedTimeMilliseconds =
        endTimeMilliseconds - startTimeMilliseconds;
      totalTimeMilliseconds += elapsedTimeMilliseconds;
    }
    const averageTimeMilliseconds = totalTimeMilliseconds / numTrials;
    log(
      `The average time of the function at index ${i} is: ${averageTimeMilliseconds} milliseconds`,
    );
    averages.push(averageTimeMilliseconds);
  });

  return averages;
}
