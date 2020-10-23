declare class ItemConfig {
  GetCollectible(collectibleType: CollectibleType | int): Readonly<ItemConfigItem>;
  GetTrinket(trinketType: TrinketType | int): Readonly<ItemConfigItem>;
  GetNullItem(nullItemID: NullItemID): Readonly<ItemConfigItem>;
  GetCard(card: Card | int): Readonly<ItemConfigCard>;
  GetPillEffect(pillEffect: PillEffect | int): Readonly<ItemConfigPillEffect>;
  GetCollectibles(): Readonly<ItemConfigList>;
  GetTrinkets(): Readonly<ItemConfigList>;
  GetNullItems(): Readonly<ItemConfigList>;
  // CostumeConfigList is bugged and always returns a list of size 0
  // GetCostumes(): Readonly<CostumeConfigList>;
  GetCards(): Readonly<CardConfigList>;
  GetPillEffects(): Readonly<PillConfigList>;

  // The static methods in this class are weird and can only be called by a global variable
  // e.g. ItemConfig.Config.IsValidCollectible(1)
  // However, IsValidCollectible() is bugged for modded items,
  // so it is deliberately not implemented here
  // ShouldAddCostumeOnPickup() is near-useless and is deliberately not implemented here
}
