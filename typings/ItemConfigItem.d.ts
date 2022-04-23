declare interface ItemConfigItem {
  /**
   * Used to check if a collectible or trinket has an item tag, such as "offensive" or
   * "monstermanual". These tags can be found in the "items_metadata.xml" file.
   *
   * @param tags The composition of one or more `ItemConfigTag`.
   */
  HasTags(tags: int): boolean;

  IsCollectible(): boolean;
  IsNull(): boolean;
  IsTrinket(): boolean;

  AchievementID: int;
  AddBlackHearts: int;
  AddBombs: int;
  AddCoins: int;
  AddCostumeOnPickup: boolean;
  AddHearts: int;
  AddKeys: int;
  AddMaxHearts: int;
  AddSoulHearts: int;
  CacheFlags: CacheFlag;
  ChargeType: ItemConfigChargeType;
  ClearEffectsOnRemove: boolean;
  readonly Costume: Readonly<ItemConfigCostume>;
  Description: string;
  DevilPrice: int;
  Discharged: boolean;
  GfxFileName: string;
  Hidden: boolean;
  ID: int;
  InitCharge: int;
  MaxCharges: int;
  MaxCooldown: int;
  Name: string;
  PassiveCache: boolean;
  PersistentEffect: boolean;
  Quality: int;
  ShopPrice: int;
  Special: boolean;
  Tags: int;
  Type: ItemType;
}
