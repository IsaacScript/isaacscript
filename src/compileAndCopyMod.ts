import * as file from "./file";
import * as misc from "./misc";

export default function compileAndCopyMod(
  modSourcePath: string,
  modTargetPath: string,
): void {
  compile();
  console.log("ZZ", modSourcePath, modTargetPath);
  copyMod(modSourcePath, modTargetPath);
}

function compile() {
  misc.execCommand("npx tstl");
  console.log("Mod compiled successfully!");
}

function copyMod(modSourcePath: string, modTargetPath: string) {
  file.deleteDir(modTargetPath);
  file.copy(modSourcePath, modTargetPath);
  console.log("Mod copied successfully!");
}
