import { SerializableIsaacAPIClassType } from "../enums/private/SerializableIsaacAPIClassType";
import { isColor } from "../functions/color";
import { isKColor } from "../functions/kColor";
import { isRNG } from "../functions/rng";
import { isVector } from "../functions/vector";

export const SERIALIZABLE_ISAAC_API_CLASS_TYPE_TO_IDENTITY_FUNCTION: {
  readonly [key in SerializableIsaacAPIClassType]: (object: unknown) => boolean;
} = {
  [SerializableIsaacAPIClassType.COLOR]: isColor,
  [SerializableIsaacAPIClassType.KCOLOR]: isKColor,
  [SerializableIsaacAPIClassType.RNG]: isRNG,
  [SerializableIsaacAPIClassType.VECTOR]: isVector,
};
