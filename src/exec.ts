import chalk from "chalk";
import { execSync, spawnSync, SpawnSyncReturns } from "child_process";
import { CWD } from "./constants";
import { error } from "./util";

export function execExe(path: string, verbose = false, cwd = CWD): string {
  if (verbose) {
    console.log(`Executing binary: ${path}`);
  }

  let stdout: string;
  try {
    const buffer = execSync(`"${path}"`, {
      cwd,
    });
    stdout = buffer.toString().trim();
  } catch (err) {
    error(`Failed to run "${chalk.green(path)}":`, err);
  }

  if (verbose) {
    console.log(`Executed binary: ${path}`);
  }

  return stdout;
}

/** Returns an array of exit status and stdout. */
export function execShell(
  command: string,
  args: string[] = [],
  verbose = false,
  allowFailure = false,
  cwd = CWD,
): [number, string] {
  // On Windows, "spawnSync()" will not account for spaces in arguments
  // Thus, wrap everything in a double quote
  // This will cause arguments that naturally have double quotes to fail
  if (command.includes('"')) {
    error(
      "execShell cannot execute commands with double quotes in the command.",
    );
  }
  for (let i = 0; i < args.length; i++) {
    if (args[i].includes('"')) {
      error(
        "execShell cannot execute commands with double quotes in the arguments.",
      );
    }

    args[i] = `"${args[i]}"`; // eslint-disable-line no-param-reassign
  }

  const commandDescription = `${command} ${args.join(" ")}`.trim();

  if (verbose) {
    console.log(`Executing command: ${commandDescription}`);
  }

  let spawnSyncReturns: SpawnSyncReturns<Buffer>;
  try {
    spawnSyncReturns = spawnSync(command, args, {
      shell: true,
      cwd,
    });
  } catch (err) {
    error(
      `Failed to run the "${chalk.green(commandDescription)}" command:`,
      err,
    );
  }

  if (verbose) {
    console.log(`Executed command: ${commandDescription}`);
  }

  const exitStatus = spawnSyncReturns.status;
  if (exitStatus === null) {
    error(
      `Failed to get the return status of th command: ${commandDescription}`,
    );
  }

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
