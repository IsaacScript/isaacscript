import * as glob from "glob";
import { file } from "isaacscript-cli";
import { error } from "isaacscript-common-ts";
import * as JSONC from "jsonc-parser";
import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";

const PACKAGE_ROOT = path.join(__dirname, "..");
const TYPEDOC_CONFIG_PATH = path.join(PACKAGE_ROOT, "typedoc.json");
const INDEX_PATH = path.join(PACKAGE_ROOT, "src", "types", "index.d.ts");
const INDEX_CONTENTS = file.read(INDEX_PATH, false);

main();

function main() {
  process.chdir(PACKAGE_ROOT);

  const entryPoints = getEntryPoints();
  const entryPointsSet = new Set(entryPoints);

  checkEntryPointsBrokenLink(entryPoints);

  checkEntryPointsForDirectory("src/enums/*.ts", entryPointsSet);
  checkEntryPointsForDirectory("src/enums/collections/*.ts", entryPointsSet);
  checkEntryPointsForDirectory("src/enums/flags/*.ts", entryPointsSet);
  /// checkEntryPointsForDirectory("src/types/classes/*.ts", entryPointsSet);
  /// checkEntryPointsForDirectory("src/types/mods/*.ts", entryPointsSet);
  /// checkEntryPointsForDirectory("src/types/unofficial/*.ts", entryPointsSet);
  // (We skip linting for classes and interfaces, since they generate too many broken links.)
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

    // Additionally, check that it is exported from the "index.d.ts" file.
    if (filePath.endsWith(".d.ts")) {
      const trimmedPath = trimTwoDirectoriesFromPath(filePath);
      if (!INDEX_CONTENTS.includes(trimmedPath)) {
        error(
          `The following declarations file does not seem to be included in a triple slash directive: ${trimmedPath}`,
        );
      }
    }
  }
}

function trimTwoDirectoriesFromPath(filePath: string) {
  const trimmedPath = trimLeftmostDirectoryFromPath(filePath);
  return trimLeftmostDirectoryFromPath(trimmedPath);
}

function trimLeftmostDirectoryFromPath(filePath: string) {
  const firstSlashIndex = filePath.indexOf("/");
  return firstSlashIndex === -1
    ? filePath
    : filePath.substring(firstSlashIndex + 1);
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
