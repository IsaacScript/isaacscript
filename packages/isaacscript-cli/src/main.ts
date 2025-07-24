#!/usr/bin/env node

import sourceMapSupport from "source-map-support";
import { parseArgs } from "./parseArgs.js";
import { promptInit } from "./prompt.js";
import { validateNodeVersion } from "./validateNodeVersion.js";

await main();

async function main() {
  sourceMapSupport.install();
  promptInit();
  validateNodeVersion();
  await parseArgs();
}
