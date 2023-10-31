import chalk from "chalk";
import { isDirectory, isFile } from "isaacscript-common-node";
import path from "node:path";
import { CWD, PACKAGE_JSON, PROJECT_NAME } from "./constants.js";

const FILE_NAMES_TO_CHECK = [PACKAGE_JSON] as const;

/** We don't check "node_modules" because we might be cloning a fresh IsaacScript project. */
const SUBDIRECTORY_NAMES_TO_CHECK = ["src", "mod"] as const;

// Validate that we are in a directory that looks like an IsaacScript project.
export function validateInIsaacScriptProject(): void {
  for (const fileName of FILE_NAMES_TO_CHECK) {
    const filePath = path.join(CWD, fileName);
    if (!isFile(filePath)) {
      errorNotExists(fileName, true);
    }
  }

  for (const subdirectoryName of SUBDIRECTORY_NAMES_TO_CHECK) {
    const subdirectoryPath = path.join(CWD, subdirectoryName);
    if (!isDirectory(subdirectoryPath)) {
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
    `Did you mean to create a new ${PROJECT_NAME} project with "${chalk.green(
      "npx isaacscript init",
    )}"?`,
  );
  console.error(
    `If not, then change the current working directory to an ${PROJECT_NAME} project.`,
  );
  process.exit(1);
}
