import fs from "node:fs";
import path from "node:path";
import { getTypeDocConfig } from "../docs/typedoc.config.base.mjs"; // eslint-disable-line import-x/no-relative-packages

const config = getTypeDocConfig(import.meta.dirname);

// Feature classes are not exported directly, but we want to include them in the documentation.
// Thus, we must manually add them.
const FEATURE_CLASS_DIRECTORY = path.join(
  import.meta.dirname,
  "src",
  "classes",
  "features",
  "other",
);
const FEATURE_CLASS_FILE_ENTITY = fs.readdirSync(FEATURE_CLASS_DIRECTORY, {
  withFileTypes: true,
});
const featureEntryPoints = [
  ...FEATURE_CLASS_FILE_ENTITY.filter((fileEntity) => fileEntity.isFile()).map(
    (fileEntity) => path.join(FEATURE_CLASS_DIRECTORY, fileEntity.name),
  ),
  path.join(FEATURE_CLASS_DIRECTORY, "extraConsoleCommands", "commands.ts"),
];

/** @type {import("typedoc").TypeDocOptions} */
export default {
  ...config,
  entryPoints: [...config.entryPoints, ...featureEntryPoints],
  mergeReadme: false,
  readme: path.join(import.meta.dirname, "website-root.md"),
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
    "STORY_BOSS_IDS",
  ],
};
