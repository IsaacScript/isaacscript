const fs = require("node:fs");
const path = require("node:path");
const typeDocBase = require("../docs/typedoc.base"); // eslint-disable-line n/no-unpublished-require

const config = typeDocBase.getTypeDocConfig(__dirname);

// Feature classes are not exported directly, but we want to include them in the documentation.
// Thus, we must manually add them.
const FEATURE_CLASS_DIRECTORY = path.join(
  __dirname,
  "src",
  "classes",
  "features",
  "other",
);
const FEATURE_CLASS_FILE_ENTITY = fs.readdirSync(FEATURE_CLASS_DIRECTORY, {
  withFileTypes: true,
});
for (const fileEntity of FEATURE_CLASS_FILE_ENTITY) {
  if (fileEntity.isFile()) {
    config.entryPoints.push(`./src/classes/features/other/${fileEntity.name}`);
  }
}

// Additionally, manually add feature classes that are in their own separate directories.
config.entryPoints.push(
  "./src/classes/features/other/extraConsoleCommands/commands.ts",
);

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  ...config,
  intentionallyNotExported: [
    "_TupleOf",
    "AddCallbackParametersCustom",
    "Arr",
    "CopyableIsaacAPIClass",
    "CustomStageLuaUnsafe",
    "ISCFeatureTuple",
    "ImmutablePrimitive",
    "ImmutableArray",
    "ImmutableMap",
    "ImmutableSet",
    "ImmutableObject",
    "IsaacAPIClassTypeToSerializedType",
    "IsaacAPIClassTypeToType",
    "ModUpgradedWithFeatures",
    "ReadonlyMapConstructor",
    "ReadonlySetConstructor",
    "Serializable",
    "SerializedIsaacAPIClass",
  ],
};
