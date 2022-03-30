import { CopyableIsaacAPIClassType } from "../enums/private/CopyableIsaacAPIClassType";
import { SerializationBrand } from "../enums/private/SerializationBrand";

export const ISAAC_API_CLASS_TYPE_TO_BRAND: {
  readonly [key in CopyableIsaacAPIClassType]: SerializationBrand;
} = {
  [CopyableIsaacAPIClassType.COLOR]: SerializationBrand.COLOR,
  [CopyableIsaacAPIClassType.KCOLOR]: SerializationBrand.KCOLOR,
  [CopyableIsaacAPIClassType.RNG]: SerializationBrand.RNG,
  [CopyableIsaacAPIClassType.VECTOR]: SerializationBrand.VECTOR,
};
