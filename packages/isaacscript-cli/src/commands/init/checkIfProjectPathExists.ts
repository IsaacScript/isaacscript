import chalk from "chalk";
import {
  deleteFileOrDirectory,
  fatalError,
  isDirectory,
} from "isaacscript-common-node";
import fs from "node:fs";
import { CWD } from "../../constants.js";
import { getInputYesNo } from "../../prompt.js";

export async function checkIfProjectPathExists(
  projectPath: string,
  yes: boolean,
): Promise<void> {
  if (projectPath === CWD || !fs.existsSync(projectPath)) {
    return;
  }

  const fileType = isDirectory(projectPath) ? "directory" : "file";

  if (yes) {
    deleteFileOrDirectory(projectPath);
    console.log(`Deleted ${fileType}: ${chalk.green(projectPath)}`);
    return;
  }

  console.log(
    `A ${fileType} already exists with a name of: ${chalk.green(projectPath)}`,
  );
  const shouldDelete = await getInputYesNo("Do you want me to delete it?");

  if (!shouldDelete) {
    fatalError("Ok then. Goodbye.");
  }

  deleteFileOrDirectory(projectPath);
}
