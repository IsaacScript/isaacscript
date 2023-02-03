import chalk from "chalk";
import * as dotenv from "dotenv";
import figlet from "figlet";
import { error } from "isaacscript-common-ts";
import path from "node:path";
import sourceMapSupport from "source-map-support";
import { checkForWindowsTerminalBugs } from "./checkForWindowsTerminalBugs.js";
import { Config } from "./classes/Config.js";
import { check } from "./commands/check/check.js";
import { copy } from "./commands/copy/copy.js";
import { init } from "./commands/init/init.js";
import { monitor } from "./commands/monitor/monitor.js";
import { publish } from "./commands/publish/publish.js";
import { getConfigFromFile } from "./configFile.js";
import { CWD, PROJECT_NAME } from "./constants.js";
import { execShellString } from "./exec.js";
import {
  getPackageManagerInstallCommand,
  getPackageManagerUsedForExistingProject,
} from "./packageManager.js";
import { Args, parseArgs } from "./parseArgs.js";
import { promptInit } from "./prompt.js";
import { Command, DEFAULT_COMMAND } from "./types/Command.js";
import { validateInIsaacScriptProject } from "./validateInIsaacScriptProject.js";
import { validateNodeVersion } from "./validateNodeVersion.js";
import { validateOS } from "./validateOS.js";
import { getVersionOfThisPackage } from "./version.js";

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

  printBanner(command, verbose);

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

function printBanner(command: Command, verbose: boolean) {
  // Skip displaying the banner for specific commands.
  if (command === "check") {
    return;
  }

  const banner = figlet.textSync(PROJECT_NAME);
  console.log(chalk.green(banner));

  const version = getVersionOfThisPackage(verbose);
  const versionString = `v${version}`;
  const bannerLines = banner.split("\n");
  const firstBannerLine = bannerLines[0];
  if (firstBannerLine === undefined) {
    throw new Error("Failed to get the first line of the banner text.");
  }
  const bannerLineLength = firstBannerLine.length;
  const leftPaddingAmount = Math.floor(
    (bannerLineLength + versionString.length) / 2,
  );
  const versionLine = versionString.padStart(leftPaddingAmount);
  console.log(`${versionLine}\n`);
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
      check(args);
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
  const command = getPackageManagerInstallCommand(packageManager);
  console.log(
    `Running "${command}" to ensure that the project's dependencies are installed correctly.`,
  );
  execShellString(command, verbose);
}
