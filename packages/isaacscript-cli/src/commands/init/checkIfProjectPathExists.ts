import chalk from "chalk";
import {
  deleteFileOrDirectory,
  fatalError,
  isDirectory,
  isFileOrDirectory,
} from "complete-node";
import { CWD } from "../../constants.js";
import { getInputYesNo } from "../../prompt.js";

export async function checkIfProjectPathExists(
  projectPath: string,
  yes: boolean,
): Promise<void> {
  const exists = await isFileOrDirectory(projectPath);
  if (projectPath === CWD || !exists) {
    return;
  }

  const directory = await isDirectory(projectPath);
  const fileType = directory ? "directory" : "file";

  if (yes) {
    await deleteFileOrDirectory(projectPath);
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

  await deleteFileOrDirectory(projectPath);
}
