import { EntityType } from "../../../../enums/EntityType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface EntitiesSaveStateVector {
    Get: (index: int) => EntitiesSaveState | undefined;

    /**
     *
     * @param entityType
     * @param variant Default is 0.
     * @param subType Default is 0.
     * @returns
     */
    GetByType: (
      entityType: EntityType,
      variant?: int,
      subType?: int,
    ) => EntitiesSaveState | undefined;
  }
}
