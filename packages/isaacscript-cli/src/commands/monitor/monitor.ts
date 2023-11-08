import { Command } from "@commander-js/extra-typings";
import chalk from "chalk";
import {
  PackageManager,
  deleteFileOrDirectory,
  fatalError,
  getPackageManagerInstallCommand,
  isDirectory,
  isLink,
  touch,
} from "isaacscript-common-node";
import path from "node:path";
import { printBanner } from "../../banner.js";
import { getConfigFromFile } from "../../configFile.js";
import { CWD, MOD_SOURCE_PATH } from "../../constants.js";
import { prepareCustomStages } from "../../customStage.js";
import { getAndValidateIsaacScriptMonorepoDirectory } from "../../dev.js";
import { execShell, execShellString } from "../../exec.js";
import {
  PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT,
  getPackageManagerUsedForExistingProject,
} from "../../packageManager.js";
import { getFirstTSConfigIncludePath } from "../../tsconfig.js";
import { getModTargetDirectoryName } from "../../utils.js";
import {
  validateDepsInstalled,
  validateInIsaacScriptProject,
  validatePackageJSONDependencies,
} from "../../validateMod.js";
import { copyWatcherMod } from "./copyWatcherMod.js";
import { notifyGamePing } from "./notifyGame.js";
import { spawnModDirectorySyncer } from "./spawnModDirectorySyncer.js";
import { spawnSaveDatWriter } from "./spawnSaveDatWriter.js";
import { spawnTSTLWatcher } from "./spawnTSTLWatcher.js";
import { touchWatcherSaveDatFiles } from "./touchWatcherSaveDatFiles.js";

export const monitorCommand = new Command()
  .command("monitor")
  .description("Monitor an IsaacScript mod project for changes.")
  .allowExcessArguments(false) // By default, Commander.js will allow extra positional arguments.
  .helpOption("-h, --help", "Display the list of options for this command.")
  .option(
    "--skip-project-checks",
    'Skip checking for "package.json" and "node_modules".',
    false,
  )
  .option("-v, --verbose", "Enable verbose output.", false)
  .action(async (options) => {
    await monitor(options);
  });

const monitorOptions = monitorCommand.opts();
type MonitorOptions = typeof monitorOptions;

export async function monitor(options: MonitorOptions): Promise<void> {
  const { skipProjectChecks, verbose } = options;

  printBanner();

  const packageManager = getPackageManagerUsedForExistingProject();

  if (!skipProjectChecks) {
    validateInIsaacScriptProject();
    validatePackageJSONDependencies();
    validateDepsInstalled(verbose);
  }

  const config = await getConfigFromFile();

  // Read the "tsconfig.json" file.
  const tsConfigInclude = getFirstTSConfigIncludePath();
  const resolvedIncludePath = path.resolve(CWD, tsConfigInclude);
  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);

  // Prepare the IsaacScript watcher mod.
  copyWatcherMod(config);
  touchWatcherSaveDatFiles(config);

  // Perform the steps to link to a development version of "isaacscript-common", if necessary. (This
  // has to be before preparing custom stages.)
  if (config.isaacScriptCommonDev === true) {
    linkDevelopmentIsaacScriptCommon(CWD, packageManager, verbose);
  } else {
    warnIfIsaacScriptCommonLinkExists(CWD, packageManager);
  }

  // Prepare the custom stages feature, if necessary.
  await prepareCustomStages(packageManager, verbose);

  // Delete and re-copy the mod every time IsaacScript starts. This ensures that it is always the
  // latest version.
  deleteFileOrDirectory(modTargetPath);

  // Subprocess #1 - The "save#.dat" file writer.
  spawnSaveDatWriter(config);

  // Subprocess #2 - The mod directory syncer.
  spawnModDirectorySyncer(config);

  // Subprocess #3 - `tstl --watch` (to automatically convert TypeScript to Lua).
  spawnTSTLWatcher(config, CWD, packageManager);

  // Subprocess #4 - `tstl --watch` (for the development version of `isaacscript-common`).
  if (config.isaacScriptCommonDev === true) {
    const isaacScriptMonorepoDirectory =
      getAndValidateIsaacScriptMonorepoDirectory(CWD);
    const isaacScriptCommonDirectory = path.join(
      isaacScriptMonorepoDirectory,
      "packages",
      "isaacscript-common",
    );
    if (!isDirectory(isaacScriptCommonDirectory)) {
      console.error(
        `The "isaacscript-common" directory does not exist at: ${isaacScriptCommonDirectory}`,
      );
      fatalError(
        'Please make sure that the IsaacScript repository is placed next to this one. If you do not want to test a local version of "isaacscript-common", then set the "isaacScriptCommonDev" field to false in your "isaacscript.json" file.',
      );
    }

    spawnTSTLWatcher(config, isaacScriptCommonDirectory, packageManager, CWD);
  }

  // Also, start constantly pinging the watcher mod.
  setInterval(() => {
    notifyGamePing();
  }, 1000); // Every second

  console.log("Automatically monitoring the following for changes:");
  console.log(
    `1) your TypeScript code:     ${chalk.green(resolvedIncludePath)}`,
  );
  console.log(`2) the source mod directory: ${chalk.green(MOD_SOURCE_PATH)}`);
  console.log("");
  console.log(`Copying files to:            ${chalk.green(modTargetPath)}`);
  console.log("");
  // (The process will now continue indefinitely for as long as the subprocesses exist.)
}

function linkDevelopmentIsaacScriptCommon(
  projectPath: string,
  packageManager: PackageManager,
  verbose: boolean,
) {
  if (packageManager !== PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT) {
    fatalError(
      `If you want to use this mod to develop/test "isaacscript-common", then the mod must be set up using the ${PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT} package manager instead of: ${packageManager}`,
    );
  }

  const isaacScriptMonorepoDirectory =
    getAndValidateIsaacScriptMonorepoDirectory(projectPath);

  console.log('Building "isaacscript-common"...');

  // Run "yarn install" at the root of the monorepo.
  const installCommand = getPackageManagerInstallCommand(packageManager);
  execShellString(installCommand, verbose, false, isaacScriptMonorepoDirectory);

  // Build "isaacscript-common".
  const iscPackagePath = path.join(
    isaacScriptMonorepoDirectory,
    "packages",
    "isaacscript-common",
  );
  const buildCommand = "npm run build";
  execShellString(buildCommand, verbose, false, iscPackagePath);

  console.log(
    'Linking this repository to the development version of "isaacscript-common"...',
  );
  const yarnLockPath = path.join(iscPackagePath, "yarn.lock");
  touch(yarnLockPath);
  execShell(
    PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT,
    ["link", iscPackagePath],
    verbose,
    false,
    projectPath,
  );
}

function warnIfIsaacScriptCommonLinkExists(
  projectPath: string,
  packageManager: PackageManager,
) {
  const isaacScriptCommonPath = path.join(
    projectPath,
    "node_modules",
    "isaacscript-common",
  );

  if (
    isLink(isaacScriptCommonPath) &&
    packageManager !== PackageManager.pnpm // pnpm uses links, so it will cause a false positive.
  ) {
    fatalError(
      `Your "node_modules/isaacscript-common" directory is linked, but you do not have "isaacScriptCommonDev" set to true in your "isaacscript.json" file. You must either set it to true or remove the link via: ${PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT} unlink isaacscript-common`,
    );
  }
}
