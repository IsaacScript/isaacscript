import chalk from "chalk";
import { diffLines } from "diff";

/**
 * Helper function to print the differences between two strings. Similar to the `diff` Unix program.
 */
export function diff(string1: string, string2: string): void {
  const differences = diffLines(string1, string2);
  for (const difference of differences) {
    if (difference.added === true) {
      console.log(`${chalk.green("+")} ${difference.value.trim()}`);
    } else if (difference.removed === true) {
      console.log(`${chalk.red("-")} ${difference.value.trim()}`);
    }
  }
}

/**
 * Helper function to print out an error message and then exit the program.
 *
 * All of the arguments will be passed to the `console.error` function.
 */
export function fatalError(...args: unknown[]): never {
  console.error(...args);
  process.exit(1);
}

/**
 * Helper function to get the command-line arguments passed to the program/script.
 *
 * This is an alias for: `process.argv.slice(2)`
 */
export function getArgs(): string[] {
  return process.argv.slice(2);
}
