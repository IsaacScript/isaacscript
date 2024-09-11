import type { ReadonlyRecord } from "complete-common";
import { fatalError, getJSONC, isFile, writeFile } from "complete-node";
import path from "node:path";
import { Config } from "./classes/Config.js";
import type { ValidatedConfig } from "./classes/ValidatedConfig.js";
import { getModsDirectory } from "./commands/init/getModsDirectory.js";
import { getSaveSlot } from "./commands/init/getSaveSlot.js";
import { CONFIG_FILE_NAME, CONFIG_FILE_PATH, CWD } from "./constants.js";

const NUM_INDENT_SPACES = 2;

export async function getConfigFromFile(): Promise<ValidatedConfig> {
  const existingConfig = getExistingConfig();
  if (existingConfig !== undefined) {
    return existingConfig;
  }

  // No config file exists, so prompt the user for some information and create one.
  const modsDirectory = await getModsDirectory(undefined);
  const saveSlot = await getSaveSlot(undefined, false);
  const config = new Config(modsDirectory, saveSlot, false) as ValidatedConfig;
  createConfigFile(CWD, config);

  return config;
}

function getExistingConfig(): ValidatedConfig | undefined {
  if (!isFile(CONFIG_FILE_PATH)) {
    return undefined;
  }

  const config = getJSONC(CONFIG_FILE_PATH);
  validateMandatoryConfigFields(config);

  return config as unknown as ValidatedConfig;
}

/**
 * Even though some fields are always initialized in the class, it may not be necessarily exist in
 * the JSON file.
 */
function validateMandatoryConfigFields(
  config: ReadonlyRecord<string, unknown>,
) {
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

function errorMissing(field: string, description: string): never {
  fatalError(
    `The "${CONFIG_FILE_NAME}" file is missing a "${field}" value. ${description} Please add it.`,
  );
}

export function createConfigFile(projectPath: string, config: Config): void {
  const configFilePath = path.join(projectPath, CONFIG_FILE_NAME);
  const configContents = JSON.stringify(config, undefined, NUM_INDENT_SPACES);

  // Add a newline at the end to satisfy Prettier.
  const configContentsWithNewline = `${configContents}\n`;

  writeFile(configFilePath, configContentsWithNewline);
}
