import * as file from "./file";
import * as misc from "./misc";

export function main(modSourcePath: string, modTargetPath: string): void {
  compile();
  copyMod(modSourcePath, modTargetPath);
}

function compile(): void {
  misc.execCommand("npx", ["tstl"]);
  console.log("Mod compiled successfully.");
}

function copyMod(modSourcePath: string, modTargetPath: string): void {
  file.deleteDir(modTargetPath);
  file.copy(modSourcePath, modTargetPath);
  console.log("Mod copied successfully.");
}
