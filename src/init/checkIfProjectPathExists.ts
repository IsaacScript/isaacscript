import chalk from "chalk";
import prompts from "prompts";
import { CWD } from "../constants";
import * as file from "../file";

export default async function checkIfProjectPathExists(
  projectPath: string,
): Promise<void> {
  if (projectPath !== CWD && file.exists(projectPath)) {
    const fileType = file.isDir(projectPath) ? "directory" : "file";
    console.log(
      `A ${fileType} already exists with a name of "${chalk.green(
        projectPath,
      )}".`,
    );

    const response = await prompts({
      type: "confirm",
      name: "delete",
      message: "Do you want me to delete it?",
    });
    if (!response.delete) { // eslint-disable-line
      console.error("Ok then. Good-bye.");
      process.exit(1);
    }

    if (fileType === "directory") {
      file.deleteDir(projectPath);
    } else {
      file.deleteFile(projectPath);
    }
  }
}
