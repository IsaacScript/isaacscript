import fs from "fs";
import glob from "glob";
import * as JSONC from "jsonc-parser";
import path from "path";
import process from "process";

const PACKAGE_ROOT = path.join(__dirname, "..");
const TYPEDOC_CONFIG_PATH = path.join(PACKAGE_ROOT, "typedoc.json");

main();

function main() {
  process.chdir(PACKAGE_ROOT);

  const entryPoints = getEntryPoints();
  const entryPointsSet = new Set(entryPoints);

  checkEntryPointsBrokenLink(entryPoints);

  checkEntryPointsForDirectory("src/classes/*.ts", entryPointsSet);

  checkEntryPointsForDirectory(
    "src/enums/*.ts",
    entryPointsSet,
    (filePath) => !filePath.endsWith("private"),
  );

  checkEntryPointsForDirectory(
    "src/features/*.ts",
    entryPointsSet,
    (filePath) => filePath.endsWith(".ts"),
  );

  checkEntryPointsForDirectory(
    "src/functions/*.ts",
    entryPointsSet,
    (filePath) => !filePath.endsWith("Tests.ts"),
  );

  checkEntryPointsForDirectory(
    "src/interfaces/*.ts",
    entryPointsSet,
    (filePath) =>
      !filePath.endsWith("private") &&
      !filePath.endsWith("AddCallbackParameterCustom.ts"),
  );

  // Only specific maps in the "maps" directory are exported. Thus, we do not check this directory.

  checkEntryPointsForDirectory(
    "src/types/*.ts",
    entryPointsSet,
    (filePath) => !filePath.endsWith("private") && !filePath.endsWith(".d.ts"),
  );
}

function getEntryPoints(): string[] {
  let fileContents: string;
  try {
    fileContents = fs.readFileSync(TYPEDOC_CONFIG_PATH, "utf8");
  } catch (err) {
    error(`Failed to read the "${TYPEDOC_CONFIG_PATH}" file:`, err);
  }

  let config: Record<string, unknown>;
  try {
    config = JSONC.parse(fileContents) as Record<string, unknown>;
  } catch (err) {
    error(`Failed to parse the "${TYPEDOC_CONFIG_PATH}" file:`, err);
  }

  if (typeof config !== "object") {
    error(`Failed to read the config file: ${TYPEDOC_CONFIG_PATH}`);
  }

  const { entryPoints } = config;
  if (!Array.isArray(entryPoints)) {
    error(`Failed to read the "entryPoints" field: ${TYPEDOC_CONFIG_PATH}`);
  }

  return entryPoints as string[];
}

function checkEntryPointsBrokenLink(entryPoints: string[]) {
  for (const entryPoint of entryPoints) {
    const entryPointPath = path.join(PACKAGE_ROOT, entryPoint);
    if (!isFile(entryPointPath, false)) {
      error(`The following entry point does not exist: ${entryPoint}`);
    }
  }
}

function checkEntryPointsForDirectory(
  globPath: string,
  entryPointsSet: Set<string>,
  filterFunction: ((filePath: string) => boolean) | undefined = undefined,
) {
  const filePaths = glob.sync(globPath);
  if (filePaths.length === 0) {
    error(`Failed to find any files in the following glob: ${globPath}`);
  }

  const filteredFilePaths =
    filterFunction === undefined ? filePaths : filePaths.filter(filterFunction);

  for (const filePath of filteredFilePaths) {
    if (!entryPointsSet.has(filePath)) {
      error(
        `Failed to find the following file in the entry points: ${filePath}`,
      );
    }
  }
}

function error(...args: unknown[]): never {
  console.error(...args);
  return process.exit(1);
}

function getFileStats(filePath: string, verbose: boolean): fs.Stats {
  if (verbose) {
    console.log(`Getting file stats from: ${filePath}`);
  }

  let fileStats: fs.Stats;
  try {
    fileStats = fs.statSync(filePath);
  } catch (err) {
    error(`Failed to get the file stats for "${filePath}":`, err);
  }

  if (verbose) {
    console.log(`Got file stats from: ${filePath}`);
  }

  return fileStats;
}

function isFile(filePath: string, verbose: boolean): boolean {
  const fileStats = getFileStats(filePath, verbose);
  return fileStats.isFile();
}
