import type { CopyableIsaacAPIClassType } from "isaac-typescript-definitions";
import { ISAAC_API_CLASS_TYPE_TO_BRAND } from "../objects/isaacAPIClassTypeToBrand";
import type {
  CopyableIsaacAPIClass,
  IsaacAPIClassTypeFunctions,
  IsaacAPIClassTypeToSerializedType,
  IsaacAPIClassTypeToType,
  SerializedIsaacAPIClass,
} from "../objects/isaacAPIClassTypeToFunctions";
import { ISAAC_API_CLASS_TYPE_TO_FUNCTIONS } from "../objects/isaacAPIClassTypeToFunctions";
import { getIsaacAPIClassName } from "./isaacAPIClass";
import { isTable, isUserdata } from "./types";
import { assertDefined } from "./utils";

/**
 * Helper function to generically copy an Isaac API class without knowing what specific type of
 * class it is. (This is used by the save data manager.)
 *
 * For the list of supported classes, see the `CopyableIsaacAPIClassType` enum.
 */
export function copyIsaacAPIClass<T extends CopyableIsaacAPIClass>(
  isaacAPIClass: T,
): T {
  if (!isUserdata(isaacAPIClass)) {
    error(
      `Failed to copy an Isaac API class since the provided object was of type: ${typeof isaacAPIClass}`,
    );
  }

  const isaacAPIClassType = getIsaacAPIClassName(isaacAPIClass);
  assertDefined(
    isaacAPIClassType,
    "Failed to copy an Isaac API class since it does not have a class type.",
  );

  const copyableIsaacAPIClassType =
    isaacAPIClassType as CopyableIsaacAPIClassType;

  type ThisIsaacAPIClassType = T;
  type ThisSerializedIsaacAPIClassType =
    IsaacAPIClassTypeToSerializedType[T["__kind"]];

  const functions = ISAAC_API_CLASS_TYPE_TO_FUNCTIONS[
    copyableIsaacAPIClassType
  ] as unknown as
    | IsaacAPIClassTypeFunctions<
        ThisIsaacAPIClassType,
        ThisSerializedIsaacAPIClassType
      >
    | undefined;
  assertDefined(
    functions,
    `Failed to copy an Isaac API class since the associated functions were not found for Isaac API class type: ${copyableIsaacAPIClassType}`,
  );

  return functions.copy(isaacAPIClass);
}

/**
 * Helper function to generically deserialize an Isaac API class without knowing what specific type
 * of class it is. (This is used by the save data manager when reading data from the "save#.dat"
 * file.)
 *
 * For the list of supported classes, see the `CopyableIsaacAPIClassType` enum.
 */
export function deserializeIsaacAPIClass<
  SerializedT extends SerializedIsaacAPIClass,
>(
  serializedIsaacAPIClass: SerializedT,
): IsaacAPIClassTypeToType[SerializedT["__kind"]] {
  if (!isTable(serializedIsaacAPIClass)) {
    error(
      `Failed to deserialize an Isaac API class since the provided object was of type: ${typeof serializedIsaacAPIClass}`,
    );
  }

  const copyableIsaacAPIClassType = getSerializedTableType(
    serializedIsaacAPIClass,
  );
  assertDefined(
    copyableIsaacAPIClassType,
    "Failed to deserialize an Isaac API class since a valid class type brand was not found.",
  );

  type ThisIsaacAPIClassType = IsaacAPIClassTypeToType[SerializedT["__kind"]];
  type ThisSerializedIsaacAPIClassType = SerializedT;

  const functions = ISAAC_API_CLASS_TYPE_TO_FUNCTIONS[
    copyableIsaacAPIClassType
  ] as unknown as
    | IsaacAPIClassTypeFunctions<
        ThisIsaacAPIClassType,
        ThisSerializedIsaacAPIClassType
      >
    | undefined;
  assertDefined(
    functions,
    `Failed to deserialize an Isaac API class since the associated functions were not found for class type: ${copyableIsaacAPIClassType}`,
  );

  return functions.deserialize(serializedIsaacAPIClass);
}

/**
 * In order to find out what type of serialized Isaac API class this is, we search through the
 * serialized table for brands.
 */
function getSerializedTableType(
  serializedIsaacAPIClass: SerializedIsaacAPIClass,
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
 * Helper function to generically check if a given object is a copyable Isaac API class. (This is
 * used by the save data manager when determining what is safe to copy.)
 *
 * For the list of supported classes, see the `CopyableIsaacAPIClassType` enum.
 */
export function isCopyableIsaacAPIClass(
  object: unknown,
): object is CopyableIsaacAPIClass {
  const allFunctions = Object.values(ISAAC_API_CLASS_TYPE_TO_FUNCTIONS);
  const isFunctions = allFunctions.map((functions) => functions.is);
  return isFunctions.some((identityFunction) => identityFunction(object));
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
export function serializeIsaacAPIClass<T extends CopyableIsaacAPIClass>(
  isaacAPIClass: T,
): IsaacAPIClassTypeToSerializedType[T["__kind"]] {
  if (!isUserdata(isaacAPIClass)) {
    error(
      `Failed to serialize an Isaac API class since the provided object was of type: ${typeof isaacAPIClass}`,
    );
  }

  const isaacAPIClassType = getIsaacAPIClassName(isaacAPIClass);
  assertDefined(
    isaacAPIClassType,
    "Failed to serialize an Isaac API class since it does not have a class name.",
  );

  const copyableIsaacAPIClassType =
    isaacAPIClassType as CopyableIsaacAPIClassType;

  type ThisIsaacAPIClassType = T;
  type ThisSerializedIsaacAPIClassType =
    IsaacAPIClassTypeToSerializedType[T["__kind"]];

  const functions = ISAAC_API_CLASS_TYPE_TO_FUNCTIONS[
    copyableIsaacAPIClassType
  ] as unknown as
    | IsaacAPIClassTypeFunctions<
        ThisIsaacAPIClassType,
        ThisSerializedIsaacAPIClassType
      >
    | undefined;
  assertDefined(
    functions,
    `Failed to serialize an Isaac API class since the associated functions were not found for class type: ${copyableIsaacAPIClassType}`,
  );

  return functions.serialize(isaacAPIClass);
}
