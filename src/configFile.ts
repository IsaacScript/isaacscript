import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import { Config } from "./Config";
import { CONFIG_FILE_NAME, CONFIG_FILE_PATH } from "./constants";
import * as file from "./file";

export function read(): Config | null {
  if (!file.exists(CONFIG_FILE_PATH)) {
    return null;
  }

  const configRaw = file.read(CONFIG_FILE_PATH);
  let config: Config;
  try {
    config = JSONC.parse(configRaw) as Config;
  } catch (err) {
    console.error(
      `Failed to parse the "${chalk.green(CONFIG_FILE_PATH)}" file:`,
      err,
    );
    process.exit(1);
  }

  if (config.projectName === undefined) {
    console.error(
      'The IsaacScript config file is missing a "projectName" value. This should be equal to the directory name of your project. Please add it.',
    );
    process.exit(1);
  }

  if (config.modsDirectory === undefined) {
    console.error(
      'The IsaacScript config file is missing a "modsDirectory" value. This should be equal to the directory where mods live on your system. Please add it.',
    );
    process.exit(1);
  }

  if (config.saveSlot === undefined) {
    console.error(
      'The IsaacScript config file is missing a "saveSlot" value. This should be equal to the save slot that you test your mods on. Please add it.',
    );
    process.exit(1);
  }

  return config;
}

export function errorNotExist(): void {
  console.error(
    chalk.red(
      `An "${CONFIG_FILE_NAME}" was not found in the current directory.`,
    ),
  );
  console.error("IsaacScript needs this file in order to run.");
  console.error(
    `Use the "${chalk.green(
      "npx isaacscript init",
    )}" command to create a new project (with an "${chalk.green(
      CONFIG_FILE_NAME,
    )}" file). Then, go into that directory and run "${chalk.green(
      "npx isaacscript",
    )}".`,
  );

  process.exit(1);
}
