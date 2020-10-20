declare class TemporaryEffects {
  AddCollectibleEffect(collectibleType: int, addCostume: boolean): void;
  AddTrinketEffect(trinketType: int, addCostume: boolean): void;
  AddNullEffect(nullItemID: NullItemID, addCostume: boolean): void;
  RemoveCollectibleEffect(collectibleType: int): void;
  RemoveTrinketEffect(trinketType: int): void;
  RemoveNullEffect(nullItemID: NullItemID): void;
  HasCollectibleEffect(collectibleType: int): boolean;
  HasTrinketEffect(trinketType: int): boolean;
  HasNullEffect(nullItemID: NullItemID): boolean;
  GetCollectibleEffect(collectibleType: int): Readonly<TemporaryEffect>;
  GetTrinketEffect(trinketType: int): Readonly<TemporaryEffect>;
  GetNullEffect(nullItemID: NullItemID): Readonly<TemporaryEffect>;
  GetCollectibleEffectNum(collectibleType: int): int;
  GetTrinketEffectNum(trinketType: int): int;
  GetNullEffectNum(nullItemID: NullItemID): int;
  ClearEffects(): void;
  GetEffectsList(): Readonly<EffectList>;
}
