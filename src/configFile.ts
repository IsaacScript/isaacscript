import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import Config from "./Config";
import { CONFIG_FILE_PATH } from "./constants";
import * as file from "./file";

export function read(): Config {
  const configRaw = file.read(CONFIG_FILE_PATH);
  let config: Config;
  try {
    config = JSONC.parse(configRaw) as Config;
  } catch (err) {
    console.error(`Failed to parse "${chalk.green(CONFIG_FILE_PATH)}":`, err);
    process.exit(1);
  }

  return config;
}

export function write(config: Config): void {
  const configContents = JSON.stringify(config, null, 2);
  file.write(CONFIG_FILE_PATH, configContents);
}
