import { SerializableIsaacAPIClassType } from "../enums/private/SerializableIsaacAPIClassType";
import { SerializationType } from "../enums/SerializationType";
import { SerializableIsaacAPIClass } from "../types/private/SerializableIsaacAPIClass";
import { SerializedIsaacAPIClass } from "../types/private/SerializedIsaacAPIClass";
import { copyColor, isSerializedColor } from "./color";
import { getIsaacAPIClassType } from "./isaacAPIClass";
import { copyKColor, isSerializedKColor } from "./kColor";
import { copyRNG, isSerializedRNG } from "./rng";
import { ensureAllCases, getEnumValues } from "./utils";
import { copyVector, isSerializedVector } from "./vector";

export function copySerializableIsaacAPIClass(
  isaacAPIClassOrSerializedTable:
    | SerializableIsaacAPIClass
    | SerializedIsaacAPIClass,
  serializationType: SerializationType,
): unknown {
  const isaacAPIClassType = getIsaacAPIClassType(
    isaacAPIClassOrSerializedTable,
  ) as SerializableIsaacAPIClassType;

  switch (isaacAPIClassType) {
    case SerializableIsaacAPIClassType.COLOR: {
      const color = isaacAPIClassOrSerializedTable as unknown as Color;
      return copyColor(color, serializationType);
    }

    case SerializableIsaacAPIClassType.KCOLOR: {
      const kColor = isaacAPIClassOrSerializedTable as unknown as KColor;
      return copyKColor(kColor, serializationType);
    }

    case SerializableIsaacAPIClassType.RNG: {
      const rng = isaacAPIClassOrSerializedTable as unknown as RNG;
      return copyRNG(rng);
    }

    case SerializableIsaacAPIClassType.VECTOR: {
      const vector = isaacAPIClassOrSerializedTable as unknown as Vector;
      return copyVector(vector);
    }

    default: {
      return ensureAllCases(isaacAPIClassType);
    }
  }
}

export function isSerializedIsaacAPIClass(
  object: unknown,
): object is SerializedIsaacAPIClass {
  const objectType = type(object);
  if (objectType !== "table") {
    return false;
  }

  const serializableIsaacAPIClassTypes = getEnumValues(
    SerializableIsaacAPIClassType,
  );
  for (const serializableIsaacAPIClassType of serializableIsaacAPIClassTypes) {
    switch (serializableIsaacAPIClassType) {
      case SerializableIsaacAPIClassType.COLOR: {
        if (isSerializedColor(object)) {
          return true;
        }

        break;
      }

      case SerializableIsaacAPIClassType.KCOLOR: {
        if (isSerializedKColor(object)) {
          return true;
        }

        break;
      }

      case SerializableIsaacAPIClassType.RNG: {
        if (isSerializedRNG(object)) {
          return true;
        }

        break;
      }

      case SerializableIsaacAPIClassType.VECTOR: {
        if (isSerializedVector(object)) {
          return true;
        }

        break;
      }

      default: {
        ensureAllCases(serializableIsaacAPIClassType);
      }
    }
  }

  return false;
}
