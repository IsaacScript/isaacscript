#!/usr/bin/env node

import chalk from "chalk";
import { fork, spawn } from "child_process";
import figlet from "figlet";
import * as JSONC from "jsonc-parser";
import path from "path";
import updateNotifier from "update-notifier";
import pkg from "../package.json";
import checkForConfig from "./checkForConfig";
import checkForTemplateFiles from "./checkForTemplateFiles";
import checkForWindowsTerminalBugs from "./checkForWindowsTerminalBugs";
import Config from "./Config";
import * as configFile from "./configFile";
import { CWD, MOD_SOURCE_PATH, PROJECT_NAME, TSCONFIG_PATH } from "./constants";
import copyWatcherMod from "./copyWatcherMod";
import * as file from "./file";
import notifyGame from "./notifyGame";

async function main(): Promise<void> {
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

function getTSConfigInclude(): string {
  const tsConfigRaw = file.read(TSCONFIG_PATH);
  let tsConfig: Record<string, Array<string>>;
  try {
    tsConfig = JSONC.parse(tsConfigRaw) as Record<string, Array<string>>;
  } catch (err) {
    console.error(`Failed to parse "${chalk.green(TSCONFIG_PATH)}":`, err);
    process.exit(1);
  }

  if (!Object.prototype.hasOwnProperty.call(tsConfig, "include")) {
    console.error(
      `Your "${chalk.green(
        TSCONFIG_PATH,
      )}" file does not have an include directive, which is surely a mistake. Delete the file and re-run isaacscript.`,
    );
    process.exit(1);
  }
  if (tsConfig.include.length === 0) {
    console.error(
      `Your "${chalk.green(
        TSCONFIG_PATH,
      )}" file has an empty include directive, which is surely a mistake. Delete the file and re-run isaacscript.`,
    );
    process.exit(1);
  }

  return tsConfig.include[0];
}

main().catch((err) => {
  console.error("IsaacScript failed:", err);
  process.exit(1);
});
