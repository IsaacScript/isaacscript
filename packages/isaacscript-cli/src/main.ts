#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import {
  fatalError,
  getPackageManagerInstallCommand,
} from "isaacscript-common-node";
import sourceMapSupport from "source-map-support";
import { checkForWindowsTerminalBugs } from "./checkForWindowsTerminalBugs.js";
import { Config } from "./classes/Config.js";
import type { ValidatedConfig } from "./classes/ValidatedConfig.js";
import { check } from "./commands/check/check.js";
import { copy } from "./commands/copy/copy.js";
import { init } from "./commands/init/init.js";
import { monitor } from "./commands/monitor/monitor.js";
import { publish } from "./commands/publish/publish.js";
import { getConfigFromFile } from "./configFile.js";
import { PROJECT_NAME } from "./constants.js";
import { execShellString } from "./exec.js";
import { getPackageManagerUsedForExistingProject } from "./packageManager.js";
import type { Args } from "./parseArgs.js";
import { parseArgs } from "./parseArgs.js";
import { promptInit } from "./prompt.js";
import type { Command } from "./types/Command.js";
import { DEFAULT_COMMAND, isIsaacScriptModCommand } from "./types/Command.js";
import { validateInIsaacScriptProject } from "./validateInIsaacScriptProject.js";
import { validateNodeVersion } from "./validateNodeVersion.js";
import { getVersionOfThisPackage } from "./version.js";

await main();

async function main(): Promise<void> {
  sourceMapSupport.install();
  promptInit();

  const args = parseArgs();
  const verbose = args.verbose === true;
  const command = getCommandFromArgs(args);

  validateNodeVersion();

  printBanner(command, verbose);

  // Pre-flight checks
  await checkForWindowsTerminalBugs();

  await handleCommands(command, args);

  if (command !== "monitor") {
    process.exit(0);
  }
}

function getCommandFromArgs(args: Args): Command {
  const positionalArgs = args._;
  const firstPositionArg = positionalArgs[0];
  return firstPositionArg === undefined || firstPositionArg === ""
    ? DEFAULT_COMMAND
    : (firstPositionArg as Command);
}

function printBanner(command: Command, verbose: boolean) {
  // Skip displaying the banner for specific commands.
  if (command.startsWith("check")) {
    return;
  }

  const banner = figlet.textSync(PROJECT_NAME);
  console.log(chalk.green(banner));

  const version = getVersionOfThisPackage(verbose);
  const versionString = `v${version}`;
  const bannerLines = banner.split("\n");
  const firstBannerLine = bannerLines[0];
  if (firstBannerLine === undefined) {
    fatalError(
      firstBannerLine,
      "Failed to get the first line of the banner text.",
    );
  }
  const bannerHorizontalLength = firstBannerLine.length;
  const leftPaddingAmount = Math.floor(
    (bannerHorizontalLength + versionString.length) / 2,
  );
  const versionLine = versionString.padStart(leftPaddingAmount);
  console.log(`${versionLine}\n`);
}

async function handleCommands(command: Command, args: Args) {
  const skipProjectChecks = args.skipProjectChecks === true;
  const verbose = args.verbose === true;

  let config = new Config() as ValidatedConfig;
  if (
    command !== "init" &&
    command !== "check" &&
    isIsaacScriptModCommand(command)
  ) {
    if (!skipProjectChecks) {
      validateInIsaacScriptProject();
    }

    const shouldDisplayOutput = !command.startsWith("check");
    ensureDepsAreInstalled(args, shouldDisplayOutput, verbose);
    config = await getConfigFromFile(args, false);
  }

  switch (command) {
    case "monitor": {
      await monitor(args, config);
      break;
    }

    case "init": {
      await init(args, false);
      break;
    }

    case "init-ts": {
      await init(args, true);
      break;
    }

    case "copy": {
      await copy(args, config);
      break;
    }

    case "publish": {
      await publish(args, config, false);
      break;
    }

    case "publish-ts": {
      await publish(args, config, true);
      break;
    }

    case "check": {
      check(args, false);
      break;
    }

    case "check-ts": {
      check(args, true);
      break;
    }
  }
}

function ensureDepsAreInstalled(
  args: Args,
  shouldDisplayOutput: boolean,
  verbose: boolean,
) {
  const packageManager = getPackageManagerUsedForExistingProject(args);
  const command = getPackageManagerInstallCommand(packageManager);

  if (shouldDisplayOutput) {
    console.log(
      `Running "${command}" to ensure that the project's dependencies are installed correctly.`,
    );
  }

  execShellString(command, verbose);
}
