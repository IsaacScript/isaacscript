import path from "path";
import { MOD_SOURCE_PATH } from "../../constants";
import { copyCustomStageRooms } from "../../customStage";
import { execShell } from "../../exec";
import * as file from "../../file";
import { Args } from "../../parseArgs";
import { Config } from "../../types/Config";
import { getModTargetDirectoryName } from "../../utils";

export function copy(args: Args, config: Config): void {
  const verbose = args.verbose === true;

  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);

  compileAndCopy(MOD_SOURCE_PATH, modTargetPath, verbose);
}

export function compileAndCopy(
  modSourcePath: string,
  modTargetPath: string,
  verbose: boolean,
): void {
  compile(verbose);
  copyCustomStageRooms(modSourcePath, modTargetPath, verbose);
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
