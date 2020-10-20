import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import Config from "./Config";
import { CONFIG_FILE_PATH } from "./constants";
import * as misc from "./misc";

export function read(): Config {
  const configRaw = misc.read(CONFIG_FILE_PATH);
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
  misc.write(CONFIG_FILE_PATH, configContents);
}
