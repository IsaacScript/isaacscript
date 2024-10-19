import type {
  CardType,
  CollectibleType,
  ItemPoolType,
  PillColor,
  PillEffect,
  TrinketType,
} from "isaac-typescript-definitions";
import type { GetCollectibleFlag } from "../../enums/flags/GetCollectibleFlag";

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

    /** Returns the number of Bible collectibles added to provided `itemPool`. */
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
      isUnlocked: boolean;
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

    /**
     * Returns a random item pool that is present in the current game mode. The pool selection is
     * weighted, meaning item pools with more collectibles have a higher chance of being selected.
     *
     * @param rng
     * @param advancedSearch Optional. If true, the game will return any item pool in the game,
     *                       including those not present in the current game mode. Furthermore,
     *                       setting it to true will allow you to make use of the `filter` argument.
     *                       Default is false.
     * @param filter Optional. The list of filtered item pools. Default is an empty array.
     * @param isWhitelist Optional. If true, the game will only select item pools from the filter.
     *                    Otherwise, the game will not select item pools from the filter. Default is
     *                    false.
     */
    GetRandomPool: (
      rng: RNG,
      advancedSearch?: boolean,
      filter?: ItemPoolType[],
      isWhitelist?: boolean,
    ) => ItemPoolType;

    /** Returns an array of collectibles removed from all pools. */
    GetRemovedCollectibles: () => CollectibleType[];

    /** Returns an array of all collectibles blacklisted in the current room. */
    GetRoomBlacklistedCollectibles: () => CollectibleType[];

    /** Returns whether the specified collectible is available in item pools. */
    HasCollectible: (collectible: CollectibleType) => boolean;

    /** Returns whether the specified trinket is available in the trinket pool. */
    HasTrinket: (trinket: TrinketType) => boolean;

    /**
     * Returns the raw result of `ItemPool.GetCollectible` without applying the filtering used in
     * `ItemPool.GetCollectible`. Returns undefined if the provided `itemPool` has no collectibles
     * remaining.
     *
     * **Differences with `ItemPool.GetCollectible`**
     *
     * - The game does not select glitched items, even if a player has TMTRAINER.
     * - The game does not randomize the pool if a player has Chaos.
     * - The game does not attempt to return a collectible from `ItemPoolType.TREASURE` or
     *   `CollectibleType.BREAKFAST` if it fails to pick a random collectible.
     * - The game does not attempt to morph the collectible into `CollectibleType.BIBLE`,
     *   `CollectibleType.MAGIC_SKIN`, or `CollectibleType.ROSARY`.
     * - The game does not trigger `ModCallbackRepentogon.PRE_GET_COLLECTIBLE` and
     *   `ModCallbackRepentogon.POST_GET_COLLECTIBLE`.
     *
     * @param itemPool
     * @param decrease Optional. Default is false.
     * @param rng Optional. Default is a new RNG object seeded with `Random()`.
     * @param flags Optional. Default is `GetCollectibleFlagZero`.
     */
    PickCollectible: (
      itemPool: ItemPoolType,
      decrease?: boolean,
      rng?: RNG,
      flags?: GetCollectibleFlag | BitFlags<GetCollectibleFlag>,
    ) =>
      | {
          itemID: CollectibleType;
          initialWeight: float;
          weight: float;
          decreaseBy: float;
          removeOn: float;
          isUnlocked: boolean;
        }
      | undefined;

    /**
     * Makes the provided collectible available again in every item pool. Its `initialWeight` is
     * also restored.
     */
    ResetCollectible: (collectible: CollectibleType) => void;

    /** Sets the currently selected `ItemPoolType`. */
    SetLastPool: (pool: ItemPoolType) => void;

    /** Resets the specified `PillColor` back to its unidentified state. */
    UnidentifyPill: (pill: PillColor) => void;
  }
}
