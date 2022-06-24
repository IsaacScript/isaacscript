import chalk from "chalk";
import { fork, spawn } from "child_process";
import * as JSONC from "jsonc-parser";
import path from "path";
import {
  CWD,
  FILE_SYNCED_MESSAGE,
  MAIN_LUA,
  MOD_SOURCE_PATH,
  PACKAGE_JSON_PATH,
  PROJECT_NAME,
  TSCONFIG_PATH,
} from "../../constants";
import * as file from "../../file";
import {
  getPackageManagerAddCommand,
  getPackageManagerUsedForExistingProject,
} from "../../packageManager";
import { Args } from "../../parseArgs";
import { Config } from "../../types/Config";
import { error, getModTargetDirectoryName } from "../../utils";
import { COMPILATION_SUCCESSFUL } from "./constants";
import { copyWatcherMod } from "./copyWatcherMod";
import * as notifyGame from "./notifyGame";
import { spawnSaveDatWriter } from "./spawnSaveDatWriter";
import { touchWatcherSaveDatFiles } from "./touchWatcherSaveDatFiles";

const REQUIRED_PACKAGE_JSON_DEPENDENCIES = [
  "@types/node",
  "isaac-typescript-definitions",
  "isaacscript",
  // - "isaacscript-common" is not required.
  // - "isaacscript-lint" is not required.
  // - "isaacscript-spell" is not required.
  "ts-node",
  "typescript",
  "typescript-to-lua",
];

let compilationStartTime = new Date();

export function monitor(args: Args, config: Config): void {
  const verbose = args.verbose === true;

  // If they specified some command-line flags, override the values found in the config file.
  if (args.modsDirectory !== undefined) {
    config.modsDirectory = args.modsDirectory; // eslint-disable-line no-param-reassign
  }
  if (args.saveSlot !== undefined) {
    config.saveSlot = args.saveSlot; // eslint-disable-line no-param-reassign
  }

  // Pre-flight checks.
  validatePackageJSONDependencies(args, verbose);

  // Read the "tsconfig.json" file.
  const tsConfigInclude = getFirstTSConfigIncludePath(verbose);
  const resolvedIncludePath = path.resolve(CWD, tsConfigInclude);
  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);

  // Prepare the IsaacScript watcher mod.
  copyWatcherMod(config, verbose);
  touchWatcherSaveDatFiles(config, verbose);

  // Delete and re-copy the mod every time IsaacScript starts. This ensures that it is always the
  // latest version.
  if (file.exists(modTargetPath, verbose)) {
    file.deleteFileOrDirectory(modTargetPath, verbose);
  }

  // Subprocess #1 - The "save#.dat" file writer.
  spawnSaveDatWriter(config);

  // Subprocess #2 - The mod directory syncer.
  spawnModDirectorySyncer(config);

  // Subprocess #3 - tstl --watch (to automatically convert TypeScript to Lua).
  spawnTSTLWatcher();

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
  const packageJSONRaw = file.read(PACKAGE_JSON_PATH, verbose);
  let packageJSON: Record<string, unknown>;
  try {
    packageJSON = JSONC.parse(packageJSONRaw) as Record<string, unknown>;
  } catch (err) {
    error(`Failed to parse "${chalk.green(PACKAGE_JSON_PATH)}":`, err);
  }

  if (typeof packageJSON !== "object") {
    error(
      `Failed to parse "${chalk.green(
        PACKAGE_JSON_PATH,
      )}" since it was of type:`,
      typeof packageJSON,
    );
  }

  const { dependencies } = packageJSON;
  if (typeof dependencies !== "object") {
    error(
      `Failed to parse the dependencies of: ${chalk.green(PACKAGE_JSON_PATH)}`,
    );
  }

  const dependenciesArray = Object.keys(dependencies as Record<string, string>);

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

function spawnTSTLWatcher() {
  const processDescription = "tstl";
  const tstl = spawn("npx", ["tstl", "--watch", "--preserveWatchOutput"], {
    shell: true,
  });

  tstl.stdout.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg.includes("Starting compilation in watch mode...")) {
      const newMsg = `${PROJECT_NAME} is now watching for changes.`;
      notifyGame.msg(newMsg);
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

function getFirstTSConfigIncludePath(verbose: boolean): string {
  const tsConfigRaw = file.read(TSCONFIG_PATH, verbose);
  let tsConfig: Record<string, string[]>;
  try {
    tsConfig = JSONC.parse(tsConfigRaw) as Record<string, string[]>;
  } catch (err) {
    error(`Failed to parse "${chalk.green(TSCONFIG_PATH)}":`, err);
  }

  const { include } = tsConfig;
  if (include === undefined) {
    error(
      `Your "${chalk.green(
        TSCONFIG_PATH,
      )}" file does not have an "include" property, which is surely a mistake. Delete the file and re-run ${PROJECT_NAME}.`,
    );
  }

  if (!Array.isArray(include)) {
    error(
      `Your "${chalk.green(
        TSCONFIG_PATH,
      )}" file has an "include" property that is not an array, which is surely a mistake. Delete the file and re-run ${PROJECT_NAME}.`,
    );
  }

  const firstInclude = include[0];
  if (firstInclude === undefined) {
    error(
      `Your "${chalk.green(
        TSCONFIG_PATH,
      )}" file has an empty "include" property, which is surely a mistake. Delete the file and re-run ${PROJECT_NAME}.`,
    );
  }

  return firstInclude;
}
