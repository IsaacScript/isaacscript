import chalk from "chalk";
import { spawnSync } from "child_process";
import { SpawnSyncReturns } from "node:child_process";
import * as file from "./file";

export default function compileAndCopyMod(
  modSourcePath: string,
  modTargetPath: string,
): void {
  compile();
  copyMod(modSourcePath, modTargetPath);
}

function compile() {
  let spawnSyncReturns: SpawnSyncReturns<Buffer>;
  try {
    spawnSyncReturns = spawnSync("npx", ["tstl"], {
      shell: true,
    });
  } catch (err) {
    console.error(
      `Failed to run the "${chalk.green("npx tstl")}" command:`,
      err,
    );
    process.exit(1);
  }

  if (spawnSyncReturns.status !== 0) {
    console.error(`Failed to run the "${chalk.green("npx tstl")}" command.`);
    process.exit(1);
  }

  console.log("Mod compiled successfully!");
}

function copyMod(modSourcePath: string, modTargetPath: string) {
  file.deleteDir(modTargetPath);
  file.copy(modSourcePath, modTargetPath);
  console.log("Mod copied successfully!");
}
