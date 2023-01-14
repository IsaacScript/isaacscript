import { error } from "isaacscript-common-ts";
import path from "path";
import { Config } from "./classes/Config";
import { getModsDir } from "./commands/init/getModsDir";
import { promptSaveSlot } from "./commands/init/promptSaveSlot";
import { CONFIG_FILE_NAME, CONFIG_FILE_PATH, CWD } from "./constants";
import * as file from "./file";
import { getJSONC } from "./json";
import { Args } from "./parseArgs";

const NUM_INDENT_SPACES = 2;

export async function getConfigFromFile(args: Args): Promise<Config> {
  const verbose = args.verbose === true;
  const yes = args.yes === true;
  const dev = args.dev === true;

  const existingConfig = getExistingConfig(verbose);
  if (existingConfig !== undefined) {
    return existingConfig;
  }

  // No config file exists, so prompt the user for some information and create one.
  const modsDirectory = await getModsDir(args, verbose);
  const saveSlot = await promptSaveSlot(args, yes);
  const config = new Config(modsDirectory, saveSlot, dev);
  createConfigFile(CWD, config, verbose);

  return config;
}

function getExistingConfig(verbose: boolean): Config | undefined {
  if (!file.exists(CONFIG_FILE_PATH, verbose)) {
    return undefined;
  }

  const config = getJSONC(CONFIG_FILE_PATH, verbose);
  validateMandatoryConfigFields(config);

  return config as unknown as Config;
}

/**
 * Even though some fields are always initialized in the class, it may not be necessarily exist in
 * the JSON file.
 */
function validateMandatoryConfigFields(config: Record<string, unknown>) {
  if (config["modsDirectory"] === undefined) {
    errorMissing(
      "modsDirectory",
      "This should be equal to the directory where Isaac mods live on your system.",
    );
  }

  if (config["saveSlot"] === undefined) {
    errorMissing(
      "saveSlot",
      "This should be equal to the save slot that you test your mods on.",
    );
  }
}

function errorMissing(field: string, description: string) {
  error(
    `The "${CONFIG_FILE_NAME}" file is missing a "${field}" value. ${description} Please add it.`,
  );
}

export function createConfigFile(
  projectPath: string,
  config: Config,
  verbose: boolean,
): void {
  const configFilePath = path.join(projectPath, CONFIG_FILE_NAME);

  // Add a newline at the end to satisfy Prettier.
  const configContents = JSON.stringify(
    config,
    undefined,
    NUM_INDENT_SPACES,
  ).concat("\n");

  file.write(configFilePath, configContents, verbose);
}
