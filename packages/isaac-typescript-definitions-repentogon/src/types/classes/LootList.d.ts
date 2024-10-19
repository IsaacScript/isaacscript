import type { EntityType } from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   */
  interface LootList extends IsaacAPIClass {
    /** Returns an array of entries in the `LootList`. */
    GetEntries: () => LootListEntry[];

    /**
     * Adds a new entry into the `LootList`.
     *
     * While usually reserved for chests and sacks that give pickups like hearts and bombs, every
     * `EntityPickup` has a `LootList` that lets you add your entities to it.
     *
     * Calling this method does nothing if the `LootList` is readonly; it should only be called in
     * `ModCallbackRepentogon.PRE_PICKUP_GET_LOOT_LIST`.
     *
     * **Example**
     *
     * This snippet replaces the contents of every chest in the game with Delirium, for better or
     * for worse:
     *
     * ```ts
     * const mod = RegisterMod("Delirium Unboxing", 1);
     *
     * function getLootList(pickup: EntityPickup) {
     *   if (pickup.Variant === PickupVariant.CHEST) {
     *     const newLootList = LootList();
     *     newLootList.PushEntry(EntityType.DELIRIUM, 0, 0);
     *     return newLootList;
     *   }
     *
     *   return undefined;
     * }
     *
     * mod.AddCallbackRepentogon(
     *   ModCallbackRepentogon.PRE_PICKUP_GET_LOOT_LIST,
     *   getLootList,
     * );
     * ```
     *
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
