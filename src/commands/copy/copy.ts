import path from "path";
import { MOD_SOURCE_PATH } from "../../constants";
import * as file from "../../file";
import { monkeyPatchMainLua } from "../../monkeyPatch";
import { Config } from "../../types/Config";
import { execShell, getModTargetDirectoryName } from "../../util";

export default function copy(config: Config): void {
  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);
  compileAndCopy(MOD_SOURCE_PATH, modTargetPath);
}

export function compileAndCopy(
  modSourcePath: string,
  modTargetPath: string,
): void {
  compile();
  copyMod(modSourcePath, modTargetPath);
  monkeyPatchMainLua(modTargetPath);
}

function compile() {
  execShell("npx", ["tstl"]);
  console.log("Mod compiled successfully.");
}

function copyMod(modSourcePath: string, modTargetPath: string) {
  file.deleteDir(modTargetPath);
  file.copy(modSourcePath, modTargetPath);
  console.log("Mod copied successfully.");
}
