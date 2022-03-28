import { SerializableIsaacAPIClassType } from "../enums/private/SerializableIsaacAPIClassType";
import { isSerializedColor } from "../functions/color";
import { isSerializedKColor } from "../functions/kColor";
import { isSerializedRNG } from "../functions/rng";
import { isSerializedVector } from "../functions/vector";

export const SERIALIZED_ISAAC_API_CLASS_TYPE_TO_IDENTITY_FUNCTION: {
  readonly [key in SerializableIsaacAPIClassType]: (object: unknown) => boolean;
} = {
  [SerializableIsaacAPIClassType.COLOR]: isSerializedColor,
  [SerializableIsaacAPIClassType.KCOLOR]: isSerializedKColor,
  [SerializableIsaacAPIClassType.RNG]: isSerializedRNG,
  [SerializableIsaacAPIClassType.VECTOR]: isSerializedVector,
};
