declare class TemporaryEffects {
  AddCollectibleEffect(
    collectibleType: CollectibleType | int,
    addCostume: boolean,
  ): void;
  AddTrinketEffect(trinketType: TrinketType | int, addCostume: boolean): void;
  AddNullEffect(nullItemID: NullItemID, addCostume: boolean): void;
  RemoveCollectibleEffect(collectibleType: CollectibleType | int): void;
  RemoveTrinketEffect(trinketType: TrinketType | int): void;
  RemoveNullEffect(nullItemID: NullItemID): void;
  HasCollectibleEffect(collectibleType: CollectibleType | int): boolean;
  HasTrinketEffect(trinketType: TrinketType | int): boolean;
  HasNullEffect(nullItemID: NullItemID): boolean;
  GetCollectibleEffect(
    collectibleType: CollectibleType | int,
  ): Readonly<TemporaryEffect>;
  GetTrinketEffect(trinketType: TrinketType | int): Readonly<TemporaryEffect>;
  GetNullEffect(nullItemID: NullItemID): Readonly<TemporaryEffect>;
  GetCollectibleEffectNum(collectibleType: CollectibleType | int): int;
  GetTrinketEffectNum(trinketType: TrinketType | int): int;
  GetNullEffectNum(nullItemID: NullItemID): int;
  ClearEffects(): void;
  GetEffectsList(): Readonly<EffectList>;
}
