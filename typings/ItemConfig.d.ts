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
  // However, IsValidCollectible() is bugged for modded items,
  // so it is deliberately not implemented here
  // ShouldAddCostumeOnPickup() is near-useless and is deliberately not implemented here
}
