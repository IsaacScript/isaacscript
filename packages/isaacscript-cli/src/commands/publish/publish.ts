import chalk from "chalk";
import { error } from "isaacscript-common-ts";
import { Config } from "../../classes/Config.js";
import { PACKAGE_JSON, UPDATE_SCRIPT } from "../../constants.js";
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
  const verbose = args.verbose === true;

  // Shared validation for both TypeScript projects and IsaacScript mods.
  validate(setVersion, verbose);

  // Shared initial steps for both TypeScript projects and IsaacScript mods.
  execShellString("git pull --rebase");
  const packageManager = getPackageManagerUsedForExistingProject(args, verbose);
  updateDependencies(skipUpdate, packageManager, verbose);

  if (typeScript) {
    publishTypeScriptProject(args, packageManager);
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
