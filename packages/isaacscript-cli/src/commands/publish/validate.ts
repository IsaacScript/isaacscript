import chalk from "chalk";
import {
  PACKAGE_JSON,
  fatalError,
  isFile,
  isGitRepository,
  isGitRepositoryClean,
  isLoggedInToNPM,
} from "isaacscript-common-node";
import { CWD, PROJECT_NAME } from "../../constants.js";
import { execPowershell } from "../../exec.js";

export function validate(
  typeScript: boolean,
  setVersion: string | undefined,
  verbose: boolean,
): void {
  if (!isGitRepository(CWD)) {
    fatalError(
      "Failed to publish since the current working directory is not inside of a git repository.",
    );
  }

  if (!isGitRepositoryClean(CWD)) {
    fatalError(
      "Failed to publish since the Git repository was dirty. Before publishing, you must push any current changes to git. (Version commits should not contain any code changes.)",
    );
  }

  if (!isFile(PACKAGE_JSON)) {
    fatalError(
      `Failed to find the "${PACKAGE_JSON}" file in the current working directory.`,
    );
  }

  if (setVersion !== undefined && /^\d+\.\d+\.\d+$/.exec(setVersion) === null) {
    fatalError(
      chalk.red(
        `The version of "${setVersion}" does not match the semantic versioning format.`,
      ),
    );
  }

  if (typeScript) {
    validateTypeScriptProject();
  } else {
    validateIsaacScriptMod(verbose);
  }
}

function validateTypeScriptProject() {
  if (!isLoggedInToNPM()) {
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
      line.includes("node.exe") &&
      line.includes("isaacscript") &&
      !line.includes("isaacscript publish"),
  );
  if (otherCopiesOfRunningIsaacScript.length > 0) {
    fatalError(
      chalk.red(
        `Other copies of ${PROJECT_NAME} appear to be running. You must close those copies before publishing.`,
      ),
    );
  }
}
