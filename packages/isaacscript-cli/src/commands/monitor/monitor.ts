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
  const dev = args.dev === true;
  const packageManager = getPackageManagerUsedForExistingProject(args, verbose);

  // If they specified some command-line flags, override the values found in the config file.
  if (args.modsDirectory !== undefined) {
    config.modsDirectory = args.modsDirectory; // eslint-disable-line no-param-reassign
  }
  if (args.saveSlot !== undefined) {
    config.saveSlot = args.saveSlot; // eslint-disable-line no-param-reassign
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

  // Subprocess #1 - The "save#.dat" file writer.
  spawnSaveDatWriter(config);

  // Subprocess #2 - The mod directory syncer.
  spawnModDirectorySyncer(config);

  // Subprocess #3 - `tstl --watch` (to automatically convert TypeScript to Lua).
  spawnTSTLWatcher(CWD);

  // Subprocess #4 - `tstl --watch` (for the development version of `isaacscript-common`).
  if (dev) {
    const isaacScriptMonorepoDirectory =
      getAndValidateIsaacScriptMonorepoDirectory(CWD, verbose);
    const isaacScriptCommonDirectory = path.join(
      isaacScriptMonorepoDirectory,
      "packages",
      "isaacscript-common",
    );
    spawnTSTLWatcher(isaacScriptCommonDirectory);
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

function spawnTSTLWatcher(cwd: string) {
  const processDescription = "tstl";
  const tstl = spawn("npx", ["tstl", "--watch", "--preserveWatchOutput"], {
    shell: true,
    cwd,
  });

  tstl.stdout.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg.includes("Starting compilation in watch mode...")) {
      const newMsg1 = `${PROJECT_NAME} is now watching for future changes.`;
      notifyGame.msg(newMsg1);
      const newMsg2 = "Compiling the mod for the first time...";
      notifyGame.msg(newMsg2);
    } else if (
      msg.includes("File change detected. Starting incremental compilation...")
    ) {
      compilationStartTime = new Date();
      const newMsg = "TypeScript change detected. Compiling...";
      notifyGame.msg(newMsg);
    } else if (msg.includes("Found 0 errors. Watching for file changes.")) {
      const compilationFinishTime = new Date();
      const elapsedTimeMilliseconds =
        compilationFinishTime.getTime() - compilationStartTime.getTime();
      const elapsedTimeSeconds = elapsedTimeMilliseconds / 1000;
      const newMsg = `${COMPILATION_SUCCESSFUL} (in ${elapsedTimeSeconds} seconds)`;
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
