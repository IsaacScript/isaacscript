import { Config } from "../Config";
import * as configFile from "../configFile";
import { MOD_SOURCE_PATH } from "../constants";
import * as file from "../file";
import { execShell } from "../misc";

export default function copy(config: Config | null): void {
  if (config === null) {
    configFile.errorNotExist();
    return;
  }

  compileAndCopy(MOD_SOURCE_PATH, config.modTargetPath);
}

export function compileAndCopy(
  modSourcePath: string,
  modTargetPath: string,
): void {
  compile();
  copyMod(modSourcePath, modTargetPath);
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
