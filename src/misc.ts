import chalk from "chalk";
import { execSync, spawnSync, SpawnSyncReturns } from "child_process";
import moment from "moment";
import { CWD } from "./constants";

// Use this on a switch statement's default case to get
// the linter to complain if a case was not predicted
export const ensureAllCases = (obj: never): never => obj;

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
  cwd = CWD,
): [number | null, string] {
  // On Windows, "spawnSync()" will not account for spaces in arguments
  // Thus, wrap everything in a double quote
  // This will cause arguments that naturally have double quotes to fail
  for (let i = 0; i < args.length; i++) {
    args[i] = `"${args[i]}"`;
  }

  const commandDescription = `${command} ${args.join(" ")}`;

  let spawnSyncReturns: SpawnSyncReturns<Buffer>;
  try {
    spawnSyncReturns = spawnSync(command, args, {
      shell: true,
      cwd,
    });
  } catch (err) {
    console.error(
      `Failed to run the "${chalk.green(commandDescription)}" command:`,
      err,
    );
    process.exit(1);
  }

  const exitStatus = spawnSyncReturns.status;
  const stdout = spawnSyncReturns.output.join("\n").trim();

  if (exitStatus !== 0) {
    if (allowFailure) {
      return [exitStatus, stdout];
    }

    console.error(
      `Failed to run the "${chalk.green(
        commandDescription,
      )}" command with an exit code of ${exitStatus}.`,
    );
    console.error("The output was as follows:");
    console.error(stdout);
    process.exit(1);
  }

  return [exitStatus, stdout];
}

export function getTime(): string {
  return moment().format("h:mm:ss A"); // e.g. "1:23:45 AM"
}

// From: https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space
export function hasWhiteSpace(s: string): boolean {
  return /\s/g.test(s);
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

export function sleep(milliseconds: number): Promise<() => void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

// Convert snake_case and kebab-case to camelCase
// From: https://hisk.io/javascript-snake-to-camel/
export function snakeKebabToCamel(str: string): string {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", ""),
  );
}
