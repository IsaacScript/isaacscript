import chalk from "chalk";
import {
  deleteFileOrDirectory,
  exists,
  fatalError,
  isDirectory,
  isFile,
} from "complete-node";
import { CWD } from "../../constants.js";
import { getInputYesNo } from "../../prompt.js";

/** @throws If the project path exists and is not a file or a directory. */
export async function checkIfProjectPathExists(
  projectPath: string,
  yes: boolean,
): Promise<void> {
  if (projectPath === CWD) {
    return;
  }

  const projectPathExists = await exists(projectPath);
  if (!projectPathExists) {
    return;
  }

  const file = await isFile(projectPath);
  const directory = await isDirectory(projectPath);
  if (!file && !directory) {
    throw new Error(
      `Failed to detect if the path was a file or a directory: ${projectPath}`,
    );
  }
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
