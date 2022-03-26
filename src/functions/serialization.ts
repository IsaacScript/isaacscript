import { SerializableIsaacAPIClassType } from "../enums/private/SerializableIsaacAPIClassType";
import { SerializationType } from "../enums/SerializationType";
import { SERIALIZABLE_ISAAC_API_CLASS_TYPE_TO_COPY_FUNCTION } from "../objects/serializableIsaacAPIClassTypeToCopyFunction";
import { SERIALIZABLE_ISAAC_API_CLASS_TYPE_TO_IDENTITY_FUNCTION } from "../objects/serializableIsaacAPIClassTypeToIdentityFunction";
import { SerializableIsaacAPIClass } from "../types/private/SerializableIsaacAPIClass";
import { SerializedIsaacAPIClass } from "../types/private/SerializedIsaacAPIClass";
import { getIsaacAPIClassType } from "./isaacAPIClass";

export function copySerializableIsaacAPIClass(
  isaacAPIClassOrSerializedTable:
    | SerializableIsaacAPIClass
    | SerializedIsaacAPIClass,
  serializationType: SerializationType,
): unknown {
  const isaacAPIClassType = getIsaacAPIClassType(
    isaacAPIClassOrSerializedTable,
  ) as SerializableIsaacAPIClassType;

  const copyFunction =
    SERIALIZABLE_ISAAC_API_CLASS_TYPE_TO_COPY_FUNCTION[isaacAPIClassType];
  if (copyFunction === undefined) {
    error(
      `Failed to copy Isaac API class "${isaacAPIClassType}" since there is not a defined copy function for this class type.`,
    );
  }

  return copyFunction(isaacAPIClassOrSerializedTable, serializationType);
}

export function isSerializedIsaacAPIClass(
  object: unknown,
): object is SerializedIsaacAPIClass {
  const objectType = type(object);
  if (objectType !== "table") {
    return false;
  }

  const identityFunctions = Object.values(
    SERIALIZABLE_ISAAC_API_CLASS_TYPE_TO_IDENTITY_FUNCTION,
  );
  return identityFunctions.some((identityFunction) => identityFunction(object));
}
