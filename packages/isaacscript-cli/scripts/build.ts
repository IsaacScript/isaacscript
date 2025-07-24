import {
  $,
  buildScript,
  getFileNamesInDirectory,
  mkdir,
  mv,
  readFile,
  writeFile,
} from "complete-node";
import path from "node:path";

const INTERFACE_FILE_NAMES = ["CustomStageTSConfig", "JSONRoomsFile"] as const;
const ENUM_FILE_NAMES = ["DoorSlot", "RoomShape"] as const;
const ENUM_FLAG_FILE_NAMES = ["DoorSlotFlag"] as const;
const OBJECT_FILE_NAMES = [
  "doorSlotToDoorSlotFlag",
  "roomShapeToDoorSlotCoordinates",
] as const;

await buildScript(async (packageRoot) => {
  copyIsaacScriptCommonFiles(packageRoot);

  await Promise.all([
    compile(),
    compilePlugins(packageRoot),
    generateJSONSchemaForTSConfigJSON(),
    generateJSONSchemaForIsaacScriptJSON(),
  ]);
});

/**
 * First, copy some files from "isaacscript-common". Normally, we would import them directly, but we
 * cannot import from "isaacscript-common" in this package until TSTL supports ".ts" file
 * extensions:
 * https://github.com/TypeScriptToLua/TypeScriptToLua/issues/1514
 *
 * Additionally, we do not want to create a "isaacscript-common-types" package because then it
 * becomes harder to get the types documented on the Docusaurus website.
 */
function copyIsaacScriptCommonFiles(packageRoot: string) {
  copyITDEnums(packageRoot);
  copyITDEnumsFlag(packageRoot);
  copyISCInterfaces(packageRoot);
  copyISCObjects(packageRoot);
}

function copyITDEnums(packageRoot: string) {
  const sourcePackage = "isaac-typescript-definitions";
  const sourceDirectoryPath = path.resolve(
    packageRoot,
    "..",
    sourcePackage,
    "src",
    "enums",
  );
  const destinationDirectoryPath = path.join(
    packageRoot,
    "src",
    "enums",
    "copied",
  );
  mkdir(destinationDirectoryPath);

  for (const fileName of ENUM_FILE_NAMES) {
    const fullFileName = `${fileName}.ts`;
    const sourcePath = path.join(sourceDirectoryPath, fullFileName);
    let fileContents = readFile(sourcePath);

    switch (fileName) {
      case "RoomShape": {
        fileContents = fileContents.replaceAll(
          " // eslint-disable-line @typescript-eslint/naming-convention,isaacscript/enum-member-number-separation",
          "",
        );
        break;
      }

      case "DoorSlot": {
        break;
      }
    }

    const copiedFileHeader = getCopiedFileHeader(sourcePackage);
    fileContents = copiedFileHeader + fileContents;

    const destinationPath = path.join(destinationDirectoryPath, fullFileName);
    writeFile(destinationPath, fileContents);
  }
}

function copyITDEnumsFlag(packageRoot: string) {
  const sourcePackage = "isaac-typescript-definitions";
  const sourceDirectoryPath = path.resolve(
    packageRoot,
    "..",
    sourcePackage,
    "src",
    "enums",
    "flags",
  );
  const destinationDirectoryPath = path.join(
    packageRoot,
    "src",
    "enums",
    "copied",
  );
  mkdir(destinationDirectoryPath);

  for (const fileName of ENUM_FLAG_FILE_NAMES) {
    const fullFileName = `${fileName}.ts`;
    const sourcePath = path.join(sourceDirectoryPath, fullFileName);
    let fileContents = readFile(sourcePath);

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (fileName === "DoorSlotFlag") {
      fileContents = `/* eslint-disable no-bitwise */\n\n${fileContents}`;
      fileContents = fileContents.replace(
        'import { DoorSlot } from "../DoorSlot";',
        'import { DoorSlot } from "./DoorSlot.js";',
      );
      fileContents +=
        "\ndeclare type BitFlag = number & { readonly __bitFlagBrand: symbol };\n\ndeclare type BitFlags<T extends BitFlag> = T & {\n  readonly __bitFlagsBrand: T;\n};\n";
    }

    const copiedFileHeader = getCopiedFileHeader(sourcePackage);
    fileContents = copiedFileHeader + fileContents;

    const destinationPath = path.join(destinationDirectoryPath, fullFileName);
    writeFile(destinationPath, fileContents);
  }
}

function copyISCInterfaces(packageRoot: string) {
  const sourcePackage = "isaacscript-common";
  const sourceDirectoryPath = path.resolve(
    packageRoot,
    "..",
    sourcePackage,
    "src",
    "interfaces",
  );
  const destinationDirectoryPath = path.join(
    packageRoot,
    "src",
    "interfaces",
    "copied",
  );
  mkdir(destinationDirectoryPath);

  for (const fileName of INTERFACE_FILE_NAMES) {
    const fullFileName = `${fileName}.ts`;
    const sourcePath = path.join(sourceDirectoryPath, fullFileName);
    let fileContents = readFile(sourcePath);

    switch (fileName) {
      case "CustomStageTSConfig": {
        fileContents = fileContents.replace(
          'import type { Immutable } from "../types/Immutable";',
          'import type { Immutable } from "complete-common";',
        );
        break;
      }

      case "JSONRoomsFile": {
        break;
      }
    }

    const copiedFileHeader = getCopiedFileHeader(sourcePackage);
    fileContents = copiedFileHeader + fileContents;

    const destinationPath = path.join(destinationDirectoryPath, fullFileName);
    writeFile(destinationPath, fileContents);
  }
}

function copyISCObjects(packageRoot: string) {
  const sourcePackage = "isaacscript-common";
  const sourceDirectoryPath = path.resolve(
    packageRoot,
    "..",
    sourcePackage,
    "src",
    "objects",
  );
  const destinationDirectoryPath = path.join(
    packageRoot,
    "src",
    "objects",
    "copied",
  );
  mkdir(destinationDirectoryPath);

  for (const fileName of OBJECT_FILE_NAMES) {
    const fullFileName = `${fileName}.ts`;
    const sourcePath = path.join(sourceDirectoryPath, fullFileName);
    let fileContents = readFile(sourcePath);

    switch (fileName) {
      case "doorSlotToDoorSlotFlag": {
        fileContents = fileContents.replace(
          'import {\n  DoorSlot,\n  DoorSlotFlag,\n  DoorSlotFlagZero,\n} from "isaac-typescript-definitions";',
          'import { DoorSlot } from "../../enums/copied/DoorSlot.js";\nimport {\n  DoorSlotFlag,\n  DoorSlotFlagZero,\n} from "../../enums/copied/DoorSlotFlag.js";',
        );
        break;
      }

      case "roomShapeToDoorSlotCoordinates": {
        fileContents = fileContents.replace(
          'import { DoorSlot, RoomShape } from "isaac-typescript-definitions";',
          'import { DoorSlot } from "../../enums/copied/DoorSlot.js";\nimport { RoomShape } from "../../enums/copied/RoomShape.js";',
        );
        fileContents = fileContents.replaceAll("int", "number");
        break;
      }
    }

    const copiedFileHeader = getCopiedFileHeader(sourcePackage);
    fileContents = copiedFileHeader + fileContents;

    const destinationPath = path.join(destinationDirectoryPath, fullFileName);
    writeFile(destinationPath, fileContents);
  }
}

function getCopiedFileHeader(packageName: string): string {
  return `
/// THIS FILE IS AUTOMATICALLY GENERATED BY THE "build.ts" SCRIPT.
/// IT IS COPIED FROM THE "${packageName}" package.
/// DO NOT EDIT THIS FILE!

`.trimStart();
}

async function compile() {
  await $`tsc`;
}

async function compilePlugins(packageRoot: string) {
  const pluginsDirPath = path.join(packageRoot, "plugins");
  const $$ = $({ cwd: pluginsDirPath });
  await $$`tsc`;
  renamePluginJSToCJS(pluginsDirPath);
}

function renamePluginJSToCJS(pluginsDirPath: string) {
  const fileNames = getFileNamesInDirectory(pluginsDirPath);
  for (const fileName of fileNames) {
    if (fileName.endsWith(".js")) {
      const oldFilePath = path.join(pluginsDirPath, fileName);
      const newFileName = fileName.replace(".js", ".cjs");
      const newFilePath = path.join(pluginsDirPath, newFileName);
      mv(oldFilePath, newFilePath);
    }
  }
}

/** Generate the JSON schema for the special "isaacscript" section in "tsconfig.json". */
async function generateJSONSchemaForTSConfigJSON() {
  const TSCONFIG_SCHEMA_PATH =
    "schemas/tsconfig-isaacscript-section-schema.json";
  await $`ts-json-schema-generator --path src/interfaces/IsaacScriptTSConfig.ts --tsconfig tsconfig.json --out ${TSCONFIG_SCHEMA_PATH}`;
  await $`prettier ${TSCONFIG_SCHEMA_PATH} --write --log-level=warn`;
}

/** Generate the JSON schema for the "isaacscript.json" file. */
async function generateJSONSchemaForIsaacScriptJSON() {
  const ISAACSCRIPT_SCHEMA_PATH = "schemas/isaacscript-schema.json";
  await $`ts-json-schema-generator --path src/classes/Config.ts --tsconfig tsconfig.json --out ${ISAACSCRIPT_SCHEMA_PATH}`;
  await $`prettier ${ISAACSCRIPT_SCHEMA_PATH} --write --log-level=warn`;
}
