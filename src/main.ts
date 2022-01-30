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
import { CWD, PROJECT_NAME } from "./constants";
import { parseArgs } from "./parseArgs";
import { promptInit } from "./prompt";
import { Command, DEFAULT_COMMAND } from "./types/Command";
import { Config } from "./types/Config";
import { ensureAllCases, error } from "./util";
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

  printBanner();

  // Check for a new version
  updateNotifier({ pkg }).notify();

  // Pre-flight checks
  await checkForWindowsTerminalBugs();

  await handleCommands(argv as Record<string, unknown>);
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

async function handleCommands(argv: Record<string, unknown>) {
  const positionalArgs = argv._ as string[];
  let command: Command;
  if (positionalArgs.length > 0) {
    command = positionalArgs[0] as Command;
  } else {
    command = DEFAULT_COMMAND;
  }

  let config = new Config();
  if (command !== "init") {
    validateInIsaacScriptProject();
    config = await configFile.get(argv);
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
      copy(config);
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
