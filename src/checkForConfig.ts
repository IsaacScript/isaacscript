import chalk from "chalk";
import { CONFIG_FILE_NAME, CONFIG_FILE_PATH } from "./constants";
import * as file from "./file";

export default function checkForConfig(): void {
  if (file.exists(CONFIG_FILE_PATH)) {
    return;
  }

  console.error(
    chalk.red(
      `An "${CONFIG_FILE_NAME}" was not found in the current directory.`,
    ),
  );
  console.error("IsaacScript needs this file in order to run.");
  console.error(
    `Use the "${chalk.green(
      "npx create-isaacscript-mod",
    )}" command to create a new project (with an "${chalk.green(
      CONFIG_FILE_NAME,
    )}" file). Then, go into that directory and run "${chalk.green(
      "npx isaacscript",
    )}".`,
  );
  process.exit(1);
}
