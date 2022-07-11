import chalk from "chalk";
import path from "path";
import * as tstl from "typescript-to-lua";
import xml2js from "xml2js";
import { CWD } from "./constants";
import { PackageManager } from "./enums/PackageManager";
import * as file from "./file";
import { CustomStage } from "./interfaces/CustomStage";
import { CustomStageMetadata } from "./interfaces/CustomStageMetadata";
import { CustomStageRoomMetadata } from "./interfaces/CustomStageRoomMetadata";
import { JSONRoomsFile } from "./interfaces/JSONRoomsFile";
import { getPackageManagerAddCommand } from "./packageManager";
import { getCustomStages } from "./tsconfig";
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
  const customStages = getCustomStages(verbose);
  if (customStages.length === 0) {
    return;
  }

  validateMetadataLuaFileExists(packageManager, verbose);
  const stagesMetadata = await getCustomStagesMetadata(customStages, verbose);
  const stagesMetadataString = JSON.stringify(stagesMetadata);
  const result = tstl.transpileString(stagesMetadataString);
  console.log(result);

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
 */
async function getCustomStagesMetadata(
  customStages: CustomStage[],
  verbose: boolean,
): Promise<CustomStageMetadata[]> {
  const stagesMetadata: CustomStageMetadata[] = [];

  for (const customStage of customStages) {
    const xmlPath = path.resolve(CWD, customStage.xmlPath);
    if (!file.exists(xmlPath, verbose)) {
      error(
        `${chalk.red(
          "Failed to find the custom stage XML file at:",
        )} ${chalk.green(xmlPath)}`,
      );
    }

    if (!file.exists(METADATA_LUA_PATH, verbose)) {
      error(
        `${chalk.red(
          "Failed to find the the custom stage metadata file at:",
        )} ${chalk.green(METADATA_LUA_PATH)}`,
      );
    }

    const xmlContents = file.read(xmlPath, verbose);
    // eslint-disable-next-line no-await-in-loop
    const jsonRoomsFile = (await xml2js.parseStringPromise(
      xmlContents,
    )) as JSONRoomsFile;

    const roomsMetadata: CustomStageRoomMetadata[] = [];

    for (const room of jsonRoomsFile.rooms.room) {
      const baseVariant = parseIntSafe(room.$.variant);
      if (Number.isNaN(baseVariant)) {
        error(
          `Failed to parse the variant of one of the custom stage rooms: ${room.$.variant}`,
        );
      }
      const variant = baseVariant + customStage.roomVariantPrefix * 10000;

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

      const roomMetadata: CustomStageRoomMetadata = {
        variant,
        shape,
        weight,
      };
      roomsMetadata.push(roomMetadata);
    }

    const stageMetadata: CustomStageMetadata = {
      name: customStage.name,
      rooms: roomsMetadata,
    };
    stagesMetadata.push(stageMetadata);
  }

  return stagesMetadata;
}
