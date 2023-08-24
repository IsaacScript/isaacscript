import chalk from "chalk";
import path from "node:path";
import { CWD, PACKAGE_JSON, PROJECT_NAME } from "./constants.js";
import { fileExists, isDir, isFile } from "./file.js";

/** We don't check "node_modules" because we might be cloning a fresh IsaacScript project. */
const SUBDIRECTORIES_TO_CHECK = ["src", "mod"] as const;

// Validate that we are in a directory that looks like an IsaacScript project.
export function validateInIsaacScriptProject(verbose: boolean): void {
  const filesToCheck = [PACKAGE_JSON];
  for (const fileName of filesToCheck) {
    const filePath = path.join(CWD, fileName);
    if (!fileExists(filePath, verbose) || !isFile(filePath, verbose)) {
      errorNotExists(fileName, true);
    }
  }

  for (const subdirectoryName of SUBDIRECTORIES_TO_CHECK) {
    const subdirectoryPath = path.join(CWD, subdirectoryName);
    if (
      !fileExists(subdirectoryPath, verbose) ||
      !isDir(subdirectoryPath, verbose)
    ) {
      errorNotExists(subdirectoryName, false);
    }
  }
}

function errorNotExists(dirName: string, file: boolean) {
  const noun = file ? "file" : "subdirectory";
  console.error(
    chalk.red(
      `It looks like the current working directory is not an ${PROJECT_NAME} project. (There is no "${dirName}" ${noun} here.)`,
    ),
  );
  console.error(
    `Did you mean to create a new ${PROJECT_NAME} project with "${
      chalk.green(
        "npx isaacscript init",
      )
    }"?`,
  );
  console.error(
    `If not, then change the current working directory to an ${PROJECT_NAME} project.`,
  );
  process.exit(1);
}
