import chalk from "chalk";
import {
  PACKAGE_JSON,
  PackageManager,
  deleteFileOrDirectory,
  dirName,
  fatalError,
  getJSONC,
  getPackageJSONDependencies,
  getPackageManagerAddCommand,
  getPackageManagerAddDevCommand,
  isDirectory,
  isLink,
  touch,
} from "isaacscript-common-node";
import path from "node:path";
import type { ValidatedConfig } from "../../classes/ValidatedConfig.js";
import { CWD, MOD_SOURCE_PATH, PACKAGE_JSON_PATH } from "../../constants.js";
import { prepareCustomStages } from "../../customStage.js";
import { getAndValidateIsaacScriptMonorepoDirectory } from "../../dev.js";
import { execShell, execShellString } from "../../exec.js";
import {
  PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT,
  getPackageManagerUsedForExistingProject,
} from "../../packageManager.js";
import type { Args } from "../../parseArgs.js";
import { getFirstTSConfigIncludePath } from "../../tsconfig.js";
import { getModTargetDirectoryName } from "../../utils.js";
import { copyWatcherMod } from "./copyWatcherMod.js";
import * as notifyGame from "./notifyGame.js";
import { spawnModDirectorySyncer } from "./spawnModDirectorySyncer.js";
import { spawnSaveDatWriter } from "./spawnSaveDatWriter.js";
import { spawnTSTLWatcher } from "./spawnTSTLWatcher.js";
import { touchWatcherSaveDatFiles } from "./touchWatcherSaveDatFiles.js";

const __dirname = dirName();

const REQUIRED_PACKAGE_JSON_DEPENDENCIES = [
  "isaac-typescript-definitions",
  // - "isaacscript-common" is not required.
] as const;

/**
 * We want "typescript" and some of the other dependencies to be in "devDependencies" instead of
 * "dependencies" because it prevents their functions from being placed into the list of
 * auto-complete functions.
 */
const REQUIRED_PACKAGE_JSON_DEV_DEPENDENCIES = [
  "isaacscript",
  // - "isaacscript-lint" is not required.
  // - "isaacscript-spell" is not required.
  // - "isaacscript-tsconfig" is not required.
  "typescript",
  "typescript-to-lua",
] as const;

export async function monitor(
  args: Args,
  config: ValidatedConfig,
): Promise<void> {
  const verbose = args.verbose === true;
  const skipProjectChecks = args.skipProjectChecks === true;
  const packageManager = getPackageManagerUsedForExistingProject(args);

  // If they specified some command-line flags, override the values found in the config file.
  if (args.modsDirectory !== undefined) {
    config.modsDirectory = args.modsDirectory; // eslint-disable-line no-param-reassign
  }
  if (args.saveSlot !== undefined) {
    config.saveSlot = args.saveSlot; // eslint-disable-line no-param-reassign
  }
  if (args.dev !== undefined) {
    config.isaacScriptCommonDev = args.dev; // eslint-disable-line no-param-reassign
  }

  // Pre-flight checks
  if (!skipProjectChecks) {
    validatePackageJSONDependencies(args);
  }

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
    notifyGame.ping();
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

function validatePackageJSONDependencies(args: Args) {
  const packageJSON = getJSONC(PACKAGE_JSON_PATH);
  validatePackageJSONNormalDependencies(packageJSON, args);
  validatePackageJSONDevDependencies(packageJSON, args);
}

function validatePackageJSONNormalDependencies(
  packageJSON: Record<string, unknown>,
  args: Args,
) {
  const dependencies =
    getPackageJSONDependencies(packageJSON, "dependencies") ?? {};
  const dependenciesArray = Object.keys(dependencies);

  for (const dependency of REQUIRED_PACKAGE_JSON_DEPENDENCIES) {
    if (!dependenciesArray.includes(dependency)) {
      const packageManager = getPackageManagerUsedForExistingProject(args);
      const addCommand = getPackageManagerAddCommand(
        packageManager,
        dependency,
      );
      fatalError(
        `${chalk.red(
          `IsaacScript projects require a dependency of "${dependency}" in the "${PACKAGE_JSON}" file. You can add it with the following command:`,
        )} ${chalk.green(addCommand)}`,
      );
    }
  }
}

function validatePackageJSONDevDependencies(
  packageJSON: Record<string, unknown>,
  args: Args,
) {
  const devDependencies =
    getPackageJSONDependencies(packageJSON, "devDependencies") ?? {};
  const devDependenciesArray = Object.keys(devDependencies);

  for (const devDependency of REQUIRED_PACKAGE_JSON_DEV_DEPENDENCIES) {
    if (!devDependenciesArray.includes(devDependency)) {
      const packageManager = getPackageManagerUsedForExistingProject(args);
      const addDevCommand = getPackageManagerAddDevCommand(
        packageManager,
        devDependency,
      );
      fatalError(
        `${chalk.red(
          `IsaacScript projects require a development dependency of "${devDependency}" in the "${PACKAGE_JSON}" file. You can add it with the following command:`,
        )} ${chalk.green(addDevCommand)}`,
      );
    }
  }
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
  const iscBuildScript = path.join(
    isaacScriptMonorepoDirectory,
    "packages",
    "isaacscript-common",
    "build.sh",
  );
  execShell("bash", [iscBuildScript], verbose);

  console.log(
    'Linking this repository to the development version of "isaacscript-common"...',
  );
  const iscDistDirectory = path.join(
    isaacScriptMonorepoDirectory,
    "dist",
    "packages",
    "isaacscript-common",
  );
  const yarnLockPath = path.join(iscDistDirectory, "yarn.lock");
  touch(yarnLockPath);
  execShellString(
    `${PACKAGE_MANAGER_USED_FOR_ISAACSCRIPT} link ${iscDistDirectory}`,
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
