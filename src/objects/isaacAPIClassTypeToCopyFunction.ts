import { CopyableIsaacAPIClassType } from "../enums/private/CopyableIsaacAPIClassType";
import { SerializationType } from "../enums/SerializationType";
import { copyColor } from "../functions/color";
import { copyKColor } from "../functions/kColor";
import { copyRNG } from "../functions/rng";
import { copyVector } from "../functions/vector";

export const ISAAC_API_CLASS_TYPE_TO_COPY_FUNCTION: {
  readonly [key in CopyableIsaacAPIClassType]: (
    object: unknown,
    serializationType: SerializationType,
  ) => boolean;
} = {
  [CopyableIsaacAPIClassType.COLOR]: copyColor,
  [CopyableIsaacAPIClassType.K_COLOR]: copyKColor,
  [CopyableIsaacAPIClassType.RNG]: copyRNG,
  [CopyableIsaacAPIClassType.VECTOR]: copyVector,
};
