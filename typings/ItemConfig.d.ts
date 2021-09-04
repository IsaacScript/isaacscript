declare interface ItemConfig {
  /** Returns undefined if the card was not found. */
  GetCard(card: Card | int): Readonly<ItemConfigCard> | undefined;
  GetCards(): Readonly<CardConfigList>;
  /** Returns undefined if the collectible type was not found. */
  GetCollectible(
    collectibleType: CollectibleType | int,
  ): Readonly<ItemConfigItem> | undefined;
  GetCollectibles(): Readonly<ItemConfigList>;
  // CostumeConfigList is bugged and always returns a list of size 0
  // GetCostumes(): Readonly<CostumeConfigList>;
  /** Returns undefined if the item was not found. */
  GetNullItem(
    nullItemID: NullItemID | int,
  ): Readonly<ItemConfigItem> | undefined;
  GetNullItems(): Readonly<ItemConfigList>;
  /** Returns undefined if the pill effect was not found. */
  GetPillEffect(
    pillEffect: PillEffect | int,
  ): Readonly<ItemConfigPillEffect> | undefined;
  GetPillEffects(): Readonly<PillConfigList>;
  /** Returns undefined if the trinket was not found. */
  GetTrinket(
    trinketType: TrinketType | int,
  ): Readonly<ItemConfigItem> | undefined;
  GetTrinkets(): Readonly<ItemConfigList>;

  // In the "enums.lua" file, the ItemConfig class is extended with many members:
  // - ItemConfig.CHARGE_*
  // - ItemConfig.TAG_*
  // - ItemConfig.CARDTYPE_*
  // In IsaacScript, these are instead implemented as enums, since it is cleaner
  // See ItemConfigChargeType, ItemConfigTag, and ItemConfigCardType respectively
}

// The static methods in this class can only be called by a global variable
// e.g. ItemConfig.Config.IsValidCollectible(1)
declare namespace ItemConfig {
  /**
   * This method does not work properly for modded items, so it should never be used.
   * Instead, use "GetCollectible(collectibleType) !== undefined".
   */
  function IsValidCollectible(fakeArg: never): boolean;

  function ShouldAddCostumeOnPickup(): boolean;
}
