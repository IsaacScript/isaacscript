import { CopyableIsaacAPIClassType } from "../enums/private/CopyableIsaacAPIClassType";
import { isSerializedColor } from "../functions/color";
import { isSerializedKColor } from "../functions/kColor";
import { isSerializedRNG } from "../functions/rng";
import { isSerializedVector } from "../functions/vector";

export const SERIALIZED_ISAAC_API_CLASS_TYPE_TO_IDENTITY_FUNCTION: {
  readonly [key in CopyableIsaacAPIClassType]: (object: unknown) => boolean;
} = {
  [CopyableIsaacAPIClassType.COLOR]: isSerializedColor,
  [CopyableIsaacAPIClassType.KCOLOR]: isSerializedKColor,
  [CopyableIsaacAPIClassType.RNG]: isSerializedRNG,
  [CopyableIsaacAPIClassType.VECTOR]: isSerializedVector,
};
