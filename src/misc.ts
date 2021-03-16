import chalk from "chalk";
import { execSync, spawnSync, SpawnSyncReturns } from "child_process";
import moment from "moment";
import { CWD } from "./constants";

export function execCommand(
  command: string,
  args: string[],
  allowFailure = false,
): number | null {
  let spawnSyncReturns: SpawnSyncReturns<Buffer>;
  try {
    spawnSyncReturns = spawnSync(command, args, {
      shell: true,
    });
  } catch (err) {
    console.error(
      `Failed to run the "${chalk.green(
        `${command} ${args.join(" ")}`,
      )}" command:`,
      err,
    );
    process.exit(1);
  }

  if (spawnSyncReturns.status !== 0) {
    if (allowFailure) {
      return spawnSyncReturns.status;
    }

    console.error(
      `Failed to run the "${chalk.green(
        `${command} ${args.join(" ")}`,
      )}" command.`,
    );
    process.exit(1);
  }

  return spawnSyncReturns.status;
}

export function execScript(path: string, cwd = CWD): string {
  let stdout: string;
  try {
    const buffer = execSync(`"${path}"`, {
      cwd,
    });
    stdout = buffer.toString().trim();
  } catch (err) {
    console.error(`Failed to run the "${chalk.green(path)}" script:`, err);
    process.exit(1);
  }

  return stdout;
}

export function getTime(): string {
  return moment().format("h:mm:ss A"); // e.g. "1:23:45 AM"
}

// parseIntSafe is a more reliable version of parseInt
// By default, "parseInt('1a')" will return "1", which is unexpected
// This returns either an integer or NaN
export function parseIntSafe(input: string): number {
  // Remove all leading and trailing whitespace
  let trimmedInput = input.trim();

  const isNegativeNumber = trimmedInput.startsWith("-");
  if (isNegativeNumber) {
    // Remove the leading minus sign before we match the regular expression
    trimmedInput = trimmedInput.substring(1);
  }

  if (/^\d+$/.exec(trimmedInput) === null) {
    // "\d" matches any digit (same as "[0-9]")
    return NaN;
  }

  if (isNegativeNumber) {
    // Add the leading minus sign back
    trimmedInput = `-${trimmedInput}`;
  }

  return parseInt(trimmedInput, 10);
}
