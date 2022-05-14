#!/usr/bin/env node

import chalk from "chalk";
import * as dotenv from "dotenv";
import figlet from "figlet";
import path from "path";
import sourceMapSupport from "source-map-support";
import updateNotifier from "update-notifier";
import pkg from "../package.json";
import { checkForWindowsTerminalBugs } from "./checkForWindowsTerminalBugs";
import { copy } from "./commands/copy/copy";
import { init } from "./commands/init/init";
import { monitor } from "./commands/monitor/monitor";
import { publish } from "./commands/publish/publish";
import * as configFile from "./configFile";
import { CWD, PROJECT_NAME, YARN_LOCK_PATH } from "./constants";
import { execShell } from "./exec";
import * as file from "./file";
import { parseArgs } from "./parseArgs";
import { promptInit } from "./prompt";
import { Command, DEFAULT_COMMAND } from "./types/Command";
import { Config } from "./types/Config";
import { ensureAllCases, error } from "./utils";
import { validateInIsaacScriptProject } from "./validateInIsaacScriptProject";
import { validateNodeVersion } from "./validateNodeVersion";
import { validateOS } from "./validateOS";

main().catch((err) => {
  error(`${PROJECT_NAME} failed:`, err);
});

async function main(): Promise<void> {
  sourceMapSupport.install();
  promptInit();
  validateNodeVersion();
  validateOS();
  loadEnvironmentVariables();

  // Get command line arguments
  const argv = parseArgs();
  const verbose = argv["verbose"] === true;

  printBanner();

  // Check for a new version
  updateNotifier({ pkg }).notify();

  // Pre-flight checks
  await checkForWindowsTerminalBugs(verbose);

  await handleCommands(argv, verbose);
}

function loadEnvironmentVariables() {
  const envFile = path.join(CWD, ".env");
  dotenv.config({ path: envFile });
}

function printBanner() {
  console.log(chalk.green(figlet.textSync(PROJECT_NAME)));
  const bannerLength = 55; // From measuring the banner created by Figlet
  const version = `v${pkg.version}`;
  const leftPaddingAmount = Math.floor((bannerLength + version.length) / 2);
  console.log(version.padStart(leftPaddingAmount));
  console.log();
}

async function handleCommands(argv: Record<string, unknown>, verbose: boolean) {
  const positionalArgs = argv["_"] as string[];
  let command: Command;
  if (positionalArgs.length > 0) {
    command = positionalArgs[0] as Command;
  } else {
    command = DEFAULT_COMMAND;
  }

  let config = new Config();
  if (command !== "init") {
    validateInIsaacScriptProject(verbose);
    config = await configFile.get(argv);

    ensureDepsAreInstalled(verbose);
  }

  switch (command) {
    case "monitor": {
      monitor(argv, config);
      break;
    }

    case "init": {
      await init(argv);
      break;
    }

    case "copy": {
      copy(argv, config);
      break;
    }

    case "publish": {
      publish(argv, config);
      break;
    }

    default: {
      ensureAllCases(command);
      break;
    }
  }

  if (command !== "monitor") {
    process.exit(0);
  }
}

function ensureDepsAreInstalled(verbose: boolean) {
  if (file.exists(YARN_LOCK_PATH, verbose)) {
    console.log(
      'Running "yarn" to ensure that the project\'s dependencies are installed correctly.',
    );
    execShell("yarn");
    return;
  }

  // https://stackoverflow.com/questions/57016579/checking-if-package-json-dependencies-match-the-installed-dependencies
  console.log(
    'Running "npm install" to ensure that the project\'s dependencies are installed correctly.',
  );
  execShell("npm", ["install"], verbose);
}
