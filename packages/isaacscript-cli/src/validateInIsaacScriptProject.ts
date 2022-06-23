import chalk from "chalk";
import path from "path";
import { CWD, PACKAGE_JSON, PROJECT_NAME } from "./constants";
import * as file from "./file";

// Validate that we are in a directory that looks like an IsaacScript project.
export function validateInIsaacScriptProject(verbose: boolean): void {
  const filesToCheck = [PACKAGE_JSON];
  for (const fileName of filesToCheck) {
    const filePath = path.join(CWD, fileName);
    if (!file.exists(filePath, verbose) || !file.isFile(filePath, verbose)) {
      errorNotExists(fileName, true);
    }
  }

  const subdirectoriesToCheck = ["src", "mod", "node_modules"];
  for (const subdirectoryName of subdirectoriesToCheck) {
    const subdirectoryPath = path.join(CWD, subdirectoryName);
    if (
      !file.exists(subdirectoryPath, verbose) ||
      !file.isDir(subdirectoryPath, verbose)
    ) {
      errorNotExists(subdirectoryName, false);
    }
  }
}

function errorNotExists(dirName: string, isFile: boolean) {
  const noun = isFile ? "file" : "subdirectory";
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
