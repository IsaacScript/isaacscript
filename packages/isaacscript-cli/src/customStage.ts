/* eslint-disable @nrwl/nx/enforce-module-boundaries,import/no-relative-packages */

import chalk from "chalk";
import path from "path";
import * as tstl from "typescript-to-lua";
import xml2js from "xml2js";
import {
  CustomStage,
  CustomStageRoomMetadata,
} from "../../isaacscript-common/src/interfaces/CustomStage";
import { CustomStageTSConfig } from "../../isaacscript-common/src/interfaces/CustomStageTSConfig";
import { JSONRoomsFile } from "../../isaacscript-common/src/interfaces/JSONRoomsFile";
import { CWD } from "./constants";
import { PackageManager } from "./enums/PackageManager";
import * as file from "./file";
import { getPackageManagerAddCommand } from "./packageManager";
import { getCustomStagesFromTSConfig } from "./tsconfig";
import { error, parseIntSafe } from "./utils";

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
export async function fillCustomStageMetadata(
  packageManager: PackageManager,
  verbose: boolean,
): Promise<void> {
  const customStagesTSConfig = getCustomStagesFromTSConfig(verbose);
  if (customStagesTSConfig.length === 0) {
    return;
  }

  validateMetadataLuaFileExists(packageManager, verbose);

  const customStages = await getCustomStagesWithMetadata(
    customStagesTSConfig,
    verbose,
  );
  const customStagesLua = convertCustomStagesToLua(customStages);
  file.write(METADATA_LUA_PATH, customStagesLua, verbose);

  error("DONE");
}

function validateMetadataLuaFileExists(
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

/**
 * This parses all of the end-user's XML files and gathers metadata about all of the rooms within.
 * (In other words, this creates the full set of `CustomStage` objects.)
 */
async function getCustomStagesWithMetadata(
  customStagesTSConfig: CustomStageTSConfig[],
  verbose: boolean,
): Promise<CustomStage[]> {
  if (!file.exists(METADATA_LUA_PATH, verbose)) {
    error(
      `${chalk.red(
        "Failed to find the the custom stage metadata file at:",
      )} ${chalk.green(METADATA_LUA_PATH)}`,
    );
  }

  const customStages: CustomStage[] = [];

  for (const customStageTSConfig of customStagesTSConfig) {
    const xmlPath = path.resolve(CWD, customStageTSConfig.xmlPath);
    if (!file.exists(xmlPath, verbose)) {
      error(
        `${chalk.red(
          "Failed to find the custom stage XML file at:",
        )} ${chalk.green(xmlPath)}`,
      );
    }

    const xmlContents = file.read(xmlPath, verbose);
    // eslint-disable-next-line no-await-in-loop
    const jsonRoomsFile = (await xml2js.parseStringPromise(
      xmlContents,
    )) as JSONRoomsFile;

    const customStageRoomsMetadata: CustomStageRoomMetadata[] = [];

    for (const room of jsonRoomsFile.rooms.room) {
      const baseVariant = parseIntSafe(room.$.variant);
      if (Number.isNaN(baseVariant)) {
        error(
          `Failed to parse the variant of one of the custom stage rooms: ${room.$.variant}`,
        );
      }
      const variant =
        baseVariant + customStageTSConfig.roomVariantPrefix * 10000;

      const shape = parseIntSafe(room.$.shape);
      if (Number.isNaN(baseVariant)) {
        error(
          `Failed to parse the shape of one of the custom stage rooms: ${room.$.shape}`,
        );
      }

      const weight = parseIntSafe(room.$.weight);
      if (Number.isNaN(baseVariant)) {
        error(
          `Failed to parse the weight of one of the custom stage rooms: ${room.$.weight}`,
        );
      }

      const customStageRoomMetadata: CustomStageRoomMetadata = {
        variant,
        shape,
        weight,
      };
      customStageRoomsMetadata.push(customStageRoomMetadata);
    }

    const customStage: CustomStage = {
      ...customStageTSConfig,
      roomsMetadata: customStageRoomsMetadata,
    };
    customStages.push(customStage);
  }

  return customStages;
}

function convertCustomStagesToLua(customStages: CustomStage[]): string {
  const customStagesString = JSON.stringify(customStages);
  const fakeTypeScriptFile = `return ${customStagesString}`;
  const result = tstl.transpileString(fakeTypeScriptFile, {
    noHeader: true,
  });
  if (result.file === undefined || result.file.lua === undefined) {
    error(
      "Failed to convert the JSON metadata for the custom stages to a Lua file.",
    );
  }

  return result.file.lua;
}
