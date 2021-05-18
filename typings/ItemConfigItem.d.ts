declare class ItemConfigItem {
  HasTags(tags: int): boolean;
  IsCollectible(): boolean;
  IsNull(): boolean;
  IsTrinket(): boolean;
  
  AchievementID: int;
  AddBlackHearts: int;
  AddBombs: int;
  AddCoins: int;
  AddHearts: int;
  AddKeys: int;
  AddMaxHearts: int;
  AddSoulHearts: int;
  CacheFlags: CacheFlag;
  PassiveCache: boolean;
  PersistentEffect: boolean;
  ClearEffectsOnRemove: boolean;
  readonly Costume: Readonly<ItemConfigCostume>;
  AddCostumeOnPickup: boolean;
  Description: string;
  DevilPrice: int;
  ShopPrice: int;
  Discharged: boolean;
  GfxFileName: string;
  ID: int;
  InitCharge: int;
  ChargeType: int;
  MaxCharges: int;
  MaxCooldown: int;
  Name: string;
  Tags: int;
  Quality: int;
  Special: boolean;
  Hidden: boolean;
  Type: ItemType;
}
