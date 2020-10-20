declare class TemporaryEffects {
  AddCollectibleEffect(collectibleType: CollectibleType, addCostume: boolean): void;
  AddTrinketEffect(trinketType: TrinketType, addCostume: boolean): void;
  AddNullEffect(nullItemID: NullItemID, addCostume: boolean): void;
  RemoveCollectibleEffect(collectibleType: CollectibleType): void;
  RemoveTrinketEffect(trinketType: TrinketType): void;
  RemoveNullEffect(nullItemID: NullItemID): void;
  HasCollectibleEffect(collectibleType: CollectibleType): boolean;
  HasTrinketEffect(trinketType: TrinketType): boolean;
  HasNullEffect(nullItemID: NullItemID): boolean;
  GetCollectibleEffect(collectibleType: CollectibleType): Readonly<TemporaryEffect>;
  GetTrinketEffect(trinketType: TrinketType): Readonly<TemporaryEffect>;
  GetNullEffect(nullItemID: NullItemID): Readonly<TemporaryEffect>;
  GetCollectibleEffectNum(collectibleType: CollectibleType): int;
  GetTrinketEffectNum(trinketType: TrinketType): int;
  GetNullEffectNum(nullItemID: NullItemID): int;
  ClearEffects(): void;
  GetEffectsList(): Readonly<EffectList>;
}
