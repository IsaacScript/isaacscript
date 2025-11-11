import type { EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface EntitiesSaveStateVector extends IsaacAPIClass {
    Clear: () => void;

    Get: (index: int) => EntitiesSaveState;

    /**
     * @param entityType
     * @param variant Optional. Default is 0.
     * @param subType Optional. Default is 0.
     */
    GetByType: (
      entityType: EntityType,
      variant?: int,
      subType?: int,
    ) => EntitiesSaveState[];

    len: LuaLengthMethod<int>;
  }
}
