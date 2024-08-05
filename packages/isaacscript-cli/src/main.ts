#!/usr/bin/env node

import sourceMapSupport from "source-map-support";
import { checkForWindowsTerminalBugs } from "./checkForWindowsTerminalBugs.js";
import { parseArgs } from "./parseArgs.js";
import { promptInit } from "./prompt.js";
import { validateNodeVersion } from "./validateNodeVersion.js";

await main();

async function main(): Promise<void> {
  sourceMapSupport.install();
  promptInit();
  validateNodeVersion();
  await checkForWindowsTerminalBugs();
  await parseArgs();
}

export const a = 123;
