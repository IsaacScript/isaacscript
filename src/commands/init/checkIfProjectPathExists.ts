import chalk from "chalk";
import { CWD } from "../../constants";
import * as file from "../../file";
import { getInputYesNo } from "../../prompt";
import { error } from "../../utils";

export async function checkIfProjectPathExists(
  projectPath: string,
  verbose: boolean,
): Promise<void> {
  if (projectPath !== CWD && file.exists(projectPath)) {
    const fileType = file.isDir(projectPath) ? "directory" : "file";
    console.log(
      `A ${fileType} already exists with a name of "${chalk.green(
        projectPath,
      )}".`,
    );

    const shouldDelete = await getInputYesNo("Do you want me to delete it?");

    if (!shouldDelete) {
      error("Ok then. Good-bye.");
    }

    file.deleteFileOrDirectory(projectPath, verbose);
  }
}
