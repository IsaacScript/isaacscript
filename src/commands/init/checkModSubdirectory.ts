import chalk from "chalk";
import { CWD } from "../../constants";
import * as file from "../../file";
import { error } from "../../utils";

export function checkModSubdirectory(
  projectPath: string,
  modsDirectory: string,
): void {
  if (file.isSubDirOf(CWD, modsDirectory)) {
    console.error(
      `Error: The project directory of "${chalk.green(
        projectPath,
      )}" is a subdirectory of "${chalk.green(modsDirectory)}".`,
    );
    error(
      'You are supposed to have your project folder somewhere else on the system than the Isaac mods directory. (This is because we don\'t want to upload the ".git" folder or the TypeScript files to the Steam Workshop.) Exiting.',
    );
  }
}
