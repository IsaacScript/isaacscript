import chalk from "chalk";
import path from "path";
import { CWD } from "./constants";
import * as file from "./file";
import { error } from "./misc";

// Validate that we are in a directory that looks like an IsaacScript project
export default function validateInIsaacScriptProject(): void {
  const subdirectoriesToCheck = ["src", "mod", "node_modules"];
  for (const subdirectoryName of subdirectoriesToCheck) {
    const subdirectoryPath = path.join(CWD, subdirectoryName);
    if (!file.exists(subdirectoryPath) || !file.isDir(subdirectoryPath)) {
      errorNotExists(subdirectoryPath);
    }
  }
}

function errorNotExists(dirName: string) {
  error(
    chalk.red(
      `It looks like the current working directory is not an IsaacScript project. (There is no "${dirName}" subdirectory here.) Exiting...`,
    ),
  );
}
