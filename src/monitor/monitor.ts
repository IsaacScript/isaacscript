import chalk from "chalk";
import { ChildProcessWithoutNullStreams, fork, spawn } from "child_process";
import path from "path";
import { Config } from "../Config";
import * as configFile from "../configFile";
import {
  CURRENT_DIRECTORY_NAME,
  CWD,
  FILE_SYNCED_MESSAGE,
  MAIN_LUA,
  MOD_SOURCE_PATH,
} from "../constants";
import * as file from "../file";
import copyWatcherMod from "./copyWatcherMod";
import getTSConfigInclude from "./getTSConfigInclude";
import * as notifyGame from "./notifyGame";
import { spawnSaveDatWriter } from "./spawnSaveDatWriter";

export default function monitor(config: Config | null): void {
  if (config === null) {
    configFile.errorNotExist();
    return;
  }

  // Prepare the watcher mod
  copyWatcherMod(config);

  // Subprocess #1 - The "save#.dat" file writer
  spawnSaveDatWriter(config);

  // Subprocess #2 - The mod directory syncer
  spawnModDirectorySyncer(config);

  // Subprocess #3 - tstl --watch (to automatically convert TypeScript to Lua)
  spawnTSTLWatcher();

  // Also, start constantly pinging the watcher mod
  setInterval(() => {
    notifyGame.ping();
  }, 1000); // Every second

  // Read the "tsconfig.json" file
  const tsConfigInclude = getTSConfigInclude();
  const resolvedIncludePath = path.resolve(CWD, tsConfigInclude);

  console.log("Automatically monitoring the following for changes:");
  console.log(
    `1) your TypeScript code:     ${chalk.green(resolvedIncludePath)}`,
  );
  console.log(`2) the source mod directory: ${chalk.green(MOD_SOURCE_PATH)}`);
  console.log("");
  // (the process will now continue indefinitely for as long as the subprocesses exist)
}

function spawnModDirectorySyncer(config: Config) {
  const processName = "modDirectorySyncer";
  const processDescription = "Directory syncer";
  const processPath = path.join(__dirname, processName, processName);
  const modTargetPath = path.join(config.modsDirectory, config.projectName);
  const directorySycner = fork(processPath, [MOD_SOURCE_PATH, modTargetPath]);

  directorySycner.on("message", (msg: string) => {
    notifyGame.msg(msg);

    // If the "main.lua" file was successfully copied over, we also have to tell isaacscript-watcher
    // to reload the mod
    // Look for something like: "File synced: \main.lua"
    if (msg === `${FILE_SYNCED_MESSAGE} ${path.sep}${MAIN_LUA}`) {
      notifyGame.command(`luamod ${CURRENT_DIRECTORY_NAME}`);
      notifyGame.command("restart");
      notifyGame.msg("Reloaded the mod.");
    }
  });

  directorySycner.on("close", (code: number | null) => {
    console.error(
      `Error: ${processDescription} subprocess closed with code: ${code}`,
    );
    process.exit(1);
  });

  directorySycner.on("exit", (code: number | null) => {
    console.error(
      `Error: ${processDescription} subprocess exited with code: ${code}`,
    );
    process.exit(1);
  });
}

function spawnTSTLWatcher() {
  // Fix the bug where tstl cannot be invoked if IsaacScript is specified as a local path in a mod's
  // package.json file
  const processDescription = "tstl";
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
    tstl = spawn("node", [tstlPath, "--watch", "--preserveWatchOutput"], {
      shell: true,
      cwd: CWD,
    });
  } else {
    tstl = spawn("npx", ["tstl", "--watch", "--preserveWatchOutput"], {
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
    console.error(
      `Error: ${processDescription} subprocess exited with code: ${code}`,
    );
    process.exit(1);
  });

  tstl.on("exit", (code) => {
    console.error(
      `Error: ${processDescription} subprocess exited with code: ${code}`,
    );
    process.exit(1);
  });
}

// Returns whether or not IsaacScript is a local path in "package.json"
// e.g. "isaacscript": "../isaacscript"
function runningFromLocalPath() {
  const tstlDirPath = path.join(CWD, "node_modules", "typescript-to-lua");
  return !file.exists(tstlDirPath);
}
