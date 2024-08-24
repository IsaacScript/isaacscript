import type { EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface LootList extends IsaacAPIClass {
    GetEntries: () => LootListEntry[];

    /**
     * @param entityType
     * @param variant
     * @param subType
     * @param seed Optional. Default is `Random()`.
     * @param RNG Optional. Default is undefined.
     */
    PushEntry: (
      entityType: EntityType,
      variant: int,
      subType: int,
      seed?: Seed,
      RNG?: RNG,
    ) => void;
  }

  function LootList(this: void): LootList;
}
