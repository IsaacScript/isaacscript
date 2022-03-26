import { IsaacAPIClass } from "./IsaacAPIClass";

export type SerializableIsaacAPIClass = IsaacAPIClass & {
  __serializableIsaacAPIClassBrand: unknown;
};
