import chalk from "chalk";
import { ChildProcessWithoutNullStreams, fork, spawn } from "child_process";
import path from "path";
import { Config } from "../Config";
import * as configFile from "../configFile";
import { CURRENT_DIRECTORY_NAME, CWD, MOD_SOURCE_PATH } from "../constants";
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
    notifyGame.msg(msg, true);
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
      notifyGame.msg(newMsg, true);
    } else if (
      msg.includes("File change detected. Starting incremental compilation...")
    ) {
      const newMsg = "TypeScript change detected. Compiling...";
      notifyGame.msg(newMsg, true);
    } else if (msg.includes("Found 0 errors. Watching for file changes.")) {
      // Since a different process is in charge of copying over the compiled main.lua file,
      // there is a race condition where we can execute a "luamod" command before the file is
      // finished copying
      // Delay a little bit in order to mitigate this
      setTimeout(() => {
        notifyGame.command(`luamod ${CURRENT_DIRECTORY_NAME}`);
        notifyGame.command("restart");
        const newMsg = `${CURRENT_DIRECTORY_NAME} - Successfully compiled & reloaded!`;
        notifyGame.msg(newMsg, true);
      }, 100); // 0.1 seconds
    } else {
      notifyGame.msg(msg, false);
    }
  });

  tstl.stderr.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg === "^C") {
      return;
    }
    console.error("Error:", msg);
    notifyGame.msg(`Error: ${msg}`, true);
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
