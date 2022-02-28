import path from "path";
import { MOD_SOURCE_PATH } from "../../constants";
import { execShell } from "../../exec";
import * as file from "../../file";
import { Config } from "../../types/Config";
import { getModTargetDirectoryName, getTSTLArgs } from "../../utils";

export function copy(argv: Record<string, unknown>, config: Config): void {
  const verbose = argv.verbose === true;

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
  // monkeyPatchMainLua(modSourcePath);
  copyMod(modSourcePath, modTargetPath, verbose);
}

function compile(verbose: boolean) {
  const tstlArgs = getTSTLArgs(false);
  execShell("node", tstlArgs, verbose);
  console.log("Mod compiled successfully.");
}

function copyMod(
  modSourcePath: string,
  modTargetPath: string,
  verbose: boolean,
) {
  if (file.exists(modTargetPath)) {
    file.deleteFileOrDirectory(modTargetPath, verbose);
  }
  file.copy(modSourcePath, modTargetPath, verbose);
  console.log("Mod copied successfully.");
}
