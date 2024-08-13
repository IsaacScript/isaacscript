/* eslint-disable sort-exports/sort-exports */

import { isObject } from "isaacscript-common-ts";
import path from "node:path";
import * as tsconfck from "tsconfck";
import { dirOfCaller, findPackageRoot } from "./arkType.js";
import { mv, rm } from "./file.js";
import { getElapsedSeconds } from "./time.js";
import { fatalError, getArgs } from "./utils.js";

type ScriptCallback = (
  scriptCallbackData: ScriptCallbackData,
) => Promise<void> | void;

interface ScriptCallbackData {
  /** The full path to the directory where the closest "package.json" is located. */
  readonly packageRoot: string;

  /**
   * The full path to the compiled output (parsed from the "outDir" setting in the project's
   * "tsconfig.json"), if any.
   */
  readonly outDir?: string;
}

/**
 * Removes the "outdir" directory specified in the "tsconfig.json" file (if it exists), then runs
 * the provided logic.
 *
 * For more information, see the documentation for the `script` helper function.
 */
export async function buildScript(func: ScriptCallback): Promise<void> {
  const buildFunc: ScriptCallback = async (data) => {
    const { outDir } = data;
    if (outDir !== undefined) {
      rm(outDir);
    }

    await func(data);
  };

  await script(buildFunc, "built", 2);
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
 *                  attempting to file the closest "package.json" file. Default is 1.
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
  if (packageRoot === null) {
    fatalError(
      `Failed to find the package root starting from directory: ${fromDir}`,
    );
  }

  process.chdir(packageRoot);

  const outDir = await getOutDirFromTSConfig(packageRoot);

  const startTime = Date.now();
  const data = { packageRoot, outDir };
  await func(data);

  if (!quiet && verb !== undefined) {
    const packageName = path.basename(packageRoot);
    printSuccess(startTime, verb, packageName);
  }
}

async function getOutDirFromTSConfig(
  packageRoot: string,
): Promise<string | undefined> {
  const tsConfigJSONPath = path.join(packageRoot, "tsconfig.json");
  // The "parse" API does not seem to work with the "${configDir}" variable for some reason:
  // https://github.com/dominikg/tsconfck/discussions/185
  const parseResult = await tsconfck.parseNative(tsConfigJSONPath);
  const tsconfig = parseResult.tsconfig as unknown;
  if (!isObject(tsconfig)) {
    return undefined;
  }

  const { compilerOptions } = tsconfig;
  if (!isObject(compilerOptions)) {
    return undefined;
  }

  const { outDir } = compilerOptions;
  if (typeof outDir !== "string") {
    return undefined;
  }

  return outDir;
}

/**
 * Helper function to print a success message with the number of elapsed seconds.
 *
 * @param startTime The start time in milliseconds (as recorded by the `Date.now` method).
 * @param verb The verb to print. For example, "built".
 * @param noun The noun to print. For example, "foo".
 */
export function printSuccess(
  startTime: number,
  verb: string,
  noun: string,
): void {
  const elapsedSeconds = getElapsedSeconds(startTime);
  const secondsText = elapsedSeconds === 1 ? "second" : "seconds";
  console.log(
    `Successfully ${verb} ${noun} in ${elapsedSeconds} ${secondsText}.`,
  );
}

/**
 * An alias for "console.log".
 *
 * @allowEmptyVariadic
 */
export function echo(...args: readonly unknown[]): void {
  console.log(...args);
}

/** An alias for "process.exit". */
export function exit(code = 0): never {
  return process.exit(code);
}

/**
 * In a monorepo without project references, `tsc` will compile parent projects and include it in
 * the build output, making a weird directory structure. Since build output for a single package
 * should not be include other monorepo dependencies inside of it, all of the output needs to be
 * deleted except for the actual package output.
 */
export function fixMonorepoPackageDistDirectory(
  packageRoot: string,
  outDir: string,
): void {
  const projectName = path.basename(packageRoot);
  const realOutPath = path.join(outDir, projectName, "src");
  const tempPath = path.join(packageRoot, projectName);
  rm(tempPath);
  mv(realOutPath, tempPath);
  rm(outDir);
  mv(tempPath, outDir);
}

export async function sleep(seconds: number): Promise<unknown> {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
