import chalk from "chalk";
import {
  deleteFileOrDirectory,
  fatalError,
  fileOrDirectoryExists,
  isDirectory,
} from "complete-node";
import path from "node:path";
import { PROJECT_NAME } from "../../constants.js";
import { getInputYesNo } from "../../prompt.js";

export async function checkModTargetDirectory(
  modsDirectory: string,
  projectName: string,
  yes: boolean,
): Promise<void> {
  const modTargetPath = path.join(modsDirectory, projectName);
  if (!fileOrDirectoryExists(modTargetPath)) {
    return;
  }

  const fileType = isDirectory(modTargetPath) ? "directory" : "file";

  if (yes) {
    deleteFileOrDirectory(modTargetPath);
    console.log(`Deleted ${fileType}: ${chalk.green(modTargetPath)}`);
    return;
  }

  console.log(
    `A ${fileType} already exists at at the mod path of: ${chalk.green(
      modTargetPath,
    )}`,
  );
  console.log(
    `${PROJECT_NAME} will need to sync your project folder with this directory.`,
  );
  const shouldDelete = await getInputYesNo("Do you want me to delete it?");

  if (!shouldDelete) {
    fatalError("Ok then. Goodbye.");
  }

  deleteFileOrDirectory(modTargetPath);
}
