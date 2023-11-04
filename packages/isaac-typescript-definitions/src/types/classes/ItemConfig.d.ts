import type {
  CardType,
  CollectibleType,
  TrinketType,
} from "../../enums/collections/subTypes";
import type { NullItemID } from "../../enums/NullItemID";
import type { PillEffect } from "../../enums/PillEffect";

declare global {
  interface ItemConfig extends IsaacAPIClass {
    /** Returns undefined if the card was not found. */
    GetCard: (cardType: CardType) => Readonly<ItemConfigCard> | undefined;

    GetCards: () => Readonly<CardConfigList>;

    /** Returns undefined if the collectible type was not found. */
    GetCollectible: (
      collectibleType: CollectibleType,
    ) => Readonly<ItemConfigItemCollectible> | undefined;

    GetCollectibles: () => Readonly<ItemConfigList>;

    /** Returns undefined if the item was not found. */
    GetNullItem: (
      nullItemID: NullItemID,
    ) => Readonly<ItemConfigItemNull> | undefined;

    GetNullItems: () => Readonly<ItemConfigList>;

    /** Returns undefined if the pill effect was not found. */
    GetPillEffect: (
      pillEffect: PillEffect,
    ) => Readonly<ItemConfigPillEffect> | undefined;

    GetPillEffects: () => Readonly<PillConfigList>;

    /** Returns undefined if the trinket was not found. */
    GetTrinket: (
      trinketType: TrinketType,
    ) => Readonly<ItemConfigItemTrinket> | undefined;

    GetTrinkets: () => Readonly<ItemConfigList>;

    /**
     * In the "enums.lua" file, the ItemConfig class is extended with many members:
     *
     * - ItemConfig.CHARGE_*
     * - ItemConfig.TAG_*
     * - ItemConfig.CARDTYPE_*
     *
     * In IsaacScript, these are instead implemented as enums, since it is cleaner. See
     * `ItemConfigChargeType`, `ItemConfigTag`, and `ItemConfigCardType` respectively.
     */
  }

  /**
   * The static methods in this class can only be called by the global variable.
   *
   * e.g. `ItemConfig.Config.IsValidCollectible(1)`
   */
  namespace ItemConfig {
    /**
     * @deprecated This method does not work properly for modded items, so it should never be used.
     *             Use the `isValidCollectibleType` helper function instead.
     */
    function IsValidCollectible(collectibleType: CollectibleType): boolean;

    function ShouldAddCostumeOnPickup(): boolean;
  }
}
