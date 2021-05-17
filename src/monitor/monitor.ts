import chalk from "chalk";
import { fork, spawn } from "child_process";
import path from "path";
import { Config } from "../Config";
import * as configFile from "../configFile";
import { CURRENT_DIRECTORY_NAME, CWD, MOD_SOURCE_PATH } from "../constants";
import copyWatcherMod from "./copyWatcherMod";
import getTSConfigInclude from "./getTSConfigInclude";
import * as notifyGame from "./notifyGame";

export default function monitor(config: Config | null): void {
  if (config === null) {
    configFile.errorNotExist();
    return;
  }

  // Prepare the watcher mod
  copyWatcherMod(config);

  // Subprocess #1 - The mod directory syncer
  spawnModDirectorySyncer(config);

  // Subprocess #2 - tstl --watch (to automatically convert TypeScript to Lua)
  spawnTSTLWatcher(config);

  // Also, start constantly pinging the watcher mod
  setInterval(() => {
    notifyGame.ping(config);
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
  const modDirectorySyncerPath = path.join(__dirname, "modDirectorySyncer");
  const modTargetPath = path.join(config.modsDirectory, config.projectName);
  const directorySycner = fork(modDirectorySyncerPath, [
    MOD_SOURCE_PATH,
    modTargetPath,
  ]);

  directorySycner.on("message", (msg: string) => {
    notifyGame.msg(msg, config, true);
  });

  directorySycner.on("close", (code: number | null) => {
    console.error(`Directory syncer subprocess closed with code: ${code}`);
    process.exit(1);
  });

  directorySycner.on("exit", (code: number | null) => {
    console.error(`Directory syncer subprocess exited with code: ${code}`);
    process.exit(1);
  });
}

function spawnTSTLWatcher(config: Config) {
  const tstl = spawn("npx", ["tstl", "--watch", "--preserveWatchOutput"], {
    shell: true,
  });

  tstl.stdout.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg.includes("Starting compilation in watch mode...")) {
      const newMsg = "IsaacScript is now watching for changes.";
      notifyGame.msg(newMsg, config, true);
    } else if (
      msg.includes("File change detected. Starting incremental compilation...")
    ) {
      const newMsg = "TypeScript change detected. Compiling...";
      notifyGame.msg(newMsg, config, true);
    } else if (msg.includes("Found 0 errors. Watching for file changes.")) {
      notifyGame.command(`luamod ${CURRENT_DIRECTORY_NAME}`, config);
      notifyGame.command("restart", config);
      const newMsg = `${CURRENT_DIRECTORY_NAME} - Successfully compiled & reloaded!`;
      notifyGame.msg(newMsg, config, true);
    } else {
      notifyGame.msg(msg, config, false);
    }
  });

  tstl.stderr.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg === "^C") {
      return;
    }
    console.error("Error:", msg);
    notifyGame.msg(`Error: ${msg}`, config, true);
  });

  tstl.on("close", (code) => {
    console.error(`tstl exited with code: ${code}`);
    process.exit(1);
  });

  tstl.on("exit", (code) => {
    console.error(`tstl exited with code: ${code}`);
    process.exit(1);
  });
}
