import type { GridEntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface GridEntitiesSaveStateVector extends IsaacAPIClass {
    readonly Clear: () => void;
    readonly Get: (index: int) => GridEntityDesc;
    readonly GetByType: (gridEntityType: GridEntityType) => GridEntityDesc[];

    readonly len: LuaLengthMethod<int>;
  }
}
