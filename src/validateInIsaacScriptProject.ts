import chalk from "chalk";
import path from "path";
import { CWD, PROJECT_NAME } from "./constants";
import * as file from "./file";

// Validate that we are in a directory that looks like an IsaacScript project
export function validateInIsaacScriptProject(): void {
  const subdirectoriesToCheck = ["src", "mod", "node_modules"];
  for (const subdirectoryName of subdirectoriesToCheck) {
    const subdirectoryPath = path.join(CWD, subdirectoryName);
    if (!file.exists(subdirectoryPath) || !file.isDir(subdirectoryPath)) {
      errorNotExists(subdirectoryPath);
    }
  }
}

function errorNotExists(dirName: string) {
  console.error(
    chalk.red(
      `It looks like the current working directory is not an ${PROJECT_NAME} project. (There is no "${dirName}" subdirectory here.)`,
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
