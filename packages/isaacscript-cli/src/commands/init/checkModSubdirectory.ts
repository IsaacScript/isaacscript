import chalk from "chalk";
import { CWD } from "../../constants.js";
import { isSubDirOf } from "../../file.js";
import { fatalError } from "../../isaacScriptCommonTS.js";

export function checkModSubdirectory(
  projectPath: string,
  modsDirectory: string,
): void {
  if (isSubDirOf(CWD, modsDirectory)) {
    console.error(
      `Error: The project directory of "${chalk.green(
        projectPath,
      )}" is a subdirectory of "${chalk.green(modsDirectory)}".`,
    );
    fatalError(
      'You are supposed to have your project folder somewhere else on the system than the Isaac mods directory. (This is because we don\'t want to upload the ".git" folder or the TypeScript files to the Steam Workshop.) Exiting.',
    );
  }
}
