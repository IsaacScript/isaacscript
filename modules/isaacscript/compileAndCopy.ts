import * as file from "../common/file";
import { execShell } from "../common/misc";

export function main(modSourcePath: string, modTargetPath: string): void {
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
