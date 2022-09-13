import chalk from "chalk";
import { fork, spawn } from "child_process";
import path from "path";
import { Config } from "../../classes/Config";
import {
  CWD,
  FILE_SYNCED_MESSAGE,
  MAIN_LUA,
  MOD_SOURCE_PATH,
  PACKAGE_JSON_PATH,
  PROJECT_NAME,
} from "../../constants";
import { prepareCustomStages } from "../../customStage";
import { getAndValidateIsaacScriptMonorepoDirectory } from "../../dev";
import { PackageManager } from "../../enums/PackageManager";
import { execShell } from "../../exec";
import * as file from "../../file";
import { getJSONC } from "../../json";
import {
  getPackageManagerAddCommand,
  getPackageManagerUsedForExistingProject,
} from "../../packageManager";
import { Args } from "../../parseArgs";
import { getFirstTSConfigIncludePath } from "../../tsconfig";
import { error, getModTargetDirectoryName, isRecord } from "../../utils";
import { COMPILATION_SUCCESSFUL } from "./constants";
import { copyWatcherMod } from "./copyWatcherMod";
import * as notifyGame from "./notifyGame";
import { spawnSaveDatWriter } from "./spawnSaveDatWriter";
import { touchWatcherSaveDatFiles } from "./touchWatcherSaveDatFiles";

const REQUIRED_PACKAGE_JSON_DEPENDENCIES = [
  "isaac-typescript-definitions",
  "isaacscript",
  // - "isaacscript-common" is not required.
  // - "isaacscript-lint" is not required.
  // - "isaacscript-spell" is not required.
  "typescript",
  "typescript-to-lua",
];

let compilationStartTime = new Date();

export async function monitor(args: Args, config: Config): Promise<void> {
  const verbose = args.verbose === true;
  const skipProjectChecks = args.skipProjectChecks === true;
  const packageManager = getPackageManagerUsedForExistingProject(args, verbose);

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
    validatePackageJSONDependencies(args, verbose);
  }

  // Read the "tsconfig.json" file.
  const tsConfigInclude = getFirstTSConfigIncludePath(verbose);
  const resolvedIncludePath = path.resolve(CWD, tsConfigInclude);
  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);

  // Prepare the IsaacScript watcher mod.
  copyWatcherMod(config, verbose);
  touchWatcherSaveDatFiles(config, verbose);

  // Prepare the custom stages feature, if necessary.
  await prepareCustomStages(packageManager, verbose);

  // Delete and re-copy the mod every time IsaacScript starts. This ensures that it is always the
  // latest version.
  if (file.exists(modTargetPath, verbose)) {
    file.deleteFileOrDirectory(modTargetPath, verbose);
  }

  // Perform the steps to link to a development version of "isaacscript-common", if necessary.
  if (config.isaacScriptCommonDev === true) {
    linkDevelopmentIsaacScriptCommon(CWD, packageManager, verbose);
  }

  // Subprocess #1 - The "save#.dat" file writer.
  spawnSaveDatWriter(config);

  // Subprocess #2 - The mod directory syncer.
  spawnModDirectorySyncer(config);

  // Subprocess #3 - `tstl --watch` (to automatically convert TypeScript to Lua).
  spawnTSTLWatcher(config, CWD);

  // Subprocess #4 - `tstl --watch` (for the development version of `isaacscript-common`).
  if (config.isaacScriptCommonDev === true) {
    const isaacScriptMonorepoDirectory =
      getAndValidateIsaacScriptMonorepoDirectory(CWD, verbose);
    const isaacScriptCommonDirectory = path.join(
      isaacScriptMonorepoDirectory,
      "packages",
      "isaacscript-common",
    );
    if (
      !file.exists(isaacScriptCommonDirectory, verbose) ||
      !file.isDir(isaacScriptCommonDirectory, verbose)
    ) {
      console.error(
        `The "isaacscript-common" directory does not exist at: ${isaacScriptCommonDirectory}`,
      );
      error(
        'Please make sure that the IsaacScript repository is placed next to this one. If you do not want to test a local version of "isaacscript-common", then set the "isaacScriptCommonDev" field to false in your "isaacscript.json" file.',
      );
    }

    spawnTSTLWatcher(config, isaacScriptCommonDirectory);
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

function validatePackageJSONDependencies(args: Args, verbose: boolean) {
  const packageJSON = getJSONC(PACKAGE_JSON_PATH, verbose);

  const { dependencies } = packageJSON;
  if (!isRecord(dependencies)) {
    error(
      `Failed to parse the dependencies of: ${chalk.green(PACKAGE_JSON_PATH)}`,
    );
  }

  const dependenciesArray = Object.keys(dependencies);

  for (const dependency of REQUIRED_PACKAGE_JSON_DEPENDENCIES) {
    if (!dependenciesArray.includes(dependency)) {
      const packageManager = getPackageManagerUsedForExistingProject(
        args,
        verbose,
      );
      const addCommand = getPackageManagerAddCommand(
        packageManager,
        dependency,
      );
      error(
        `${chalk.red(
          `IsaacScript projects require a dependency of "${dependency}" in the "package.json" file. You can add it with the following command:`,
        )} ${chalk.green(addCommand)}`,
      );
    }
  }
}

function linkDevelopmentIsaacScriptCommon(
  projectPath: string,
  packageManager: PackageManager,
  verbose: boolean,
) {
  if (packageManager !== PackageManager.YARN) {
    error(
      `If you want to use this mod to develop/test "isaacscript-common", then the mod must be set up using the Yarn package manager instead of: ${packageManager}`,
    );
  }

  const isaacScriptMonorepoDirectory =
    getAndValidateIsaacScriptMonorepoDirectory(projectPath, verbose);

  console.log('Building "isaacscript-common" and setting up the link...');
  const linkScript = path.join(
    isaacScriptMonorepoDirectory,
    "link-isaacscript-common.sh",
  );
  execShell("bash", [linkScript], verbose);

  console.log(
    'Linking this repository to the development version of "isaacscript-common"...',
  );
  execShell(
    "yarn",
    ["link", "isaacscript-common"],
    verbose,
    false,
    projectPath,
  );
}

function spawnModDirectorySyncer(config: Config) {
  const processName = "modDirectorySyncer";
  const processDescription = "Directory syncer";
  const processPath = path.join(__dirname, processName, processName);
  const modTargetName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetName);
  const directorySyncer = fork(processPath, [MOD_SOURCE_PATH, modTargetPath]);

  directorySyncer.on("message", (msg: string) => {
    notifyGame.msg(msg);

    // If the "main.lua" file was successfully copied over, we also have to tell isaacscript-watcher
    // to reload the mod. Look for something like: "File synced: \main.lua"
    if (msg === `${FILE_SYNCED_MESSAGE} ${path.sep}${MAIN_LUA}`) {
      notifyGame.command(`luamod ${modTargetName}`);
      notifyGame.command("restart");
      notifyGame.msg("Reloaded the mod.");
    }
  });

  directorySyncer.on("close", (code: number | null) => {
    error(`Error: ${processDescription} subprocess closed with code: ${code}`);
  });

  directorySyncer.on("exit", (code: number | null) => {
    error(`Error: ${processDescription} subprocess exited with code: ${code}`);
  });
}

function spawnTSTLWatcher(config: Config, cwd: string) {
  const processDescription = "tstl";
  const tstl = spawn("npx", ["tstl", "--watch", "--preserveWatchOutput"], {
    shell: true,
    cwd,
  });

  tstl.stdout.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    const suffix = getMonitorMessageSuffix(config, cwd);

    if (msg.includes("Starting compilation in watch mode...")) {
      const newMsg1 = `${PROJECT_NAME} is now watching for future changes${suffix}.`;
      notifyGame.msg(newMsg1);
      const target = suffix.includes("isaacscript-common")
        ? '"isaacscript-common"'
        : "the mod";
      const newMsg2 = `Compiling ${target} for the first time...`;
      notifyGame.msg(newMsg2);
    } else if (
      msg.includes("File change detected. Starting incremental compilation...")
    ) {
      compilationStartTime = new Date();
      const newMsg = `TypeScript change detected${suffix}. Compiling...`;
      notifyGame.msg(newMsg);
    } else if (msg.includes("Found 0 errors. Watching for file changes.")) {
      const compilationFinishTime = new Date();
      const elapsedTimeMilliseconds =
        compilationFinishTime.getTime() - compilationStartTime.getTime();
      const elapsedTimeSeconds = elapsedTimeMilliseconds / 1000;
      const newMsg = `${COMPILATION_SUCCESSFUL} (in ${elapsedTimeSeconds} seconds)${suffix}`;
      notifyGame.msg(newMsg);
    } else {
      notifyGame.msg(msg);
    }
  });

  tstl.stderr.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg === "^C") {
      // Hide the line that appears when you cancel the program with `Ctrl + c`.
      return;
    }
    notifyGame.msg(`Error: ${msg}`);
  });

  tstl.on("close", (code) => {
    error(`Error: ${processDescription} subprocess exited with code: ${code}`);
  });

  tstl.on("exit", (code) => {
    error(`Error: ${processDescription} subprocess exited with code: ${code}`);
  });
}

function getMonitorMessageSuffix(config: Config, cwd: string): string {
  if (config.isaacScriptCommonDev !== true) {
    return "";
  }

  const baseName = path.basename(cwd);
  return baseName === "isaacscript-common"
    ? ' (in "isaacscript-common")'
    : " (in this mod)";
}
