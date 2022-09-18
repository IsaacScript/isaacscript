import { SECOND_IN_MILLISECONDS } from "../core/constants";
import { log } from "./log";

/**
 * Helper function to benchmark the performance of a function.
 *
 * This function is variadic, which means that you can supply as many functions as you want to
 * benchmark.
 *
 * This function uses the `Isaac.GetTime` method to record how long the function took to execute.
 * This method only reports time in milliseconds. For this reason, if you are benchmarking smaller
 * functions, then you should provide a very high value for the number of trials.
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

/**
 * Helper function to get the current time in seconds for benchmarking / profiling purposes.
 *
 * - If the "--luadebug" flag is enabled, then this function will use the `socket.gettime` method,
 *   which returns the epoch timestamp in seconds (e.g. "1640320492.5779"). This is preferable over
 *   the `Isaac.GetTime` method, since it has one extra decimal point of precision.
 * - If the "--luadebug" flag is disabled, then this function will use the `Isaac.GetTime` method,
 *   which returns the number of seconds since the computer's operating system was started (e.g.
 *   "739454.963"). (The milliseconds return value of `Isaac.GetTime` is converted to seconds to
 *   align with the return value of `socket.gettime`.)
 */
export function getTime(): float {
  const [ok, requiredSocket] = pcall(require, "socket");
  if (ok) {
    const socket = requiredSocket as Socket;
    return socket.gettime();
  }

  // The "--luadebug" launch option is not enabled.
  return Isaac.GetTime() / SECOND_IN_MILLISECONDS;
}
