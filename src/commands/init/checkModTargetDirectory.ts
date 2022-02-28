import chalk from "chalk";
import path from "path";
import { PROJECT_NAME } from "../../constants";
import * as file from "../../file";
import { getInputYesNo } from "../../prompt";
import { error } from "../../utils";

export async function checkModTargetDirectory(
  modsDirectory: string,
  projectName: string,
  verbose: boolean,
): Promise<void> {
  const modTargetPath = path.join(modsDirectory, projectName);
  if (!file.exists(modTargetPath)) {
    return;
  }

  console.error(
    `Error: The target mod path of "${chalk.green(
      modTargetPath,
    )}" already exists.`,
  );
  console.error(
    `When you run ${PROJECT_NAME}, it will want to create a directory here so that it can sync it with your project folder.`,
  );

  const shouldDeleteDirectory = await getInputYesNo(
    "Should I delete the existing directory for you? (Make sure that it does not contain anything important first.)",
  );

  if (!shouldDeleteDirectory) {
    error("Ok then. You delete it yourself. Good bye.");
  }

  file.deleteFileOrDirectory(modTargetPath, verbose);
}
