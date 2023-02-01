#!/usr/bin/env node

import chalk from "chalk";
import * as dotenv from "dotenv";
import figlet from "figlet";
import { error } from "isaacscript-common-ts";
import path from "path";
import sourceMapSupport from "source-map-support";
import pkg from "../package.json";
import { checkForWindowsTerminalBugs } from "./checkForWindowsTerminalBugs";
import { Config } from "./classes/Config";
import { check } from "./commands/check/check";
import { copy } from "./commands/copy/copy";
import { init } from "./commands/init/init";
import { monitor } from "./commands/monitor/monitor";
import { publish } from "./commands/publish/publish";
import { getConfigFromFile } from "./configFile";
import { CWD, PROJECT_NAME } from "./constants";
import { execShell } from "./exec";
import {
  getPackageManagerInstallCommand,
  getPackageManagerUsedForExistingProject,
} from "./packageManager";
import { Args, parseArgs } from "./parseArgs";
import { promptInit } from "./prompt";
import { Command, DEFAULT_COMMAND } from "./types/Command";
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

  const args = parseArgs();
  const verbose = args.verbose === true;
  const command = getCommandFromArgs(args);

  printBanner(command);

  // Pre-flight checks
  await checkForWindowsTerminalBugs(verbose);

  await handleCommands(command, args);
}

function getCommandFromArgs(args: Args): Command {
  const positionalArgs = args._;
  const firstPositionArg = positionalArgs[0];
  return firstPositionArg === undefined || firstPositionArg === ""
    ? DEFAULT_COMMAND
    : (firstPositionArg as Command);
}

function loadEnvironmentVariables() {
  const envFile = path.join(CWD, ".env");
  dotenv.config({ path: envFile });
}

function printBanner(command: Command) {
  // Skip displaying the banner for specific commands.
  if (command === "check") {
    return;
  }

  const banner = figlet.textSync(PROJECT_NAME);
  console.log(chalk.green(banner));

  const bannerLines = banner.split("\n");
  const firstBannerLine = bannerLines[0];
  if (firstBannerLine === undefined) {
    throw new Error("Failed to get the first line of the banner text.");
  }
  const bannerLineLength = firstBannerLine.length;
  const version = `v${pkg.version}`;
  const leftPaddingAmount = Math.floor((bannerLineLength + version.length) / 2);
  const versionLine = version.padStart(leftPaddingAmount);
  console.log(versionLine);

  console.log();
}

async function handleCommands(command: Command, args: Args) {
  const skipProjectChecks = args.skipProjectChecks === true;
  const verbose = args.verbose === true;

  let config = new Config();
  if (command !== "init") {
    if (!skipProjectChecks) {
      validateInIsaacScriptProject(verbose);
    }
    config = await getConfigFromFile(args);

    ensureDepsAreInstalled(args, verbose);
  }

  switch (command) {
    case "monitor": {
      await monitor(args, config);
      break;
    }

    case "init": {
      await init(args);
      break;
    }

    case "copy": {
      await copy(args, config);
      break;
    }

    case "publish": {
      await publish(args, config);
      break;
    }

    case "check": {
      check();
      break;
    }
  }

  if (command !== "monitor") {
    process.exit(0);
  }
}

/**
 * https://stackoverflow.com/questions/57016579/checking-if-package-json-dependencies-match-the-installed-dependencies
 */
function ensureDepsAreInstalled(args: Args, verbose: boolean) {
  const packageManager = getPackageManagerUsedForExistingProject(args, verbose);
  const [command, commandArgs] =
    getPackageManagerInstallCommand(packageManager);
  const argsString = commandArgs.join(" ");
  const commandString = `${command} ${argsString}`.trim();
  console.log(
    `Running "${commandString}" to ensure that the project's dependencies are installed correctly.`,
  );
  execShell(command, commandArgs, verbose);
}
