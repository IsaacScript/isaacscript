import path from "path";
import { Config } from "../../classes/Config";
import { MOD_SOURCE_PATH } from "../../constants";
import { fillCustomStageMetadata } from "../../customStage";
import { PackageManager } from "../../enums/PackageManager";
import { execShell } from "../../exec";
import * as file from "../../file";
import { getPackageManagerUsedForExistingProject } from "../../packageManager";
import { Args } from "../../parseArgs";
import { getModTargetDirectoryName } from "../../utils";

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
  await fillCustomStageMetadata(packageManager, verbose);
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
