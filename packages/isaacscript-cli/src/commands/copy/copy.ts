import type { PackageManager } from "isaacscript-common-node";
import {
  copyFileOrDirectory,
  deleteFileOrDirectory,
  getPackageManagerExecCommand,
} from "isaacscript-common-node";
import path from "node:path";
import type { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import { MOD_SOURCE_PATH } from "../../constants.js";
import { prepareCustomStages } from "../../customStage.js";
import { execShellString } from "../../exec.js";
import { getPackageManagerUsedForExistingProject } from "../../packageManager.js";
import type { Args } from "../../parseArgs.js";
import { getModTargetDirectoryName } from "../../utils.js";

export async function copy(args: Args, config: ValidatedConfig): Promise<void> {
  const verbose = args.verbose === true;
  const packageManager = getPackageManagerUsedForExistingProject(args);

  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);

  await compileAndCopy(MOD_SOURCE_PATH, modTargetPath, packageManager, verbose);
}

export async function compileAndCopy(
  modSourcePath: string,
  modTargetPath: string,
  packageManager: PackageManager,
  verbose: boolean,
): Promise<void> {
  await prepareCustomStages(packageManager, verbose);
  compile(packageManager, verbose);
  copyMod(modSourcePath, modTargetPath);
}

function compile(packageManager: PackageManager, verbose: boolean) {
  const command = getPackageManagerExecCommand(packageManager);
  execShellString(`${command} tstl`, verbose);
  console.log("Mod compiled successfully.");
}

function copyMod(modSourcePath: string, modTargetPath: string) {
  deleteFileOrDirectory(modTargetPath);
  copyFileOrDirectory(modSourcePath, modTargetPath);
  console.log("Mod copied successfully.");
}
