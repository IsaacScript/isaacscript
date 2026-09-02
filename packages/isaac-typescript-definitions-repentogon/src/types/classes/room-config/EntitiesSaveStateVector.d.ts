import type { EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface EntitiesSaveStateVector extends IsaacAPIClass {
    readonly Clear: () => void;

    readonly Get: (index: int) => EntitiesSaveState;

    /**
     * @param entityType
     * @param variant Optional. Default is 0.
     * @param subType Optional. Default is 0.
     */
    readonly GetByType: (
      entityType: EntityType,
      variant?: int,
      subType?: int,
    ) => EntitiesSaveState[];

    readonly len: LuaLengthMethod<int>;
  }
}
