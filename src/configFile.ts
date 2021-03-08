import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import Config from "./Config";
import { CONFIG_FILE_NAME, CONFIG_FILE_PATH } from "./constants";
import * as file from "./file";

export function read(): Config {
  if (!file.exists(CONFIG_FILE_PATH)) {
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

  const configRaw = file.read(CONFIG_FILE_PATH);
  let config: Config;
  try {
    config = JSONC.parse(configRaw) as Config;
  } catch (err) {
    console.error(`Failed to parse "${chalk.green(CONFIG_FILE_PATH)}":`, err);
    process.exit(1);
  }

  if (config.modTargetPath === undefined) {
    console.error(
      'The IsaacScript config file is missing a "modTargetPath" value. Please add it.',
    );
    process.exit(1);
  }

  if (config.saveSlot === undefined) {
    console.error(
      'The IsaacScript config file is missing a "saveSlot" value. Please add it.',
    );
    process.exit(1);
  }

  return config;
}
