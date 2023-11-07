import { Command } from "@commander-js/extra-typings";
import type { PackageManager } from "isaacscript-common-node";
import {
  copyFileOrDirectory,
  deleteFileOrDirectory,
  getPackageManagerExecCommand,
} from "isaacscript-common-node";
import path from "node:path";
import { getConfigFromFile } from "../../configFile.js";
import { MOD_SOURCE_PATH } from "../../constants.js";
import { prepareCustomStages } from "../../customStage.js";
import { execShellString } from "../../exec.js";
import { getPackageManagerUsedForExistingProject } from "../../packageManager.js";
import { getModTargetDirectoryName } from "../../utils.js";

export const copyCommand = new Command()
  .command("copy")
  .description("Only compile & copy the mod.")
  .helpOption("-h, --help", "Display the list of options for this command.")
  .option("-v, --verbose", "Enable verbose output.", false)
  .action(async (options) => {
    await copy(options);
  });

const copyOptions = copyCommand.opts();
type CopyOptions = typeof copyOptions;

export async function copy(options: CopyOptions): Promise<void> {
  const { verbose } = options;

  const packageManager = getPackageManagerUsedForExistingProject();
  const config = await getConfigFromFile();
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
  await prepareCustomStages(packageManager, verbose);
  compile(packageManager, verbose);
  copyMod(modSourcePath, modTargetPath);
}

function compile(packageManager: PackageManager, verbose: boolean) {
  const command = getPackageManagerExecCommand(packageManager);
  execShellString(`${command} tstl`, verbose);
  console.log("Mod compiled successfully.");
}

function copyMod(modSourcePath: string, modTargetPath: string) {
  deleteFileOrDirectory(modTargetPath);
  copyFileOrDirectory(modSourcePath, modTargetPath);
  console.log("Mod copied successfully.");
}
