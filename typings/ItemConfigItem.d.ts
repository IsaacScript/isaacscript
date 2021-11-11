declare interface ItemConfigItem {
  HasTags(tags: ItemConfigTag): boolean;
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
