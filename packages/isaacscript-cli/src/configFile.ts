import chalk from "chalk";
import * as JSONC from "jsonc-parser";
import path from "path";
import { getModsDir } from "./commands/init/getModsDir";
import { promptSaveSlot } from "./commands/init/promptSaveSlot";
import { CONFIG_FILE_NAME, CONFIG_FILE_PATH, CWD } from "./constants";
import * as file from "./file";
import { Args } from "./parseArgs";
import { Config } from "./types/Config";
import { error } from "./utils";

const NUM_SPACES = 2;

export async function get(args: Args): Promise<Config> {
  const verbose = args.verbose === true;
  const yes = args.yes === true;

  const existingConfig = readExistingConfig(verbose);
  if (existingConfig !== undefined) {
    return existingConfig;
  }

  // No config file exists, so prompt the user for some information and create one.
  const modsDirectory = await getModsDir(args, verbose);
  const saveSlot = await promptSaveSlot(args, yes);
  const config = createObject(modsDirectory, saveSlot);
  createFile(CWD, config, verbose);

  return config;
}

function readExistingConfig(verbose: boolean): Config | undefined {
  if (!file.exists(CONFIG_FILE_PATH, verbose)) {
    return undefined;
  }

  const configRaw = file.read(CONFIG_FILE_PATH, verbose);

  let config: Config;
  try {
    config = JSONC.parse(configRaw) as Config;
  } catch (err) {
    error(`Failed to parse the "${chalk.green(CONFIG_FILE_PATH)}" file:`, err);
  }

  // Even though the "modsDirectory" property is always initialized in the class, it may not be
  // necessarily exist in the JSON file.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (config.modsDirectory === undefined) {
    errorMissing(
      "modsDirectory",
      "This should be equal to the directory where Isaac mods live on your system.",
    );
  }

  // Even though the "saveSlot" property is always initialized in the class, it may not be
  // necessarily exist in the JSON file.
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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

  // Add a newline at the end to satisfy Prettier.
  const configContents = JSON.stringify(config, null, NUM_SPACES).concat("\n");

  file.write(configFilePath, configContents, verbose);
}
