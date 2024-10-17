import chalk from "chalk";
import { parseFloatSafe, parseIntSafe } from "complete-common";
import type { PackageManager } from "complete-node";
import {
  copyFileOrDirectory,
  fatalError,
  getFileNamesInDirectory,
  getPackageManagerAddCommand,
  isDirectory,
  isFile,
  makeDirectory,
  readFile,
  writeFile,
} from "complete-node";
import path from "node:path";
import xml2js from "xml2js";
import { getJSONRoomDoorSlotFlags } from "./common.js";
import {
  CUSTOM_STAGE_FILES_DIR,
  CWD,
  MOD_SOURCE_PATH,
  SHADERS_XML_PATH,
  XML_CONVERTER_PATH,
} from "./constants.js";
import { execExe } from "./exec.js";
import type { ShadersXML } from "./interfaces/ShadersXML.js";
import type {
  CustomStageLua,
  CustomStageRoomMetadata,
  CustomStageTSConfig,
} from "./interfaces/copied/CustomStageTSConfig.js";
import type { JSONRoomsFile } from "./interfaces/copied/JSONRoomsFile.js";
import { getCustomStagesFromTSConfig } from "./tsconfig.js";

const ISAACSCRIPT_COMMON = "isaacscript-common";
const ISAACSCRIPT_COMMON_PATH = path.join(
  CWD,
  "node_modules",
  ISAACSCRIPT_COMMON,
  "dist",
  "src",
);

const METADATA_LUA_PATH = path.join(
  ISAACSCRIPT_COMMON_PATH,
  "customStageMetadata.lua",
);

const ROOM_VARIANT_MULTIPLIER = 10_000;
const VARIANT_REGEX = / variant="(?<variant>\d+)"/;
const WEIGHT_REGEX = / weight=".+?"/;

const EMPTY_SHADER_NAME = "IsaacScript-RenderAboveHUD";

export async function prepareCustomStages(
  packageManager: PackageManager,
  verbose: boolean,
): Promise<void> {
  const customStagesTSConfig = getCustomStagesFromTSConfig();
  if (customStagesTSConfig.length === 0) {
    return;
  }

  validateCustomStagePaths(customStagesTSConfig);

  copyCustomStageFilesToProject();
  await insertEmptyShader();
  await fillCustomStageMetadata(customStagesTSConfig, packageManager);
  combineCustomStageXMLs(customStagesTSConfig, verbose);
}

/**
 * Before we proceed with compiling the mod, ensure that all of the file paths that the end-user put
 * in their "tsconfig.json" file map to actual files on the file system.
 */
function validateCustomStagePaths(
  customStagesTSConfig: readonly CustomStageTSConfig[],
) {
  for (const customStageTSConfig of customStagesTSConfig) {
    if (customStageTSConfig.backdropPNGPaths !== undefined) {
      for (const filePaths of Object.values(
        customStageTSConfig.backdropPNGPaths,
      )) {
        for (const filePath of filePaths) {
          checkFile(filePath);
        }
      }
    }

    for (const filePath of [
      customStageTSConfig.decorationsPNGPath,
      customStageTSConfig.decorationsANM2Path,
      customStageTSConfig.rocksPNGPath,
      customStageTSConfig.rocksANM2Path,
      customStageTSConfig.pitsPNGPath,
      customStageTSConfig.pitsANM2Path,
    ]) {
      checkFile(filePath);
    }

    if (customStageTSConfig.doorPNGPaths !== undefined) {
      for (const filePath of Object.values(customStageTSConfig.doorPNGPaths)) {
        checkFile(filePath);
      }
    }

    if (customStageTSConfig.shadows !== undefined) {
      for (const stageShadows of Object.values(customStageTSConfig.shadows)) {
        for (const stageShadow of stageShadows) {
          checkFile(stageShadow.pngPath);
        }
      }
    }

    if (customStageTSConfig.bossPool !== undefined) {
      for (const bossPoolEntry of Object.values(customStageTSConfig.bossPool)) {
        if (bossPoolEntry.versusScreen !== undefined) {
          checkFile(bossPoolEntry.versusScreen.namePNGPath);
          checkFile(bossPoolEntry.versusScreen.portraitPNGPath);
        }
      }
    }
  }
}

function checkFile(filePath: string | undefined) {
  if (filePath === undefined) {
    return;
  }

  if (!filePath.includes("gfx/")) {
    fatalError(
      `Failed to validate the "${filePath}" file: all PNG file paths must be inside of a "gfx" directory. (e.g. "./mod/resources/gfx/backdrop/foo/nfloor.png")`,
    );
  }

  if (!isFile(filePath)) {
    fatalError(
      `Failed to find the "${filePath}" file. Check your "tsconfig.json" file and then restart IsaacScript.`,
    );
  }
}

/** The custom stages feature needs some anm2 files in order to work properly. */
function copyCustomStageFilesToProject() {
  const dstDirPath = path.join(
    CWD,
    "mod",
    "resources",
    "gfx",
    "isaacscript-custom-stage",
  );
  makeDirectory(dstDirPath);

  const fileNames = getFileNamesInDirectory(CUSTOM_STAGE_FILES_DIR);
  for (const fileName of fileNames) {
    const srcPath = path.join(CUSTOM_STAGE_FILES_DIR, fileName);
    const dstPath = path.join(dstDirPath, fileName);
    copyFileOrDirectory(srcPath, dstPath);
  }
}

/**
 * The custom stage feature requires an empty shader to be present in order to render sprites on top
 * of the HUD.
 */
async function insertEmptyShader() {
  const shadersXMLDstPath = path.join(CWD, "mod", "content", "shaders.xml");

  if (!isFile(shadersXMLDstPath)) {
    copyFileOrDirectory(SHADERS_XML_PATH, shadersXMLDstPath);
    return;
  }

  // The end-user mod might have their own custom shaders, so we need to merge our empty shader
  // inside the existing "shaders.xml" file.
  const shadersXMLDstContents = readFile(shadersXMLDstPath);
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

  const shadersXMLSrcContents = readFile(SHADERS_XML_PATH);
  const shadersXMLSrc = (await xml2js.parseStringPromise(
    shadersXMLSrcContents,
  )) as ShadersXML;
  const isaacScriptEmptyShader = shadersXMLSrc.shaders.shader.find(
    (shader) => shader.$.name === EMPTY_SHADER_NAME,
  );
  if (isaacScriptEmptyShader === undefined) {
    fatalError(
      `Failed to find the empty shader named "${EMPTY_SHADER_NAME}" in the following file: ${SHADERS_XML_PATH}`,
    );
  }

  // Add the empty shader to the mod's existing "shaders.xml" file.
  shadersXMLDst.shaders.shader.push(isaacScriptEmptyShader);
  const xmlBuilder = new xml2js.Builder();
  const newXML = xmlBuilder.buildObject(shadersXMLDst);
  writeFile(shadersXMLDstPath, newXML);
}

/**
 * In order for the custom stage feature to work properly, Lua code will need to know the list of
 * possible rooms corresponding to a custom stage. In an end-user mod, this is a Lua file located at
 * `METADATA_LUA_PATH`. By default, the file is blank, and must be filled in by tooling before
 * compiling the mod.
 */
async function fillCustomStageMetadata(
  customStagesTSConfig: readonly CustomStageTSConfig[],
  packageManager: PackageManager,
): Promise<void> {
  validateMetadataLuaFileExists(packageManager);

  const customStages = await getCustomStagesWithMetadata(customStagesTSConfig);
  const customStagesLua = await convertCustomStagesToLua(customStages);
  writeFile(METADATA_LUA_PATH, customStagesLua);
  console.log(`Wrote custom stage metadata to: ${METADATA_LUA_PATH}`);
}

function validateMetadataLuaFileExists(packageManager: PackageManager) {
  if (!isDirectory(ISAACSCRIPT_COMMON_PATH)) {
    const addCommand = getPackageManagerAddCommand(
      packageManager,
      ISAACSCRIPT_COMMON,
    );
    fatalError(
      `The custom stages feature requires a dependency of "${ISAACSCRIPT_COMMON}" in the "package.json" file. You can add it with the following command:\n${chalk.green(
        addCommand,
      )}`,
    );
  }

  if (!isFile(METADATA_LUA_PATH)) {
    fatalError(
      `${chalk.red(
        "Failed to find the custom stage metadata file at:",
      )} ${chalk.red(METADATA_LUA_PATH)}`,
    );
  }
}

/**
 * This parses all of the end-user's XML files and gathers metadata about all of the rooms within.
 * (In other words, this creates the full set of `CustomStageLua` objects.)
 */
async function getCustomStagesWithMetadata(
  customStagesTSConfig: readonly CustomStageTSConfig[],
): Promise<readonly CustomStageLua[]> {
  if (!isFile(METADATA_LUA_PATH)) {
    fatalError(
      `${chalk.red(
        "Failed to find the custom stage metadata file at:",
      )} ${chalk.red(METADATA_LUA_PATH)}`,
    );
  }

  const customStagesLua: CustomStageLua[] = [];

  for (const customStageTSConfig of customStagesTSConfig) {
    // Some manual input validation was already performed in the `getCustomStagesFromTSConfig`
    // function.
    const { name } = customStageTSConfig;
    const { xmlPath } = customStageTSConfig;

    const resolvedXMLPath = path.resolve(CWD, xmlPath);
    if (!isFile(resolvedXMLPath)) {
      fatalError(
        `${chalk.red(
          "Failed to find the custom stage XML file at:",
        )} ${chalk.red(resolvedXMLPath)}`,
      );
    }

    const xmlContents = readFile(resolvedXMLPath);
    // eslint-disable-next-line no-await-in-loop, @typescript-eslint/no-unsafe-assignment
    const jsonRoomsFileAny = await xml2js.parseStringPromise(xmlContents);
    const jsonRoomsFile = jsonRoomsFileAny as JSONRoomsFile;

    const roomVariantSet = new Set<number>();
    const customStageRoomsMetadata: CustomStageRoomMetadata[] = [];

    for (const room of jsonRoomsFile.rooms.room) {
      const typeString = room.$.type;
      const type = parseIntSafe(typeString);
      if (type === undefined) {
        fatalError(
          `Failed to parse the type of one of the "${name}" custom stage rooms: ${typeString}`,
        );
      }

      const variantString = room.$.variant;
      const baseVariant = parseIntSafe(variantString);
      if (baseVariant === undefined) {
        fatalError(
          `Failed to parse the variant of one of the "${name}" custom stage rooms: ${variantString}`,
        );
      }

      if (roomVariantSet.has(baseVariant)) {
        fatalError(
          chalk.red(
            `There is more than one room with a variant of "${baseVariant}" in the "${resolvedXMLPath}" file. Make sure that each room has a unique variant. (The room variant is also called the "ID" in Basement Renovator.)`,
          ),
        );
      }
      roomVariantSet.add(baseVariant);

      const roomVariantPrefix =
        customStageTSConfig.roomVariantPrefix * ROOM_VARIANT_MULTIPLIER;
      const variant = roomVariantPrefix + baseVariant;

      const subTypeString = room.$.subtype;
      const subType = parseIntSafe(subTypeString);
      if (subType === undefined) {
        fatalError(
          `Failed to parse the sub-type of one of the "${name}" custom stage rooms: ${subTypeString}`,
        );
      }

      const shapeString = room.$.shape;
      const shape = parseIntSafe(shapeString);
      if (shape === undefined) {
        fatalError(
          `Failed to parse the shape of one of the "${name}" custom stage rooms: ${shapeString}`,
        );
      }

      const doorSlotFlags = getJSONRoomDoorSlotFlags(room);

      const weightString = room.$.weight;
      const weight = parseFloatSafe(weightString);
      if (weight === undefined) {
        fatalError(
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

async function convertCustomStagesToLua(
  customStages: readonly CustomStageLua[],
): Promise<string> {
  // We perform a dynamic import to prevent non-TSTL projects from having to have TSTL as a
  // dependency if they use the IsaacScript CLI. ("typescript-to-lua" is listed as an optional peer
  // dependency in this project's "package.json".)
  const tstl = await import("typescript-to-lua");

  const customStagesString = JSON.stringify(customStages);
  const fakeTypeScriptFile = `return ${customStagesString}`;
  const result = tstl.transpileString(fakeTypeScriptFile, {
    noHeader: true,
  });
  if (result.file === undefined || result.file.lua === undefined) {
    fatalError(
      "Failed to convert the JSON metadata for the custom stages to a Lua file.",
    );
  }

  return result.file.lua;
}

/** We combine all of the custom stages together and add them to "00.special rooms.xml". */
function combineCustomStageXMLs(
  customStagesTSConfig: readonly CustomStageTSConfig[],
  verbose: boolean,
) {
  let allRooms = "";

  for (const customStageTSConfig of customStagesTSConfig) {
    const xmlPath = path.resolve(CWD, customStageTSConfig.xmlPath);
    if (!isFile(xmlPath)) {
      fatalError(
        `${chalk.red(
          "Failed to find the custom stage XML file at:",
        )} ${chalk.red(xmlPath)}`,
      );
    }

    const xmlContents = readFile(xmlPath);

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
      if (match === null || match.groups === undefined) {
        continue;
      }

      const baseVariantString = match.groups["variant"];
      if (baseVariantString === undefined) {
        continue;
      }
      const baseVariant = parseIntSafe(baseVariantString);
      if (baseVariant === undefined) {
        fatalError(
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
  if (!isFile(contentRoomsDir)) {
    makeDirectory(contentRoomsDir);
  }

  const specialRoomsXMLPath = path.join(
    contentRoomsDir,
    "00.special rooms.xml",
  );
  writeFile(specialRoomsXMLPath, combinedXMLFile);

  // Convert the XML file to an STB file, which is the format actually read by the game.
  execExe(XML_CONVERTER_PATH, [specialRoomsXMLPath], verbose, contentRoomsDir);
}
