const typeDocBase = require("../docs/typedoc.base"); // eslint-disable-line n/no-unpublished-require

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  ...typeDocBase.getConfig(__dirname),
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

    // Other
    "BitFlags",
    "__global.BitSet128",
  ],
};
