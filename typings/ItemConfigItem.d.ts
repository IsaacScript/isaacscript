declare class ItemConfigItem {
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
  readonly Costume: Readonly<ItemConfigCostume>;
  Description: string;
  DevilPrice: int;
  Discharged: boolean;
  GfxFileName: string;
  ID: int;
  MaxCharges: int;
  MaxCooldown: int;
  Name: string;
  Special: boolean;
  Type: ItemType;
}
