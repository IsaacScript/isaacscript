import path from "node:path";
import url from "node:url";
import { getTypeDocConfig } from "../docs/typedoc.config.base.mjs"; // eslint-disable-line import/no-relative-packages

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const config = getTypeDocConfig(__dirname);

/** @type {import('typedoc').TypeDocOptions} */
export default {
  ...config,
  intentionallyNotExported: [
    // From: "./src/enum/flags"
    "ActionTriggerType",
    "ActionTriggerValue",
    "CacheFlagType",
    "CacheFlagValue",
    "DamageFlagType",
    "DamageFlagValue",
    "DisplayFlagType",
    "DisplayFlagValue",
    "DoorSlotFlagType",
    "DoorSlotFlagValue",
    "EntityFlagType",
    "EntityFlagValue",
    "EntityPartitionType",
    "EntityPartitionValue",
    "ItemConfigTagType",
    "ItemConfigTagValue",
    "LevelCurseType",
    "LevelCurseValue",
    "ProjectileFlagType",
    "ProjectileFlagValue",
    "RoomDescriptorFlagType",
    "RoomDescriptorFlagValue",
    "TargetFlagType",
    "TargetFlagValue",
    "TearFlagType",
    "TearFlagValue",
    "UseFlagType",
    "UseFlagValue",

    // From: "./src/enum/repentogon"
    "EntityTagType",
    "EntityTagValue",
    "GibFlagType",
    "GibFlagValue",

    // Other
    "BitFlags",
    "__global.BitSet128",
    "int",
  ],
};
