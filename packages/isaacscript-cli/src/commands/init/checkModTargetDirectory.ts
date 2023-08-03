import chalk from "chalk";
import path from "node:path";
import { PROJECT_NAME } from "../../constants.js";
import { deleteFileOrDirectory, fileExists, isDir } from "../../file.js";
import { fatalError } from "../../isaacScriptCommonTS.js";
import { getInputYesNo } from "../../prompt.js";

export async function checkModTargetDirectory(
  modsDirectory: string,
  projectName: string,
  yes: boolean,
  verbose: boolean,
): Promise<void> {
  const modTargetPath = path.join(modsDirectory, projectName);
  if (!fileExists(modTargetPath, verbose)) {
    return;
  }

  const fileType = isDir(modTargetPath, verbose) ? "directory" : "file";

  if (yes) {
    deleteFileOrDirectory(modTargetPath, verbose);
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

  deleteFileOrDirectory(modTargetPath, verbose);
}
