import type { GridEntityType } from "../../../../enums/GridEntityType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface GridEntitiesSaveStateVector {
    Get: (index: int) => GridEntityDesc | undefined;
    GetByType: (gridEntityType: GridEntityType) => GridEntityDesc | undefined;
  }
}
