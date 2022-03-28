import { SerializableIsaacAPIClassType } from "../enums/private/SerializableIsaacAPIClassType";
import { SerializationType } from "../enums/SerializationType";
import { ISAAC_API_CLASS_TYPE_TO_BRAND } from "../objects/isaacAPIClassTypeToBrand";
import { ISAAC_API_CLASS_TYPE_TO_COPY_FUNCTION } from "../objects/isaacAPIClassTypeToCopyFunction";
import { SERIALIZED_ISAAC_API_CLASS_TYPE_TO_IDENTITY_FUNCTION } from "../objects/serializedIsaacAPIClassTypeToIdentityFunction";
import { SerializableIsaacAPIClass } from "../types/private/SerializableIsaacAPIClass";
import { SerializedIsaacAPIClass } from "../types/private/SerializedIsaacAPIClass";
import { getIsaacAPIClassType } from "./isaacAPIClass";
import { getEnumValues } from "./utils";

const SERIALIZABLE_ISAAC_API_CLASS_TYPES_SET = new Set<string>(
  getEnumValues(SerializableIsaacAPIClassType),
);

export function copyIsaacAPIClass(
  isaacAPIClass: SerializableIsaacAPIClass,
  serializationType: SerializationType,
): unknown {
  const objectType = type(isaacAPIClass);
  if (objectType !== "userdata") {
    error(
      `Failed to serialize an Isaac API class since the provided object was of type: ${objectType}`,
    );
  }

  const isaacAPIClassType = getIsaacAPIClassType(isaacAPIClass);
  if (isaacAPIClassType === undefined) {
    error(
      "Failed to serialize an Isaac API class due to it not having a class type.",
    );
  }

  const serializableIsaacAPIClassType =
    isaacAPIClassType as SerializableIsaacAPIClassType;
  const copyFunction =
    ISAAC_API_CLASS_TYPE_TO_COPY_FUNCTION[serializableIsaacAPIClassType];
  if (copyFunction === undefined) {
    error(
      `Failed to copy Isaac API class "${serializableIsaacAPIClassType}" since there is not a defined copy function for this class type.`,
    );
  }

  return copyFunction(isaacAPIClass, serializationType);
}

/**
 * Deserialization is a special case, so we make a dedicated function for this. There is no need for
 * a "serializeIsaacAPIClass" function because the "copyIsaacAPIClass" function can handles all
 * serialization types.
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

  const serializableIsaacAPIClassType = getSerializedTableType(
    serializedIsaacAPIClass,
  );
  if (serializableIsaacAPIClassType === undefined) {
    error(
      "Failed to deserialize an API class since a valid class type brand was not found.",
    );
  }

  const copyFunction =
    ISAAC_API_CLASS_TYPE_TO_COPY_FUNCTION[serializableIsaacAPIClassType];
  if (copyFunction === undefined) {
    error(
      `Failed to deserialize Isaac API class "${serializableIsaacAPIClassType}" since there is not a defined copy function for this class type.`,
    );
  }

  return copyFunction(serializedIsaacAPIClass, SerializationType.DESERIALIZE);
}

function getSerializedTableType(
  serializedIsaacAPIClass: SerializedIsaacAPIClass,
): SerializableIsaacAPIClassType | undefined {
  for (const [
    serializableIsaacAPIClassType,
    serializationBrand,
  ] of Object.entries(ISAAC_API_CLASS_TYPE_TO_BRAND)) {
    if (serializedIsaacAPIClass.has(serializationBrand)) {
      return serializableIsaacAPIClassType as SerializableIsaacAPIClassType;
    }
  }

  return undefined;
}

export function isSerializableIsaacAPIClass(
  object: unknown,
): object is SerializableIsaacAPIClass {
  const classType = getIsaacAPIClassType(object);
  if (classType === undefined) {
    return false;
  }

  return SERIALIZABLE_ISAAC_API_CLASS_TYPES_SET.has(classType);
}

export function isSerializedIsaacAPIClass(
  object: unknown,
): object is SerializedIsaacAPIClass {
  const identityFunctions = Object.values(
    SERIALIZED_ISAAC_API_CLASS_TYPE_TO_IDENTITY_FUNCTION,
  );
  return identityFunctions.some((identityFunction) => identityFunction(object));
}
