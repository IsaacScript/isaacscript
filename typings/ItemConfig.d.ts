declare class ItemConfig {
  GetCard(card: Card | int): Readonly<ItemConfigCard>;
  GetCards(): Readonly<CardConfigList>;
  GetCollectible(
    collectibleType: CollectibleType | int,
  ): Readonly<ItemConfigItem>;
  GetCollectibles(): Readonly<ItemConfigList>;
  // CostumeConfigList is bugged and always returns a list of size 0
  // GetCostumes(): Readonly<CostumeConfigList>;
  GetNullItem(nullItemID: NullItemID): Readonly<ItemConfigItem>;
  GetNullItems(): Readonly<ItemConfigList>;
  GetPillEffect(pillEffect: PillEffect | int): Readonly<ItemConfigPillEffect>;
  GetPillEffects(): Readonly<PillConfigList>;
  GetTrinket(trinketType: TrinketType | int): Readonly<ItemConfigItem>;
  GetTrinkets(): Readonly<ItemConfigList>;

  // The static methods in this class are weird and can only be called by a global variable
  // e.g. ItemConfig.Config.IsValidCollectible(1)

  /**
   * This method does not work properly for modded items, so it should never be used.
   * Instead, use "GetCollectible(collectibleType) !== null".
   */
  static IsValidCollectible(): never;
  static ShouldAddCostumeOnPickup(): boolean;

  // In the "enums.lua" file, the ItemConfig class is extended with many members:
  // - ItemConfig.CHARGE_*
  // - ItemConfig.TAG_*
  // - ItemConfig.CARDTYPE_*
  // In IsaacScript, these are instead implemented as enums, since it is cleaner
  // See ItemConfigChargeType, ItemConfigTag, and ItemConfigCardType respectively
}
