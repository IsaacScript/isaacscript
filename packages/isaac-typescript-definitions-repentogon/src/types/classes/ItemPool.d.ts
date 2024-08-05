import type {
  CardType,
  CollectibleType,
  ItemPoolType,
  PillColor,
  PillEffect,
  TrinketType,
} from "isaac-typescript-definitions";

declare global {
  interface ItemPool extends IsaacAPIClass {
    /**
     * Returns whether the specified collectible can spawn.
     *
     * @param collectible
     * @param ignoreLocked If true, the method will return true for items that could appear but are
     *                     locked behind achievements.
     */
    CanSpawnCollectible: (
      collectible: CollectibleType,
      ignoreLocked: boolean,
    ) => boolean;

    /** Returns the number of Bible collectibles added to the specified `ItemPoolType`. */
    GetBibleUpgrades: (itemPool: ItemPoolType) => int;

    /**
     * A more sophisticated version of `ItemPool.GetCard` that allows you to define individual
     * chances.
     */
    GetCardEx: (
      seed: Seed,
      specialChance: int,
      runeChance: int,
      suitChance: int,
      allowNonCards: boolean,
    ) => CardType;

    /**
     * Returns a random collectible from the specified array of collectibles.
     *
     * @param collectibleList
     * @param seed Optional. Default is `Random()`.
     * @param defaultItem Optional. The default collectible to spawn if all collectibles in
     *                    `collectibleList` are blacklisted. Default is `CollectibleType.BREAKFAST`.
     * @param addToBlacklist Optional. Determines whether the chosen collectible is added to the
     *                       blacklist. Default is true.
     * @param excludeLockedItems Optional. Determines whether to exclude locked items. Default is
     *                           false.
     */
    GetCollectibleFromList: (
      collectibleList: readonly CollectibleType[],
      seed?: Seed,
      defaultItem?: CollectibleType,
      addToBlacklist?: boolean,
      excludeLockedItems?: boolean,
    ) => CollectibleType;

    /** Returns an array of collectibles registered in the specified `ItemPoolType`. */
    GetCollectiblesFromPool: (poolType: ItemPoolType) => Array<{
      decreaseBy: float;
      initialWeight: float;
      itemID: CollectibleType;
      removeOn: float;
      weight: float;
    }>;

    /** Returns the number of trinkets available in the item pool. */
    GetNumAvailableTrinkets: () => int;

    /**
     * Returns the number of item pools in the game, including modded item pools defined in
     * `itempools.xml`.
     */
    GetNumItemPools: () => int;

    /**
     * Returns a `PillColor` matching the specified `PillEffect`. Returns `PillColor.NULL` if the
     * effect is not in the rotation.
     *
     * This method is not applied by pill modifications, such as PHD/False PHD.
     */
    GetPillColor: (pillEffect: PillEffect) => PillColor;

    /** Returns an array of collectibles removed from all pools. */
    GetRemovedCollectibles: () => CollectibleType[];

    /** Returns an array of all collectibles blacklisted in the current room. */
    GetRoomBlacklistedCollectibles: () => CollectibleType[];

    /** Returns whether the specified collectible is available in item pools. */
    HasCollectible: (collectible: CollectibleType) => boolean;

    /** Returns whether the specified trinket is available in the trinket pool. */
    HasTrinket: (trinket: TrinketType) => boolean;

    /** Resets the specified `PillColor` back to its unidentified state. */
    UnidentifyPill: (pill: PillColor) => void;
  }
}
