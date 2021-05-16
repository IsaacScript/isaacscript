import chalk from "chalk";
import { execSync, spawnSync, SpawnSyncReturns } from "child_process";
import moment from "moment";
import { CWD } from "./constants";

export function execExe(path: string, cwd = CWD): string {
  let stdout: string;
  try {
    const buffer = execSync(`"${path}"`, {
      cwd,
    });
    stdout = buffer.toString().trim();
  } catch (err) {
    console.error(`Failed to run "${chalk.green(path)}":`, err);
    process.exit(1);
  }

  return stdout;
}

export function execShell(
  command: string,
  args: string[],
  allowFailure = false,
): number | null {
  const commandDescription = `${command} ${args.join(" ")}`;

  let spawnSyncReturns: SpawnSyncReturns<Buffer>;
  try {
    spawnSyncReturns = spawnSync(command, args, {
      shell: true,
    });
  } catch (err) {
    console.error(
      `Failed to run the "${chalk.green(commandDescription)}" command:`,
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
        commandDescription,
      )}" command with an exit code of ${spawnSyncReturns.status}.`,
    );
    process.exit(1);
  }

  return spawnSyncReturns.status;
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

// Convert snake_case and kebab-case to camelCase
// From: https://hisk.io/javascript-snake-to-camel/
export function snakeKebabToCamel(str: string): string {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  );
}
