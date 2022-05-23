import chalk from "chalk";
import { CWD } from "../../constants";
import * as file from "../../file";
import { getInputYesNo } from "../../prompt";
import { error } from "../../utils";

export async function checkIfProjectPathExists(
  projectPath: string,
  yes: boolean,
  verbose: boolean,
): Promise<void> {
  if (projectPath === CWD || !file.exists(projectPath, verbose)) {
    return;
  }

  const fileType = file.isDir(projectPath, verbose) ? "directory" : "file";

  if (yes) {
    file.deleteFileOrDirectory(projectPath, verbose);
    console.log(`Deleted ${fileType}: ${chalk.green(projectPath)}`);
    return;
  }

  console.log(
    `A ${fileType} already exists with a name of: ${chalk.green(projectPath)}`,
  );
  const shouldDelete = await getInputYesNo("Do you want me to delete it?");

  if (!shouldDelete) {
    error("Ok then. Goodbye.");
  }

  file.deleteFileOrDirectory(projectPath, verbose);
}
