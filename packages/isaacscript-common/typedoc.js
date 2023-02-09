const typeDocBase = require("../docs/typedoc.base"); // eslint-disable-line n/no-unpublished-require

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  ...typeDocBase.getConfig(__dirname),
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
