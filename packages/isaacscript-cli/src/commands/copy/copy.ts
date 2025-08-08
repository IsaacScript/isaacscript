import { Command } from "@commander-js/extra-typings";
import type { PackageManager } from "complete-node";
import {
  copyFileOrDirectory,
  deleteFileOrDirectory,
  getPackageManagerExecCommand,
} from "complete-node";
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
  .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
  .helpOption("-h, --help", "Display the list of options for this command.")
  .option("-v, --verbose", "Enable verbose output.", false)
  .action(async (options) => {
    await copy(options);
  });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const copyOptions = copyCommand.opts();
type CopyOptions = typeof copyOptions;

async function copy(options: CopyOptions) {
  const { verbose } = options;

  const packageManager = await getPackageManagerUsedForExistingProject();
  const config = await getConfigFromFile();
  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);

  await compileAndCopy(
    MOD_SOURCE_PATH,
    modTargetPath,
    packageManager,
    config.isaacScriptCommonDev,
    verbose,
  );
}

export async function compileAndCopy(
  modSourcePath: string,
  modTargetPath: string,
  packageManager: PackageManager,
  isaacScriptCommonDev: boolean | undefined,
  verbose: boolean,
): Promise<void> {
  await prepareCustomStages(packageManager, isaacScriptCommonDev, verbose);
  compile(packageManager, verbose);
  await copyMod(modSourcePath, modTargetPath);
}

function compile(packageManager: PackageManager, verbose: boolean) {
  const command = getPackageManagerExecCommand(packageManager);
  execShellString(`${command} tstl`, verbose);
  console.log("Mod compiled successfully.");
}

async function copyMod(modSourcePath: string, modTargetPath: string) {
  await deleteFileOrDirectory(modTargetPath);
  await copyFileOrDirectory(modSourcePath, modTargetPath);
  console.log("Mod copied successfully.");
}
