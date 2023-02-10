const fs = require("node:fs");
const path = require("node:path");
const typeDocBase = require("../docs/typedoc.base"); // eslint-disable-line n/no-unpublished-require

const config = typeDocBase.getConfig(__dirname);

// Feature classes are not exported directly, but we want to include them in the documentation.
// Thus, we must manually add them.
const FEATURE_CLASS_DIRECTORY = path.join(
  __dirname,
  "src",
  "classes",
  "features",
  "other",
);
const FEATURE_CLASS_FILE_NAMES = fs.readdirSync(FEATURE_CLASS_DIRECTORY);
for (const fileName of FEATURE_CLASS_FILE_NAMES) {
  config.entryPoints.push(`./src/classes/features/other/${fileName}`);
}
config.entryPoints.push(
  "./src/classes/features/other/extraConsoleCommands/commands.ts",
);

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  ...config,
  intentionallyNotExported: [
    "AddCallbackParametersCustom",
    "CopyableIsaacAPIClass",
    "CustomStageLuaUnsafe",
    "ImmutablePrimitive",
    "ImmutableArray",
    "ImmutableMap",
    "ImmutableSet",
    "ImmutableObject",
    "IsaacAPIClassTypeToSerializedType",
    "IsaacAPIClassTypeToType",
    "ISCFeaturesToKeys",
    "ISCFeatureTuple",
    "ReadonlyMapConstructor",
    "ReadonlySetConstructor",
    "Serializable",
    "SerializedIsaacAPIClass",
  ],
};
