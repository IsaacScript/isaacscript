import type { EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface EntitiesSaveStateVector extends IsaacAPIClass {
    Get: (index: int) => EntitiesSaveState | undefined;

    /**
     * @param entityType
     * @param variant Optional. Default is 0.
     * @param subType Optional. Default is 0.
     */
    GetByType: (
      entityType: EntityType,
      variant?: int,
      subType?: int,
    ) => EntitiesSaveState | undefined;
  }
}
