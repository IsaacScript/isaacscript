import type { GridEntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface GridEntitiesSaveStateVector extends IsaacAPIClass {
    Clear: () => void;
    Get: (index: int) => GridEntityDesc;
    GetByType: (gridEntityType: GridEntityType) => GridEntityDesc[];

    len: LuaLengthMethod<int>;
  }
}
