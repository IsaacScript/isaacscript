import path from "node:path";
import { Config } from "../../classes/Config.js";
import { MOD_SOURCE_PATH } from "../../constants.js";
import { prepareCustomStages } from "../../customStage.js";
import { PackageManager } from "../../enums/PackageManager.js";
import { execShell } from "../../exec.js";
import * as file from "../../file.js";
import { getPackageManagerUsedForExistingProject } from "../../packageManager.js";
import { Args } from "../../parseArgs.js";
import { getModTargetDirectoryName } from "../../utils.js";

export async function copy(args: Args, config: Config): Promise<void> {
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
  compile(verbose);
  copyMod(modSourcePath, modTargetPath, verbose);
}

function compile(verbose: boolean) {
  execShell("npx", ["tstl"], verbose);
  console.log("Mod compiled successfully.");
}

function copyMod(
  modSourcePath: string,
  modTargetPath: string,
  verbose: boolean,
) {
  if (file.exists(modTargetPath, verbose)) {
    file.deleteFileOrDirectory(modTargetPath, verbose);
  }
  file.copy(modSourcePath, modTargetPath, verbose);
  console.log("Mod copied successfully.");
}
