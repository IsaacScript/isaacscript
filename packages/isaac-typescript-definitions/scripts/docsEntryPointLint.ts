import glob from "glob";
import { file } from "isaacscript-cli";
import path from "path";
import process from "process";

const REPO_ROOT = path.join(__dirname, "..");
const TYPEDOC_CONFIG_PATH = path.join(REPO_ROOT, "typedoc.json");
const INDEX_PATH = path.join(REPO_ROOT, "src", "types", "index.d.ts");
const INDEX_CONTENTS = file.read(INDEX_PATH, false);

main();

function main() {
  process.chdir(REPO_ROOT);

  const entryPoints = getEntryPoints();
  const entryPointsSet = new Set(entryPoints);

  checkEntryPointsForDirectory("src/enums/*.ts", entryPointsSet);
  checkEntryPointsForDirectory("src/enums/collections/*.ts", entryPointsSet);
  checkEntryPointsForDirectory("src/enums/flags/*.ts", entryPointsSet);
  checkEntryPointsForDirectory("src/types/classes/*.ts", entryPointsSet);
  checkEntryPointsForDirectory("src/types/mods/*.ts", entryPointsSet);
  checkEntryPointsForDirectory("src/types/unofficial/*.ts", entryPointsSet);
}

function getEntryPoints(): string[] {
  // eslint-disable-next-line @typescript-eslint/no-var-requires,import/no-dynamic-require,global-require
  const typeDocConfig = require(TYPEDOC_CONFIG_PATH) as Record<string, unknown>;

  if (typeof typeDocConfig !== "object") {
    error(`Failed to read the config file: ${TYPEDOC_CONFIG_PATH}`);
  }

  const { entryPoints } = typeDocConfig;
  if (!Array.isArray(entryPoints)) {
    error(`Failed to read the "entryPoints" field: ${TYPEDOC_CONFIG_PATH}`);
  }

  return entryPoints as string[];
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

function error(...args: unknown[]): never {
  console.error(...args);
  return process.exit(1);
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
