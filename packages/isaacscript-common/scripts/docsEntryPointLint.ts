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

  checkEntryPointsForDirectory(
    "src/classes/*.ts",
    entryPointsSet,
    (filePath) => !filePath.endsWith("private"),
  );
  checkEntryPointsForDirectory(
    "src/classes/features/other/*.ts",
    entryPointsSet,
    (filePath) => filePath.endsWith(".ts"),
  );
  checkEntryPointsForDirectory("src/core/*.ts", entryPointsSet);
  checkEntryPointsForDirectory(
    "src/enums/*.ts",
    entryPointsSet,
    (filePath) => !filePath.endsWith("private"),
  );
  checkEntryPointsForDirectory("src/functions/*.ts", entryPointsSet);
  checkEntryPointsForDirectory(
    "src/interfaces/*.ts",
    entryPointsSet,
    (filePath) => !filePath.endsWith("private"),
  );
  // - Maps are not linted, since we only want to explicitly export a few of them.
  // - Objects are not linted, since we only want to explicitly export a few of them.
  checkEntryPointsForDirectory(
    "src/types/*.ts",
    entryPointsSet,
    (filePath) => !filePath.endsWith(".d.ts") && !filePath.endsWith("private"),
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
    if (!fileExists(entryPointPath)) {
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

function fileExists(filePath: string): boolean {
  let pathExists: boolean;
  try {
    pathExists = fs.existsSync(filePath);
  } catch (err) {
    error(`Failed to check if "${filePath}" exists:`, err);
  }

  return pathExists;
}
