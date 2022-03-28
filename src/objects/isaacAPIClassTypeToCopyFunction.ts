import { SerializableIsaacAPIClassType } from "../enums/private/SerializableIsaacAPIClassType";
import { SerializationType } from "../enums/SerializationType";
import { copyColor } from "../functions/color";
import { copyKColor } from "../functions/kColor";
import { copyRNG } from "../functions/rng";
import { copyVector } from "../functions/vector";

export const ISAAC_API_CLASS_TYPE_TO_COPY_FUNCTION: {
  readonly [key in SerializableIsaacAPIClassType]: (
    object: unknown,
    serializationType: SerializationType,
  ) => boolean;
} = {
  [SerializableIsaacAPIClassType.COLOR]: copyColor,
  [SerializableIsaacAPIClassType.KCOLOR]: copyKColor,
  [SerializableIsaacAPIClassType.RNG]: copyRNG,
  [SerializableIsaacAPIClassType.VECTOR]: copyVector,
};
