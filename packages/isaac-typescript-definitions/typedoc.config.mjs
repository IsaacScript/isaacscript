import { getTypeDocConfig } from "../docs/typedoc.config.base.mjs"; // eslint-disable-line import/no-relative-packages

const config = getTypeDocConfig(import.meta.dirname);

export default {
  ...config,
  intentionallyNotExported: [
    // From: "./src/enums/flags"
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

    // Other
    "BitFlags",
    "__global.BitSet128",
    "int",
  ],
};
