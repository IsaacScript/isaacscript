#!/usr/bin/env node

import chalk from "chalk";
import { fork, spawn } from "child_process";
import figlet from "figlet";
import path from "path";
import updateNotifier from "update-notifier";
import pkg from "../package.json";
import checkForWindowsTerminalBugs from "./checkForWindowsTerminalBugs";
import * as compileAndCopy from "./compileAndCopy";
import Config from "./Config";
import * as configFile from "./configFile";
import { CURRENT_DIRECTORY_NAME, CWD, MOD_SOURCE_PATH } from "./constants";
import copyWatcherMod from "./copyWatcherMod";
import getTSConfigInclude from "./getTSConfigInclude";
import * as notifyGame from "./notifyGame";
import parseArgs from "./parseArgs";
import * as publish from "./publish";

async function main(): Promise<void> {
  // Validate the platform
  if (process.platform !== "win32") {
    console.error(
      `IsaacScript is only supported on ${chalk.green("Windows")}.`,
    );
    console.error(
      "If you use another operating system and you want to use IsaacScript, contact Zamiel and let him know.",
    );
    console.error(
      "(Since the program is written in TypeScript, porting to a new operating system should be easy, but is untested.)",
    );
    process.exit(1);
  }

  // Get command line arguments
  const argv = parseArgs();

  // ASCII banner
  console.log(chalk.green(figlet.textSync("IsaacScript")));

  // Check for a new version
  updateNotifier({ pkg }).notify();

  // Pre-flight checks
  await checkForWindowsTerminalBugs();
  const config = configFile.read();

  // The user might have specified a flag to only copy the mod and then exit
  // (as opposed to running forever)
  if (argv.copy === true) {
    compileAndCopy.main(MOD_SOURCE_PATH, config.modTargetPath);
    process.exit(0);
  }

  // The user might want to publish a new version of the mod
  if (argv.publish === true) {
    const skip = argv.skip === true;
    publish.main(MOD_SOURCE_PATH, config.modTargetPath, skip);
    process.exit(0);
  }

  // Prepare the watcher mod
  copyWatcherMod(config);

  // Subprocess #1 - The mod directory syncer
  spawnModDirectorySyncer(config);

  // Subprocess #2 - tstl --watch (to automatically convert TypeScript to Lua)
  spawnTSTLWatcher(config);

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
  const childProcess = fork(modDirectorySyncerPath, [
    MOD_SOURCE_PATH,
    config.modTargetPath,
  ]);
  childProcess.on("message", (msg: string) => {
    notifyGame.msg(msg, config, true);
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
    console.error("tstl exited abruptly with code:", code);
    process.exit(1);
  });
}

main().catch((err) => {
  console.error("IsaacScript failed:", err);
  process.exit(1);
});
