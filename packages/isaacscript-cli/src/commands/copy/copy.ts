import path from "node:path";
import { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import { MOD_SOURCE_PATH } from "../../constants.js";
import { prepareCustomStages } from "../../customStage.js";
import { PackageManager } from "../../enums/PackageManager.js";
import { execShellString } from "../../exec.js";
import { copyFile, deleteFileOrDirectory, fileExists } from "../../file.js";
import {
  getPackageManagerExecCommand,
  getPackageManagerUsedForExistingProject,
} from "../../packageManager.js";
import { Args } from "../../parseArgs.js";
import { getModTargetDirectoryName } from "../../utils.js";

export async function copy(args: Args, config: ValidatedConfig): Promise<void> {
  const verbose = args.verbose === true;
  const packageManager = getPackageManagerUsedForExistingProject(args, verbose);

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
  copyMod(modSourcePath, modTargetPath, verbose);
}

function compile(packageManager: PackageManager, verbose: boolean) {
  const packageManagerExecCommand =
    getPackageManagerExecCommand(packageManager);
  execShellString(`${packageManagerExecCommand} tstl`, verbose);
  console.log("Mod compiled successfully.");
}

function copyMod(
  modSourcePath: string,
  modTargetPath: string,
  verbose: boolean,
) {
  if (fileExists(modTargetPath, verbose)) {
    deleteFileOrDirectory(modTargetPath, verbose);
  }
  copyFile(modSourcePath, modTargetPath, verbose);
  console.log("Mod copied successfully.");
}
