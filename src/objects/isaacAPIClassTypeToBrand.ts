import { SerializableIsaacAPIClassType } from "../enums/private/SerializableIsaacAPIClassType";
import { SerializationBrand } from "../enums/private/SerializationBrand";

export const ISAAC_API_CLASS_TYPE_TO_BRAND: {
  readonly [key in SerializableIsaacAPIClassType]: SerializationBrand;
} = {
  [SerializableIsaacAPIClassType.COLOR]: SerializationBrand.COLOR,
  [SerializableIsaacAPIClassType.KCOLOR]: SerializationBrand.KCOLOR,
  [SerializableIsaacAPIClassType.RNG]: SerializationBrand.RNG,
  [SerializableIsaacAPIClassType.VECTOR]: SerializationBrand.VECTOR,
};
