import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import { getTypeDocConfig } from "../docs/typedoc.config.base.mjs"; // eslint-disable-line import/no-relative-packages

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const config = getTypeDocConfig(__dirname);

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

// Additionally, manually add feature class files that are in their own separate directories.
config.entryPoints.push(
  "./src/classes/features/other/extraConsoleCommands/commands.ts",
);

/** @type {import('typedoc').TypeDocOptions} */
export default {
  ...config,
  intentionallyNotExported: [
    "_TupleOf",
    "AddCallbackParametersCustom",
    "Arr",
    "BuildTuple",
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
    "Length",
    "ModUpgradedWithFeatures",
    "ReadonlyMapConstructor",
    "ReadonlySetConstructor",
    "Serializable",
    "SerializedIsaacAPIClass",
  ],
};
