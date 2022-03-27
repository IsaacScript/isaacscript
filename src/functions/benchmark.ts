import { log } from "./log";

/**
 * Helper function to benchmark the performance of a function.
 *
 * - If one function is supplied, it will simply report the average run time of the function.
 * - If two functions are supplied, it will compare the average run times of the functions.
 */
export function benchmark(
  numTrials: int,
  function1: () => void,
  function2?: () => void,
): int[] {
  const numFunctions = function2 === undefined ? 1 : 2;
  const functionsText = numFunctions === 1 ? "1 function" : "2 functions";
  log(`Benchmarking ${functionsText} with ${numTrials} trials.`);

  const averages: int[] = [];
  for (let i = 1; i <= numFunctions; i++) {
    const functionToUse = i === 1 ? function1 : function2;
    if (functionToUse === undefined) {
      error("Failed to find the benchmarking function to use.");
    }

    let totalTimeMilliseconds = 0;
    for (let j = 0; j < numTrials; j++) {
      const startTimeMilliseconds = Isaac.GetTime();
      functionToUse();
      const endTimeMilliseconds = Isaac.GetTime();
      const elapsedTimeMilliseconds =
        endTimeMilliseconds - startTimeMilliseconds;
      totalTimeMilliseconds += elapsedTimeMilliseconds;
    }
    const averageTimeMilliseconds = totalTimeMilliseconds / numTrials;
    log(
      `The average time of function ${i} is: ${averageTimeMilliseconds} milliseconds`,
    );
    averages.push(averageTimeMilliseconds);
  }

  return averages;
}
