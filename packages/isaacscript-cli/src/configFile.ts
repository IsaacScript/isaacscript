import { error } from "isaacscript-common-ts";
import path from "node:path";
import { Config } from "./classes/Config.js";
import { getModsDir } from "./commands/init/getModsDir.js";
import { promptSaveSlot } from "./commands/init/promptSaveSlot.js";
import { CONFIG_FILE_NAME, CONFIG_FILE_PATH, CWD } from "./constants.js";
import { fileExists, writeFile } from "./file.js";
import { getJSONC } from "./json.js";
import { Args } from "./parseArgs.js";

const NUM_INDENT_SPACES = 2;

export async function getConfigFromFile(
  args: Args,
  typeScript: boolean,
): Promise<Config> {
  const verbose = args.verbose === true;
  const yes = args.yes === true;
  const dev = args.dev === true;

  const existingConfig = getExistingConfig(verbose);
  if (existingConfig !== undefined) {
    return existingConfig;
  }

  // No config file exists, so prompt the user for some information and create one.
  const modsDirectory = await getModsDir(args, typeScript, verbose);
  const saveSlot = await promptSaveSlot(args, yes);
  const config = new Config(modsDirectory, saveSlot, dev);
  createConfigFile(CWD, config, typeScript, verbose);

  return config;
}

function getExistingConfig(verbose: boolean): Config | undefined {
  if (!fileExists(CONFIG_FILE_PATH, verbose)) {
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
  typeScript: boolean,
  verbose: boolean,
): void {
  if (typeScript) {
    return;
  }

  const configFilePath = path.join(projectPath, CONFIG_FILE_NAME);

  // Add a newline at the end to satisfy Prettier.
  const configContents = JSON.stringify(
    config,
    undefined,
    NUM_INDENT_SPACES,
  ).concat("\n");

  writeFile(configFilePath, configContents, verbose);
}
