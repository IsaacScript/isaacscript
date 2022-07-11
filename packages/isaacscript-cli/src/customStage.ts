import chalk from "chalk";
import path from "path";

import { CWD } from "./constants";
import { PackageManager } from "./enums/PackageManager";
import * as file from "./file";
import { CustomStageMetadata } from "./interfaces/CustomStageMetadata";
import { CustomStageRoomMetadata } from "./interfaces/CustomStageRoomMetadata";
import { getPackageManagerAddCommand } from "./packageManager";
import { getCustomStages } from "./tsconfig";
import { error } from "./utils";

const ISAACSCRIPT_COMMON = "isaacscript-common";
const ISAACSCRIPT_COMMON_PATH = path.join(
  CWD,
  "node_modules",
  ISAACSCRIPT_COMMON,
);
const METADATA_LUA_PATH = path.join(
  ISAACSCRIPT_COMMON_PATH,
  "features",
  "customStage",
  "metadata.lua",
);

/**
 * In order for the custom stage feature to work properly, Lua code will need to know the list of
 * possible rooms corresponding to a custom stage. In an end-user mod, this is a Lua file located at
 * `METADATA_LUA_PATH`. By default, the file is blank, and must be filled in by tooling before
 * compiling the mod.
 */
export function fillCustomStageMetadata(
  packageManager: PackageManager,
  verbose: boolean,
): void {
  const customStages = getCustomStages(verbose);
  if (customStages.length === 0) {
    return;
  }

  validateMetadataExists(packageManager, verbose);

  const customStagesMetadata: CustomStageMetadata[] = [];

  for (const customStage of customStages) {
    const xmlPath = path.resolve(CWD, customStage.xmlPath);
    if (!file.exists(xmlPath, verbose)) {
      error(
        `${chalk.red(
          "Failed to find the custom stage XML file at:",
        )} ${chalk.green(xmlPath)}`,
      );
    }

    const customStageRoomsMetadata: CustomStageRoomMetadata[] = [];

    if (!file.exists(METADATA_LUA_PATH, verbose)) {
      error(
        `${chalk.red(
          "Failed to find the the custom stage metadata file at:",
        )} ${chalk.green(METADATA_LUA_PATH)}`,
      );
    }

    const xmlContents = file.read(xmlPath, verbose);

    console.log(JSON.stringify(xmlDocument, null, 2));

    error("DONE");
  }
}

function validateMetadataExists(
  packageManager: PackageManager,
  verbose: boolean,
) {
  if (!file.isDir(ISAACSCRIPT_COMMON_PATH, verbose)) {
    const addCommand = getPackageManagerAddCommand(
      packageManager,
      ISAACSCRIPT_COMMON,
    );
    error(
      `${chalk.red(
        `The custom stages feature requires a dependency of "${ISAACSCRIPT_COMMON}" in the "package.json" file. You can add it with the following command:`,
      )} ${chalk.green(addCommand)}`,
    );
  }

  if (!file.exists(METADATA_LUA_PATH, verbose)) {
    error(
      `${chalk.red(
        "Failed to find the the custom stage metadata file at:",
      )} ${chalk.green(METADATA_LUA_PATH)}`,
    );
  }
}
