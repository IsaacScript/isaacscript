/* eslint-disable sort-exports/sort-exports */

import path from "node:path";
import { dirOfCaller, findPackageRoot } from "./arkType.js";
import { getElapsedSeconds } from "./time.js";
import { getTSConfigJSONOutDir } from "./tsconfigJSON.js";
import { getArgs } from "./utils.js";

type ScriptCallback = (
  scriptCallbackData: ScriptCallbackData,
) => Promise<void> | void;

interface ScriptCallbackData {
  packageRoot: string;
  outDir?: string;
}

/** See the documentation for the `script` helper function. */
export async function buildScript(func: ScriptCallback): Promise<void> {
  await script(func, "built", 2);
}

/** See the documentation for the `script` helper function. */
export async function lintScript(func: ScriptCallback): Promise<void> {
  await script(func, "linted", 2);
}

/** See the documentation for the `script` helper function. */
export async function testScript(func: ScriptCallback): Promise<void> {
  await script(func, "tested", 2);
}

/**
 * Helper function to create a script for a TypeScript project. You can pass any arbitrary logic you
 * want.
 *
 * This is intended to be used with the `$` and `$s` helper functions so that you can make a
 * TypeScript script in the style of a Bash script.
 *
 * Specifically, this helper function will:
 *
 * 1. Change the working directory to the package root (i.e. the place where the nearest
 *    "package.json" file is).
 * 2. Run the provided logic.
 * 3. Print a success message with the total amount of seconds taken (if a verb was provided and
 *    there is not a quiet/silent flag).
 *
 * @param func The function that contains the build logic for the particular script. This is passed
 *             the path to the package root and other metadata about the project. (See the
 *             `ScriptCallbackData` interface.)
 * @param verb Optional. The verb for when the script completes. For example, "built".
 * @param upStackBy Optional. The number of functions to rewind in the calling stack before
 *                  attempting to file the closest "package.json" file. Defaults to 1.
 */
export async function script(
  func: ScriptCallback,
  verb?: string,
  upStackBy = 1,
): Promise<void> {
  const args = getArgs();
  const quiet =
    args.includes("quiet") ||
    args.includes("--quiet") ||
    args.includes("-q") ||
    args.includes("silent") ||
    args.includes("--silent") ||
    args.includes("-s");

  const fromDir = dirOfCaller(upStackBy);
  const packageRoot = findPackageRoot(fromDir);
  const packageName = path.basename(packageRoot);

  const tsConfigJSONPath = path.join(packageRoot, "tsconfig.json");
  const outDir = getTSConfigJSONOutDir(tsConfigJSONPath);

  process.chdir(packageRoot);

  const startTime = Date.now();
  const data = { packageRoot, outDir };
  await func(data);

  if (!quiet && verb !== undefined) {
    const elapsedSeconds = getElapsedSeconds(startTime);
    console.log(
      `Successfully ${verb} ${packageName} in ${elapsedSeconds} seconds.`,
    );
  }
}
