import path from "path";
import { CURRENT_DIRECTORY_NAME, MOD_SOURCE_PATH } from "../../constants";
import * as file from "../../file";
import { execShell } from "../../misc";
import { monkeyPatchMainLua } from "../../monkeyPatch";
import { Config } from "../../types/Config";

export default function copy(config: Config): void {
  const modTargetPath = path.join(config.modsDirectory, CURRENT_DIRECTORY_NAME);
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

function compile(): void {
  execShell("npx", ["tstl"]);
  console.log("Mod compiled successfully.");
}

function copyMod(modSourcePath: string, modTargetPath: string): void {
  file.deleteDir(modTargetPath);
  file.copy(modSourcePath, modTargetPath);
  console.log("Mod copied successfully.");
}
