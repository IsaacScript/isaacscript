import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import path from "path";
import { getModsDir } from "./commands/init/getModsDir";
import { promptSaveSlot } from "./commands/init/promptSaveSlot";
import { CONFIG_FILE_NAME, CONFIG_FILE_PATH, CWD } from "./constants";
import * as file from "./file";
import { Config } from "./types/Config";
import { error } from "./utils";

export async function get(argv: Record<string, unknown>): Promise<Config> {
  const verbose = argv.verbose === true;

  const existingConfig = readExistingConfig();
  if (existingConfig !== undefined) {
    return existingConfig;
  }

  // No config file exists, so prompt the user for some information and create one
  const modsDirectory = await getModsDir(argv);
  const saveSlot = await promptSaveSlot(argv);
  const config = createObject(modsDirectory, saveSlot);
  createFile(CWD, config, verbose);

  return config;
}

function readExistingConfig(): Config | undefined {
  if (!file.exists(CONFIG_FILE_PATH)) {
    return undefined;
  }

  const configRaw = file.read(CONFIG_FILE_PATH);
  let config: Config;
  try {
    config = JSONC.parse(configRaw) as Config;
  } catch (err) {
    error(`Failed to parse the "${chalk.green(CONFIG_FILE_PATH)}" file:`, err);
  }

  if (config.modsDirectory === undefined) {
    errorMissing(
      "modsDirectory",
      "This should be equal to the directory where Isaac mods live on your system.",
    );
  }

  if (config.saveSlot === undefined) {
    errorMissing(
      "saveSlot",
      "This should be equal to the save slot that you test your mods on.",
    );
  }

  return config;
}

function errorMissing(field: string, description: string) {
  error(
    `The "${CONFIG_FILE_NAME}" file is missing a "${field}" value. ${description} Please add it.`,
  );
}

export function createObject(modsDirectory: string, saveSlot: number): Config {
  return {
    modsDirectory,
    saveSlot,
  };
}

export function createFile(
  projectPath: string,
  config: Config,
  verbose: boolean,
): void {
  const configFilePath = path.join(projectPath, CONFIG_FILE_NAME);
  const configContents = JSON.stringify(config, null, 2);
  file.write(configFilePath, configContents, verbose);
}
