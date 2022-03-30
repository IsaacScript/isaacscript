import chalk from "chalk";
import path from "path";
import { PROJECT_NAME } from "../../constants";
import * as file from "../../file";
import { getInputYesNo } from "../../prompt";
import { error } from "../../utils";

export async function checkModTargetDirectory(
  modsDirectory: string,
  projectName: string,
  yes: boolean,
  verbose: boolean,
): Promise<void> {
  const modTargetPath = path.join(modsDirectory, projectName);
  if (!file.exists(modTargetPath, verbose)) {
    return;
  }

  const fileType = file.isDir(modTargetPath, verbose) ? "directory" : "file";

  if (yes) {
    file.deleteFileOrDirectory(modTargetPath, verbose);
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
    error("Ok then. Goodbye.");
  }

  file.deleteFileOrDirectory(modTargetPath, verbose);
}
