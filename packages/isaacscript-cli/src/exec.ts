import chalk from "chalk";
import { fatalError } from "complete-node";
import type { SpawnSyncReturns } from "node:child_process";
import { execFileSync, execSync, spawnSync } from "node:child_process";
import { CWD } from "./constants.js";

export function execExe(
  path: string,
  args: readonly string[],
  verbose: boolean,
  cwd = CWD,
): string {
  if (verbose) {
    console.log(`Executing binary: ${path}`);
  }

  let stdout: string;
  try {
    const buffer = execFileSync(path, args, {
      cwd,
    });
    stdout = buffer.toString().trim();
  } catch (error) {
    fatalError(`Failed to run "${chalk.green(path)}":`, error);
  }

  if (verbose) {
    console.log(`Executed binary: ${path}`);
  }

  return stdout;
}

export function execPowershell(
  command: string,
  verbose = false,
  cwd = CWD,
): string {
  if (verbose) {
    console.log(`Executing PowerShell command: ${command}`);
  }

  let stdout: string;
  try {
    const buffer = execSync(command, {
      shell: "powershell.exe",
      cwd,
    });
    stdout = buffer.toString().trim();
  } catch (error) {
    fatalError(
      `Failed to run PowerShell command "${chalk.green(command)}":`,
      error,
    );
  }

  if (verbose) {
    console.log(`Executed PowerShell command: ${command}`);
  }

  return stdout;
}

/**
 * Returns a tuple of exit status and stdout. The stdout is trimmed for convenience.
 *
 * @param command The command to run.
 * @param args Default is [].
 * @param verbose Default is false.
 * @param allowFailure Default is false.
 * @param cwd Default is CWD.
 */
export function execShell(
  command: string,
  args: readonly string[] = [],
  verbose = false,
  allowFailure = false,
  cwd = CWD,
): { exitStatus: number; stdout: string } {
  // On Windows, "spawnSync()" will not account for spaces in arguments. Thus, wrap everything in a
  // double quote. This will cause arguments that naturally have double quotes to fail.
  if (command.includes("'") || command.includes('"')) {
    fatalError(
      "execShell cannot execute commands with single quotes or double quotes in the command.",
    );
  }

  const argsHasDoubleQuotes = args.some((arg) => arg.includes('"'));
  if (argsHasDoubleQuotes) {
    fatalError(
      "execShell cannot execute commands with double quotes in the arguments.",
    );
  }

  const quotedArgs = args.map((arg) => `"${arg}"`);
  const commandDescription = `${command} ${quotedArgs.join(" ")}`.trim();

  if (verbose) {
    console.log(`Executing command: ${commandDescription}`);
  }

  let spawnSyncReturns: SpawnSyncReturns<Buffer>;
  try {
    spawnSyncReturns = spawnSync(command, quotedArgs, {
      shell: true,
      cwd,
    });
  } catch (error) {
    fatalError(
      `Failed to run the "${chalk.green(commandDescription)}" command:`,
      error,
    );
  }

  if (verbose) {
    console.log(`Executed command: ${commandDescription}`);
  }

  const exitStatus = spawnSyncReturns.status;
  if (exitStatus === null) {
    fatalError(
      `Failed to get the return status of command: ${commandDescription}`,
    );
  }

  const stdout = spawnSyncReturns.output.join("\n").trim();

  if (exitStatus !== 0) {
    if (allowFailure) {
      return { exitStatus, stdout };
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

  return { exitStatus, stdout };
}

/**
 * Same as `execShell`, but accepts the command as a string instead of an array of arguments.
 *
 * @param commandString The command to run.
 * @param verbose Default is false.
 * @param allowFailure Default is false.
 * @param cwd Default is CWD.
 */
export function execShellString(
  commandString: string,
  verbose = false,
  allowFailure = false,
  cwd = CWD,
): { exitStatus: number; stdout: string } {
  const args = commandString.split(" ");
  const command = args.shift();
  if (command === undefined) {
    fatalError(
      `execShellString failed to parse the command of: ${commandString}`,
    );
  }

  return execShell(command, args, verbose, allowFailure, cwd);
}
