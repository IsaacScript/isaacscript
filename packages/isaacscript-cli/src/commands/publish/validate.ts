import chalk from "chalk";
import {
  fatalError,
  isFile,
  isGitRepository,
  isGitRepositoryClean,
  isLoggedInToNPM,
} from "complete-node";
import { CWD, PROJECT_NAME } from "../../constants.js";
import { execPowershell } from "../../exec.js";

export async function validate(
  typeScript: boolean,
  setVersion: string | undefined,
  verbose: boolean,
): Promise<void> {
  const isGitRepo = await isGitRepository(CWD);
  if (!isGitRepo) {
    fatalError(
      "Failed to publish since the current working directory is not inside of a git repository.",
    );
  }

  const isClean = await isGitRepositoryClean(CWD);
  if (!isClean) {
    fatalError(
      "Failed to publish since the Git repository was dirty. Before publishing, you must push any current changes to git. (Version commits should not contain any code changes.)",
    );
  }

  const packageJSONExists = await isFile("package.json");
  if (!packageJSONExists) {
    fatalError(
      'Failed to find the "package.json" file in the current working directory.',
    );
  }

  if (setVersion !== undefined && /^\d+\.\d+\.\d+$/.exec(setVersion) === null) {
    fatalError(
      chalk.red(
        `The version of "${setVersion}" does not match the semantic versioning format of: #.#.#`,
      ),
    );
  }

  if (typeScript) {
    await validateTypeScriptProject();
  } else {
    validateIsaacScriptMod(verbose);
  }
}

async function validateTypeScriptProject() {
  const isLoggedIn = await isLoggedInToNPM();
  if (!isLoggedIn) {
    fatalError(
      'Failed to publish since you are not logged in to npm. Try doing "npm login".',
    );
  }
}

function validateIsaacScriptMod(verbose: boolean) {
  validateIsaacScriptOtherCopiesNotRunning(verbose);
}

function validateIsaacScriptOtherCopiesNotRunning(verbose: boolean) {
  if (process.platform !== "win32") {
    return;
  }

  // From: https://securityboulevard.com/2020/01/get-process-list-with-command-line-arguments/
  const stdout = execPowershell(
    "Get-WmiObject Win32_Process -Filter \"name = 'node.exe'\" | Select-Object -ExpandProperty CommandLine",
    verbose,
  );
  const lines = stdout.split("\r\n");
  const otherCopiesOfRunningIsaacScript = lines.filter(
    (line) =>
      line.includes("node.exe")
      && line.includes("isaacscript")
      && !line.includes("isaacscript publish"),
  );
  if (otherCopiesOfRunningIsaacScript.length > 0) {
    fatalError(
      chalk.red(
        `Other copies of ${PROJECT_NAME} appear to be running. You must close those copies before publishing.`,
      ),
    );
  }
}
