import { CopyableIsaacAPIClassType } from "../enums/private/CopyableIsaacAPIClassType";
import { SerializationType } from "../enums/SerializationType";
import { ISAAC_API_CLASS_TYPE_TO_BRAND } from "../objects/isaacAPIClassTypeToBrand";
import { ISAAC_API_CLASS_TYPE_TO_COPY_FUNCTION } from "../objects/isaacAPIClassTypeToCopyFunction";
import { SERIALIZED_ISAAC_API_CLASS_TYPE_TO_IDENTITY_FUNCTION } from "../objects/serializedIsaacAPIClassTypeToIdentityFunction";
import { SerializedIsaacAPIClass } from "../types/private/SerializedIsaacAPIClass";
import { getIsaacAPIClassType } from "./isaacAPIClass";

export function copyIsaacAPIClass(
  isaacAPIClass: unknown,
  serializationType: SerializationType,
): unknown {
  const objectType = type(isaacAPIClass);
  if (objectType !== "userdata") {
    error(
      `Failed to copy an Isaac API class since the provided object was of type: ${objectType}`,
    );
  }

  const isaacAPIClassType = getIsaacAPIClassType(isaacAPIClass);
  if (isaacAPIClassType === undefined) {
    error(
      "Failed to copy an Isaac API class due to it not having a class type.",
    );
  }

  const copyableIsaacAPIClassType =
    isaacAPIClassType as CopyableIsaacAPIClassType;
  const copyFunction =
    ISAAC_API_CLASS_TYPE_TO_COPY_FUNCTION[copyableIsaacAPIClassType];
  if (copyFunction === undefined) {
    error(
      `Failed to copy Isaac API class "${copyableIsaacAPIClassType}" since there is not a defined copy function for this class type.`,
    );
  }

  return copyFunction(isaacAPIClass, serializationType);
}

/**
 * Deserialization is a special case, so we make a dedicated function for this.
 *
 * There is no need for a corresponding "serializeIsaacAPIClass" function because the
 * "copyIsaacAPIClass" function can handles all serialization types.
 */
export function deserializeIsaacAPIClass(
  serializedIsaacAPIClass: SerializedIsaacAPIClass,
): unknown {
  const objectType = type(serializedIsaacAPIClass);
  if (objectType !== "table") {
    error(
      `Failed to deserialize an Isaac API class since the provided object was of type: ${objectType}`,
    );
  }

  const copyableIsaacAPIClassType = getSerializedTableType(
    serializedIsaacAPIClass,
  );
  if (copyableIsaacAPIClassType === undefined) {
    error(
      "Failed to deserialize an API class since a valid class type brand was not found.",
    );
  }

  const copyFunction =
    ISAAC_API_CLASS_TYPE_TO_COPY_FUNCTION[copyableIsaacAPIClassType];
  if (copyFunction === undefined) {
    error(
      `Failed to deserialize Isaac API class "${copyableIsaacAPIClassType}" since there is not a defined copy function for this class type.`,
    );
  }

  return copyFunction(serializedIsaacAPIClass, SerializationType.DESERIALIZE);
}

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

export function isSerializedIsaacAPIClass(
  object: unknown,
): object is SerializedIsaacAPIClass {
  const identityFunctions = Object.values(
    SERIALIZED_ISAAC_API_CLASS_TYPE_TO_IDENTITY_FUNCTION,
  );
  return identityFunctions.some((identityFunction) => identityFunction(object));
}
