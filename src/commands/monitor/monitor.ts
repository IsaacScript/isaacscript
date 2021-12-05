import chalk from "chalk";
import { ChildProcessWithoutNullStreams, fork, spawn } from "child_process";
import path from "path";
import {
  CWD,
  FILE_SYNCED_MESSAGE,
  MAIN_LUA,
  MOD_SOURCE_PATH,
  PACKAGE_JSON,
} from "../../constants";
import * as file from "../../file";
import { Config } from "../../types/Config";
import { error, getModTargetDirectoryName } from "../../util";
import { copyWatcherMod } from "./copyWatcherMod";
import { getTSConfigInclude } from "./getTSConfigInclude";
import * as notifyGame from "./notifyGame";
import { spawnSaveDatWriter } from "./spawnSaveDatWriter";
import { touchWatcherSaveDatFiles } from "./touchWatcherSaveDatFiles";

export function monitor(argv: Record<string, unknown>, config: Config): void {
  // If they specified some command-line flags, override the values found in the config file
  if (argv.modsDirectory !== undefined) {
    config.modsDirectory = argv.modsDirectory as string; // eslint-disable-line no-param-reassign
  }
  if (argv.saveSlot !== undefined) {
    config.saveSlot = argv.saveSlot as number; // eslint-disable-line no-param-reassign
  }

  // Prepare the IsaacScript watcher mod
  copyWatcherMod(config);
  touchWatcherSaveDatFiles(config);

  // Subprocess #1 - The "save#.dat" file writer
  spawnSaveDatWriter(config);

  // Subprocess #2 - The mod directory syncer
  spawnModDirectorySyncer(config);

  // Subprocess #3 - tstl --watch (to automatically convert TypeScript to Lua)
  spawnTSTLWatcher(argv);

  // Also, start constantly pinging the watcher mod
  setInterval(() => {
    notifyGame.ping();
  }, 1000); // Every second

  // Read the "tsconfig.json" file
  const tsConfigInclude = getTSConfigInclude();
  const resolvedIncludePath = path.resolve(CWD, tsConfigInclude);
  const modTargetDirectoryName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetDirectoryName);

  console.log("Automatically monitoring the following for changes:");
  console.log(
    `1) your TypeScript code:     ${chalk.green(resolvedIncludePath)}`,
  );
  console.log(`2) the source mod directory: ${chalk.green(MOD_SOURCE_PATH)}`);
  console.log("");
  console.log(`Copying files to:            ${chalk.green(modTargetPath)}`);
  console.log("");
  // (the process will now continue indefinitely for as long as the subprocesses exist)
}

function spawnModDirectorySyncer(config: Config) {
  const processName = "modDirectorySyncer";
  const processDescription = "Directory syncer";
  const processPath = path.join(__dirname, processName, processName);
  const modTargetName = getModTargetDirectoryName(config);
  const modTargetPath = path.join(config.modsDirectory, modTargetName);
  const directorySycner = fork(processPath, [MOD_SOURCE_PATH, modTargetPath]);

  directorySycner.on("message", (msg: string) => {
    notifyGame.msg(msg);

    // If the "main.lua" file was successfully copied over, we also have to tell isaacscript-watcher
    // to reload the mod
    // Look for something like: "File synced: \main.lua"
    if (msg === `${FILE_SYNCED_MESSAGE} ${path.sep}${MAIN_LUA}`) {
      notifyGame.command(`luamod ${modTargetName}`);
      notifyGame.command("restart");
      notifyGame.msg("Reloaded the mod.");
    }
  });

  directorySycner.on("close", (code: number | null) => {
    error(`Error: ${processDescription} subprocess closed with code: ${code}`);
  });

  directorySycner.on("exit", (code: number | null) => {
    error(`Error: ${processDescription} subprocess exited with code: ${code}`);
  });
}

function spawnTSTLWatcher(argv: Record<string, unknown>) {
  const processDescription = "tstl";
  const crashDebug = argv.crashDebug === true;

  const tstlArgs = ["--watch", "--preserveWatchOutput"];
  if (crashDebug) {
    tstlArgs.push("--luaPlugins");
    tstlArgs.push(
      '\'{ "name": "./node_modules/isaacscript/src/plugins/addCrashDebugStatements.ts" }\'',
    );
  }

  let tstl: ChildProcessWithoutNullStreams;
  if (runningFromLocalPath()) {
    const tstlPath = path.join(
      CWD,
      "..",
      "isaacscript",
      "node_modules",
      "typescript-to-lua",
      "dist",
      "tstl.js",
    );
    tstl = spawn("node", [tstlPath, ...tstlArgs], {
      shell: true,
      cwd: CWD,
    });
  } else {
    tstl = spawn("npx", ["tstl", ...tstlArgs], {
      shell: true,
    });
  }

  tstl.stdout.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg.includes("Starting compilation in watch mode...")) {
      const newMsg = "IsaacScript is now watching for changes.";
      notifyGame.msg(newMsg);
    } else if (
      msg.includes("File change detected. Starting incremental compilation...")
    ) {
      const newMsg = "TypeScript change detected. Compiling...";
      notifyGame.msg(newMsg);
    } else if (msg.includes("Found 0 errors. Watching for file changes.")) {
      const newMsg = "Compilation successful.";
      notifyGame.msg(newMsg);
    } else {
      notifyGame.msg(msg);
    }
  });

  tstl.stderr.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg === "^C") {
      // Hide the line that appears when you cancel the program with Ctrl + c
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

// Returns whether or not IsaacScript is a local path in "package.json"
// e.g. "isaacscript": "../isaacscript"
function runningFromLocalPath() {
  const packageJSONPath = path.join(CWD, PACKAGE_JSON);
  const packageJSON = file.read(packageJSONPath);
  return packageJSON.includes('"isaacscript": "file:../isaacscript"');
}
