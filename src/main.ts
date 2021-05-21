#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import sourceMapSupport from "source-map-support";
import updateNotifier from "update-notifier";
import pkg from "../package.json";
import checkForWindowsTerminalBugs from "./checkForWindowsTerminalBugs";
import Command, { DEFAULT_COMMAND } from "./Command";
import { Config } from "./Config";
import * as configFile from "./configFile";
import copy from "./copy/copy";
import init from "./init/init";
import { ensureAllCases } from "./misc";
import monitor from "./monitor/monitor";
import parseArgs from "./parseArgs";
import publish from "./publish/publish";
import validateNodeVersion from "./validateNodeVersion";
import { validateOS } from "./validateOS";

async function main(): Promise<void> {
  sourceMapSupport.install();
  validateNodeVersion();
  validateOS();

  // Get command line arguments
  const argv = parseArgs();

  // ASCII banner
  console.log(chalk.green(figlet.textSync("IsaacScript")));
  const bannerLength = 55;
  const version = `v${pkg.version}`;
  const leftPaddingAmount = Math.floor((bannerLength + version.length) / 2);
  console.log(version.padStart(leftPaddingAmount));
  console.log();

  // Check for a new version
  updateNotifier({ pkg }).notify();

  // Pre-flight checks
  await checkForWindowsTerminalBugs();
  const config = configFile.read();

  await handleCommands(argv, config);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCommands(argv: any, config: Config | null) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const positionalArgs = argv._ as string[];
  let command: Command;
  if (positionalArgs.length > 0) {
    command = positionalArgs[0] as Command;
  } else {
    command = DEFAULT_COMMAND;
  }

  switch (command) {
    case "monitor": {
      monitor(config);
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

main().catch((err) => {
  console.error("IsaacScript failed:", err);
  process.exit(1);
});
