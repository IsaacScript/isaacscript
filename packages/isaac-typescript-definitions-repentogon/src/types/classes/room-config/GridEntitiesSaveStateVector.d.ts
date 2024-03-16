import type { GridEntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface GridEntitiesSaveStateVector extends IsaacAPIClass {
    Get: (index: int) => GridEntityDesc | undefined;
    GetByType: (gridEntityType: GridEntityType) => GridEntityDesc | undefined;

    len: LuaLengthMethod<int>;
  }
}
