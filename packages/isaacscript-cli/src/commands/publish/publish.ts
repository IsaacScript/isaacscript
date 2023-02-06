import chalk from "chalk";
import { error } from "isaacscript-common-ts";
import { Config } from "../../classes/Config.js";
import {
  BUILD_SCRIPT,
  LINT_SCRIPT,
  PACKAGE_JSON,
  UPDATE_SCRIPT,
} from "../../constants.js";
import { PackageManager } from "../../enums/PackageManager.js";
import { execShell, execShellString } from "../../exec.js";
import { fileExists, getHashOfFile } from "../../file.js";
import { gitCommitAllAndPush, isGitClean, isGitRepository } from "../../git.js";
import {
  getPackageManagerInstallCommand,
  getPackageManagerUsedForExistingProject,
} from "../../packageManager.js";
import { Args } from "../../parseArgs.js";
import { publishIsaacScriptMod } from "./isaacscriptMod.js";
import { publishTypeScriptProject } from "./typeScript.js";

export async function publish(
  args: Args,
  config: Config,
  typeScript: boolean,
): Promise<void> {
  const { setVersion } = args;
  const skipUpdate = args.skipUpdate === true;
  const skipLint = args.skipLint === true;
  const verbose = args.verbose === true;

  // Shared validation for both TypeScript projects and IsaacScript mods.
  validate(setVersion, verbose);

  // Shared initial steps for both TypeScript projects and IsaacScript mods.
  execShellString("git pull --rebase");
  const packageManager = getPackageManagerUsedForExistingProject(args, verbose);
  updateDependencies(skipUpdate, packageManager, verbose);
  incrementVersion(args, packageManager);
  tryRunBashScript(BUILD_SCRIPT, verbose);
  if (!skipLint) {
    tryRunBashScript(LINT_SCRIPT, verbose);
  }

  if (typeScript) {
    publishTypeScriptProject(args);
  } else {
    await publishIsaacScriptMod(args, config);
  }
}

function validate(setVersion: string | undefined, verbose: boolean) {
  if (!isGitRepository(verbose)) {
    error(
      "Failed to publish since the current working directory is not inside of a git repository.",
    );
  }

  if (!isGitClean(verbose)) {
    error(
      "Failed to publish since the Git repository was dirty. Before publishing, you must push any current changes to git. (Version commits should not contain any code changes.)",
    );
  }

  if (!fileExists(PACKAGE_JSON, verbose)) {
    error(
      `Failed to find the "${PACKAGE_JSON}" file in the current working directory.`,
    );
  }

  if (setVersion !== undefined && /^\d+\.\d+\.\d+$/.exec(setVersion) === null) {
    error(
      chalk.red(
        `The version of "${setVersion}" does not match the semantic versioning format.`,
      ),
    );
  }
}

function updateDependencies(
  skipUpdate: boolean,
  packageManager: PackageManager,
  verbose: boolean,
) {
  if (skipUpdate) {
    return;
  }

  if (!fileExists(UPDATE_SCRIPT, verbose)) {
    return;
  }

  console.log("Updating NPM dependencies...");

  const beforeHash = getHashOfFile(PACKAGE_JSON);
  execShell("bash", [UPDATE_SCRIPT], verbose);
  const afterHash = getHashOfFile(PACKAGE_JSON);

  if (beforeHash !== afterHash) {
    const packageManagerInstallCommand =
      getPackageManagerInstallCommand(packageManager);
    execShellString(packageManagerInstallCommand, verbose);
    gitCommitAllAndPush("chore: update deps", verbose);
  }
}

function incrementVersion(args: Args, packageManager: PackageManager) {
  const skipIncrement = args.skipIncrement === true;
  const verbose = args.verbose === true;

  if (skipIncrement) {
    return;
  }

  const versionFlag = getVersionFlag(args);
  // The "--no-git-tag-version" flag will prevent the package manager from both making a commit and
  // adding a tag.
  execShellString(
    `${packageManager} version --no-git-tag-version --${versionFlag}`,
    verbose,
  );
}

function getVersionFlag(args: Args): string {
  const major = args.major === true;
  if (major) {
    return "major";
  }

  const minor = args.minor === true;
  if (minor) {
    return "minor";
  }

  const patch = args.patch === true;
  if (patch) {
    return "patch";
  }

  // Default to a patch version.
  return "patch";
}

function tryRunBashScript(scriptName: string, verbose: boolean) {
  if (!fileExists(scriptName, verbose)) {
    error(
      `Failed to find the script "${scriptName}" in the current working directory.`,
    );
  }

  const { exitStatus, stdout } = execShell("bash", [scriptName], verbose, true);

  if (exitStatus !== 0) {
    execShellString("git reset --hard", verbose); // Revert the version changes.
    error(`Failed to run "${scriptName}":`, stdout);
  }
}
