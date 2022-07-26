import { CopyableIsaacAPIClassType } from "../enums/private/CopyableIsaacAPIClassType";
import { ISAAC_API_CLASS_TYPE_TO_BRAND } from "../objects/isaacAPIClassTypeToBrand";
import { ISAAC_API_CLASS_TYPE_TO_FUNCTIONS } from "../objects/isaacAPIClassTypeToFunctions";
import { SerializedIsaacAPIClass } from "../types/private/SerializedIsaacAPIClass";
import { getIsaacAPIClassName } from "./isaacAPIClass";
import { isTable, isUserdata } from "./types";

/**
 * Helper function to generically copy an Isaac API class without knowing what specific type of
 * class it is. (This is used by the save data manager.)
 *
 * For the list of supported classes, see the `CopyableIsaacAPIClassType` enum.
 */
export function copyIsaacAPIClass(isaacAPIClass: unknown): unknown {
  if (!isUserdata(isaacAPIClass)) {
    error(
      `Failed to copy an Isaac API class since the provided object was of type: ${typeof isaacAPIClass}`,
    );
  }

  const isaacAPIClassType = getIsaacAPIClassName(isaacAPIClass);
  if (isaacAPIClassType === undefined) {
    error(
      "Failed to copy an Isaac API class since it does not have a class type.",
    );
  }

  const copyableIsaacAPIClassType =
    isaacAPIClassType as CopyableIsaacAPIClassType;
  const functions =
    ISAAC_API_CLASS_TYPE_TO_FUNCTIONS[copyableIsaacAPIClassType];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (functions === undefined) {
    error(
      `Failed to copy an Isaac API class since the associated functions were not found for Isaac API class type: ${copyableIsaacAPIClassType}`,
    );
  }

  return functions.copy(isaacAPIClass);
}

/**
 * Helper function to generically deserialize an Isaac API class without knowing what specific type
 * of class it is. (This is used by the save data manager when reading data from the "save#.dat"
 * file.)
 *
 * For the list of supported classes, see the `CopyableIsaacAPIClassType` enum.
 */
export function deserializeIsaacAPIClass(
  serializedIsaacAPIClass: unknown,
): unknown {
  if (!isTable(serializedIsaacAPIClass)) {
    error(
      `Failed to deserialize an Isaac API class since the provided object was of type: ${typeof serializedIsaacAPIClass}`,
    );
  }

  const copyableIsaacAPIClassType = getSerializedTableType(
    serializedIsaacAPIClass,
  );
  if (copyableIsaacAPIClassType === undefined) {
    error(
      "Failed to deserialize an Isaac API class since a valid class type brand was not found.",
    );
  }

  const functions =
    ISAAC_API_CLASS_TYPE_TO_FUNCTIONS[copyableIsaacAPIClassType];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (functions === undefined) {
    error(
      `Failed to deserialize an Isaac API class since the associated functions were not found for class type: ${copyableIsaacAPIClassType}`,
    );
  }

  return functions.deserialize(serializedIsaacAPIClass);
}

/**
 * In order to find out what type of serialized Isaac API class this is, we search through the
 * serialized table for brands.
 */
function getSerializedTableType(
  serializedIsaacAPIClass: LuaMap<AnyNotNil, unknown>,
): CopyableIsaacAPIClassType | undefined {
  for (const [copyableIsaacAPIClassType, serializationBrand] of Object.entries(
    ISAAC_API_CLASS_TYPE_TO_BRAND,
  )) {
    if (serializedIsaacAPIClass.has(serializationBrand)) {
      return copyableIsaacAPIClassType as CopyableIsaacAPIClassType;
    }
  }

  return undefined;
}

/**
 * Helper function to generically check if a given Lua table is a serialized Isaac API class. (This
 * is used by the save data manager when reading data from the "save#.dat" file.)
 *
 * For the list of supported classes, see the `CopyableIsaacAPIClassType` enum.
 */
export function isSerializedIsaacAPIClass(
  object: unknown,
): object is SerializedIsaacAPIClass {
  const allFunctions = Object.values(ISAAC_API_CLASS_TYPE_TO_FUNCTIONS);
  const isSerializedFunctions = allFunctions.map(
    (functions) => functions.isSerialized,
  );
  return isSerializedFunctions.some((identityFunction) =>
    identityFunction(object),
  );
}

/**
 * Helper function to generically serialize an Isaac API class without knowing what specific type of
 * class it is. (This is used by the save data manager when writing data to the "save#.dat" file.)
 *
 * For the list of supported classes, see the `CopyableIsaacAPIClassType` enum.
 */
export function serializeIsaacAPIClass(isaacAPIClass: unknown): unknown {
  if (!isUserdata(isaacAPIClass)) {
    error(
      `Failed to serialize an Isaac API class since the provided object was of type: ${typeof isaacAPIClass}`,
    );
  }

  const isaacAPIClassType = getIsaacAPIClassName(isaacAPIClass);
  if (isaacAPIClassType === undefined) {
    error(
      "Failed to serialize an Isaac API class since it does not have a class type.",
    );
  }

  const copyableIsaacAPIClassType =
    isaacAPIClassType as CopyableIsaacAPIClassType;
  const functions =
    ISAAC_API_CLASS_TYPE_TO_FUNCTIONS[copyableIsaacAPIClassType];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (functions === undefined) {
    error(
      `Failed to serialize an Isaac API class since the associated functions were not found for class type: ${copyableIsaacAPIClassType}`,
    );
  }

  return functions.serialize(isaacAPIClass);
}
