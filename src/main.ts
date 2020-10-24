#!/usr/bin/env node

import chalk from "chalk";
import { fork, spawn } from "child_process";
import figlet from "figlet";
import path from "path";
import updateNotifier from "update-notifier";
import yargs from "yargs";
import pkg from "../package.json";
import checkForConfig from "./checkForConfig";
import checkForTemplateFiles from "./checkForTemplateFiles";
import checkForWindowsTerminalBugs from "./checkForWindowsTerminalBugs";
import Config from "./Config";
import * as configFile from "./configFile";
import { CWD, MOD_SOURCE_PATH, PROJECT_NAME } from "./constants";
import copyWatcherMod from "./copyWatcherMod";
import getTSConfigInclude from "./getTSConfigInclude";
import notifyGame from "./notifyGame";

async function main(): Promise<void> {
  // Get command line arguments
  const argv = yargs(process.argv.slice(2)).argv;
  parseArgs(argv);

  // ASCII banner
  console.log(chalk.green(figlet.textSync("IsaacScript")));

  // Validate the platform
  if (process.platform !== "win32") {
    console.error(
      `IsaacScript is only supported on ${chalk.green("Windows")}.`,
    );
    console.error(
      "If you use another operating system and you want to use IsaacScript, contact Zamiel and let him know.",
    );
    process.exit(1);
  }

  // Check for a new version
  updateNotifier({ pkg }).notify();

  // Do some pre-flight checks
  await checkForWindowsTerminalBugs();
  await checkForConfig();
  checkForTemplateFiles();
  const config = configFile.read();
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

function parseArgs(argv: Record<string, unknown>) {
  Object.keys(argv).forEach((key) => {
    switch (key) {
      case "_":
      case "$0": {
        break;
      }

      case "version": {
        console.log(pkg.version);
        process.exit(0);
        break;
      }

      default: {
        console.log(`error: the flag of "${key}" is invalid`);
        process.exit(1);
      }
    }
  });

  process.exit(1);
}

function spawnModDirectorySyncer(config: Config) {
  const modDirectorySyncerPath = path.join(__dirname, "modDirectorySyncer");
  const childProcess = fork(modDirectorySyncerPath, [
    MOD_SOURCE_PATH,
    config.modTargetPath,
  ]);
  childProcess.on("message", (msg: string) => {
    notifyGame("msg", msg, config);
  });
}

function spawnTSTLWatcher(config: Config) {
  const ls = spawn("npx", ["tstl", "--watch", "--preserveWatchOutput"], {
    shell: true,
  });

  ls.stdout.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg.includes("Starting compilation in watch mode...")) {
      const newMsg = "IsaacScript is now watching for changes.";
      notifyGame("msg", newMsg, config);
    } else if (
      msg.includes("File change detected. Starting incremental compilation...")
    ) {
      const newMsg = "TypeScript change detected. Compiling...";
      notifyGame("msg", newMsg, config);
    } else if (msg.includes("Found 0 errors. Watching for file changes.")) {
      notifyGame("command", `luamod ${PROJECT_NAME}`, config);
    } else {
      notifyGame("msg", msg, config);
    }
  });

  ls.stderr.on("data", (data: Buffer[]) => {
    const msg = data.toString().trim();
    if (msg === "^C") {
      return;
    }
    console.error("Error:", msg);
    notifyGame("msg", `Error: ${msg}`, config);
  });

  ls.on("close", (code) => {
    console.error("tstl exited abruptly with code:", code);
    process.exit(1);
  });
}

main().catch((err) => {
  console.error("IsaacScript failed:", err);
  process.exit(1);
});
