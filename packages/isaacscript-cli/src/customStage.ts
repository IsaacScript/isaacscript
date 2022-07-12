import chalk from "chalk";
import path from "path";
import * as tstl from "typescript-to-lua";
import xml2js from "xml2js";
import { CWD, MOD_SOURCE_PATH } from "./constants";
import { PackageManager } from "./enums/PackageManager";
import * as file from "./file";
import {
  CustomStage,
  CustomStageRoomMetadata,
  CustomStageTSConfig,
} from "./interfaces/copied/CustomStage";
import { JSONRoomsFile } from "./interfaces/copied/JSONRoomsFile";
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
const ROOM_VARIANT_MULTIPLIER = 10000;
const VARIANT_REGEX = / variant="(\d+)"/;
const WEIGHT_REGEX = / weight="(.+?)"/;

export async function prepareCustomStages(
  packageManager: PackageManager,
  verbose: boolean,
): Promise<void> {
  const customStagesTSConfig = getCustomStagesFromTSConfig(verbose);
  if (customStagesTSConfig.length === 0) {
    return;
  }

  await fillCustomStageMetadata(customStagesTSConfig, packageManager, verbose);
  combineCustomStageXMLs(customStagesTSConfig, verbose);
}

/**
 * In order for the custom stage feature to work properly, Lua code will need to know the list of
 * possible rooms corresponding to a custom stage. In an end-user mod, this is a Lua file located at
 * `METADATA_LUA_PATH`. By default, the file is blank, and must be filled in by tooling before
 * compiling the mod.
 */
export async function fillCustomStageMetadata(
  customStagesTSConfig: CustomStageTSConfig[],
  packageManager: PackageManager,
  verbose: boolean,
): Promise<void> {
  validateMetadataLuaFileExists(packageManager, verbose);

  const customStages = await getCustomStagesWithMetadata(
    customStagesTSConfig,
    verbose,
  );
  const customStagesLua = convertCustomStagesToLua(customStages);
  file.write(METADATA_LUA_PATH, customStagesLua, verbose);
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
      const roomVariantPrefix =
        customStageTSConfig.roomVariantPrefix * ROOM_VARIANT_MULTIPLIER;
      const variant = roomVariantPrefix + baseVariant;

      const shape = parseIntSafe(room.$.shape);
      if (Number.isNaN(baseVariant)) {
        error(
          `Failed to parse the shape of one of the custom stage rooms: ${room.$.shape}`,
        );
      }

      const weight = parseFloat(room.$.weight);
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

/** We combine all of the custom stages together and add them to "00.special rooms.xml". */
function combineCustomStageXMLs(
  customStagesTSConfig: CustomStageTSConfig[],
  verbose: boolean,
) {
  let allRooms = "";

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

    // It is easier to work with the XML files as text rather than converting it to JSON and then
    // converting it back to XML.
    const lines = xmlContents.trim().split("\n");

    // Remove the first line of "<?xml version="1.0" ?>".
    lines.shift();

    // Remove the second line of "<rooms>".
    lines.shift();

    // Remove the last line of "</rooms>".
    lines.pop();

    // Change the variants
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === undefined) {
        continue;
      }

      if (!line.includes("<room")) {
        continue;
      }

      const match = line.match(VARIANT_REGEX);
      if (match === null) {
        continue;
      }

      const baseVariantString = match[1];
      if (baseVariantString === undefined) {
        continue;
      }
      const baseVariant = parseIntSafe(baseVariantString);
      if (Number.isNaN(baseVariant)) {
        error(
          `Failed to parse the variant of one of the custom stage rooms: ${baseVariantString}`,
        );
      }

      const roomVariantPrefix =
        customStageTSConfig.roomVariantPrefix * ROOM_VARIANT_MULTIPLIER;
      const variant = roomVariantPrefix + baseVariant;

      const newLine = line
        .replace(VARIANT_REGEX, ` variant="${variant}"`)
        .replace(WEIGHT_REGEX, ' weight="0.0"');
      lines[i] = newLine;
    }

    const modifiedRooms = lines.join("\n");
    allRooms += modifiedRooms;
  }

  const combinedXMLFile = `
<?xml version="1.0" ?>
<rooms>
${allRooms}
</rooms>
  `.trim();
  const specialRoomsXMLPath = path.join(
    MOD_SOURCE_PATH,
    "content",
    "rooms",
    "00.special rooms.xml",
  );
  file.write(specialRoomsXMLPath, combinedXMLFile, verbose);

  // TODO: convert XML to STB
  // TODO: no need to write XML to mod directory, only STB
}
