import chalk from "chalk";
import path from "path";
import * as tstl from "typescript-to-lua";
import xml2js from "xml2js";
import { getJSONRoomDoorSlotFlags } from "./common";
import {
  CUSTOM_STAGE_FILES_DIR,
  CWD,
  MOD_SOURCE_PATH,
  SHADERS_XML_PATH,
  XML_CONVERTER_PATH,
} from "./constants";
import { PackageManager } from "./enums/PackageManager";
import { execExe } from "./exec";
import * as file from "./file";
import {
  CustomStageLua,
  CustomStageRoomMetadata,
  CustomStageTSConfig,
} from "./interfaces/copied/CustomStageLua";
import { JSONRoomsFile } from "./interfaces/copied/JSONRoomsFile";
import { ShadersXML } from "./interfaces/ShadersXML";
import { getPackageManagerAddCommand } from "./packageManager";
import { getCustomStagesFromTSConfig } from "./tsconfig";
import { error, parseIntSafe } from "./utils";

const ISAACSCRIPT_COMMON = "isaacscript-common";
const ISAACSCRIPT_COMMON_PATH = path.join(
  CWD,
  "node_modules",
  ISAACSCRIPT_COMMON,
  "dist",
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

const EMPTY_SHADER_NAME = "IsaacScript-RenderAboveHUD";

export async function prepareCustomStages(
  packageManager: PackageManager,
  verbose: boolean,
): Promise<void> {
  const customStagesTSConfig = getCustomStagesFromTSConfig(verbose);
  if (customStagesTSConfig.length === 0) {
    return;
  }

  copyCustomStageFilesToProject(verbose);
  await insertEmptyShader(verbose);
  await fillCustomStageMetadata(customStagesTSConfig, packageManager, verbose);
  combineCustomStageXMLs(customStagesTSConfig, verbose);
}

/** The custom stages feature needs some anm2 files in order to work properly. */
function copyCustomStageFilesToProject(verbose: boolean) {
  const dstDirPath = path.join(
    CWD,
    "mod",
    "resources",
    "gfx",
    "isaacscript-custom-stage",
  );
  file.makeDir(dstDirPath, verbose);

  for (const fileName of file.getDirList(CUSTOM_STAGE_FILES_DIR, verbose)) {
    const srcPath = path.join(CUSTOM_STAGE_FILES_DIR, fileName);
    const dstPath = path.join(dstDirPath, fileName);
    file.copy(srcPath, dstPath, verbose);
  }
}

/**
 * The custom stage feature requires an empty shader to be present in order to render sprites on top
 * of the HUD.
 */
async function insertEmptyShader(verbose: boolean) {
  const shadersXMLDstPath = path.join(CWD, "mod", "content", "shaders.xml");

  if (!file.exists(shadersXMLDstPath, verbose)) {
    file.copy(SHADERS_XML_PATH, shadersXMLDstPath, verbose);
    return;
  }

  // The end-user mod might have their own custom shaders, so we need to merge our empty shader
  // inside the existing "shaders.xml" file.
  const shadersXMLDstContents = file.read(shadersXMLDstPath, verbose);
  const shadersXMLDst = (await xml2js.parseStringPromise(
    shadersXMLDstContents,
  )) as ShadersXML;

  const hasIsaacScriptEmptyShader = shadersXMLDst.shaders.shader.some(
    (shader) => shader.$.name === EMPTY_SHADER_NAME,
  );
  if (hasIsaacScriptEmptyShader) {
    // Our empty shader already exists, so we don't have to do anything.
    return;
  }

  const shadersXMLSrcContents = file.read(SHADERS_XML_PATH, verbose);
  const shadersXMLSrc = (await xml2js.parseStringPromise(
    shadersXMLSrcContents,
  )) as ShadersXML;
  const isaacScriptEmptyShader = shadersXMLSrc.shaders.shader.find(
    (shader) => shader.$.name === EMPTY_SHADER_NAME,
  );
  if (isaacScriptEmptyShader === undefined) {
    error(
      `Failed to find the empty shader named "${EMPTY_SHADER_NAME}" in the following file: ${SHADERS_XML_PATH}`,
    );
  }

  // Add the empty shader to the mod's existing "shaders.xml" file.
  shadersXMLDst.shaders.shader.push(isaacScriptEmptyShader);
  const xmlBuilder = new xml2js.Builder();
  const newXML = xmlBuilder.buildObject(shadersXMLDst);
  file.write(shadersXMLDstPath, newXML, verbose);
}

/**
 * In order for the custom stage feature to work properly, Lua code will need to know the list of
 * possible rooms corresponding to a custom stage. In an end-user mod, this is a Lua file located at
 * `METADATA_LUA_PATH`. By default, the file is blank, and must be filled in by tooling before
 * compiling the mod.
 */
async function fillCustomStageMetadata(
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
 * (In other words, this creates the full set of `CustomStageLua` objects.)
 */
async function getCustomStagesWithMetadata(
  customStagesTSConfig: CustomStageTSConfig[],
  verbose: boolean,
): Promise<CustomStageLua[]> {
  if (!file.exists(METADATA_LUA_PATH, verbose)) {
    error(
      `${chalk.red(
        "Failed to find the the custom stage metadata file at:",
      )} ${chalk.green(METADATA_LUA_PATH)}`,
    );
  }

  const customStagesLua: CustomStageLua[] = [];

  for (const customStageTSConfig of customStagesTSConfig) {
    // Some manual input validation was already performed in the `getCustomStagesFromTSConfig`
    // function.
    const { name } = customStageTSConfig;
    const { xmlPath } = customStageTSConfig;

    const resolvedXMLPath = path.resolve(CWD, xmlPath);
    if (!file.exists(resolvedXMLPath, verbose)) {
      error(
        `${chalk.red(
          "Failed to find the custom stage XML file at:",
        )} ${chalk.green(resolvedXMLPath)}`,
      );
    }

    const xmlContents = file.read(resolvedXMLPath, verbose);
    // eslint-disable-next-line no-await-in-loop
    const jsonRoomsFile = (await xml2js.parseStringPromise(
      xmlContents,
    )) as JSONRoomsFile;

    const roomVariantSet = new Set<number>();
    const customStageRoomsMetadata: CustomStageRoomMetadata[] = [];

    for (const room of jsonRoomsFile.rooms.room) {
      const typeString = room.$.type;
      const type = parseIntSafe(typeString);
      if (Number.isNaN(type)) {
        error(
          `Failed to parse the type of one of the "${name}" custom stage rooms: ${typeString}`,
        );
      }

      const variantString = room.$.variant;
      const baseVariant = parseIntSafe(variantString);
      if (Number.isNaN(baseVariant)) {
        error(
          `Failed to parse the variant of one of the "${name}" custom stage rooms: ${variantString}`,
        );
      }

      if (roomVariantSet.has(baseVariant)) {
        error(
          chalk.red(
            `There is more than one room with a variant of "${baseVariant}" in the "${name}" custom stage. Make sure that each room has a unique variant. (The room variant is also called the "ID" in Basement Renovator.)`,
          ),
        );
      }
      roomVariantSet.add(baseVariant);

      const roomVariantPrefix =
        customStageTSConfig.roomVariantPrefix * ROOM_VARIANT_MULTIPLIER;
      const variant = roomVariantPrefix + baseVariant;

      const subTypeString = room.$.subtype;
      const subType = parseIntSafe(subTypeString);
      if (Number.isNaN(subType)) {
        error(
          `Failed to parse the sub-type of one of the "${name}" custom stage rooms: ${subTypeString}`,
        );
      }

      const shapeString = room.$.shape;
      const shape = parseIntSafe(shapeString);
      if (Number.isNaN(baseVariant)) {
        error(
          `Failed to parse the shape of one of the "${name}" custom stage rooms: ${shapeString}`,
        );
      }

      const doorSlotFlags = getJSONRoomDoorSlotFlags(room);

      const weightString = room.$.weight;
      const weight = parseFloat(weightString);
      if (Number.isNaN(baseVariant)) {
        error(
          `Failed to parse the weight of one of the "${name}" custom stage rooms: ${weightString}`,
        );
      }

      const customStageRoomMetadata: CustomStageRoomMetadata = {
        type,
        variant,
        subType,
        shape,
        doorSlotFlags,
        weight,
      };
      customStageRoomsMetadata.push(customStageRoomMetadata);
    }

    const customStageLua: CustomStageLua = {
      ...customStageTSConfig,
      roomsMetadata: customStageRoomsMetadata,
    };
    customStagesLua.push(customStageLua);
  }

  return customStagesLua;
}

function convertCustomStagesToLua(customStages: CustomStageLua[]): string {
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
  const contentRoomsDir = path.join(MOD_SOURCE_PATH, "content", "rooms");
  const specialRoomsXMLPath = path.join(
    contentRoomsDir,
    "00.special rooms.xml",
  );
  file.write(specialRoomsXMLPath, combinedXMLFile, verbose);

  // Convert the XML file to an STB file, which is the format actually read by the game.
  execExe(XML_CONVERTER_PATH, [specialRoomsXMLPath], verbose, contentRoomsDir);
}
