import { CopyableIsaacAPIClassType } from "isaac-typescript-definitions";
import { SerializationBrand } from "../enums/SerializationBrand";
import { HasAllEnumKeys } from "../types/HasAllEnumKeys";

export const ISAAC_API_CLASS_TYPE_TO_BRAND = {
  [CopyableIsaacAPIClassType.BIT_SET_128]: SerializationBrand.BIT_SET_128,
  [CopyableIsaacAPIClassType.COLOR]: SerializationBrand.COLOR,
  [CopyableIsaacAPIClassType.K_COLOR]: SerializationBrand.K_COLOR,
  [CopyableIsaacAPIClassType.RNG]: SerializationBrand.RNG,
  [CopyableIsaacAPIClassType.VECTOR]: SerializationBrand.VECTOR,
} as const satisfies HasAllEnumKeys<
  CopyableIsaacAPIClassType,
  SerializationBrand
>;
