declare class TemporaryEffects {
  AddCollectibleEffect(
    collectibleType: CollectibleType | int,
    addCostume?: boolean, // Default is true
    count?: int, // Default is 1
  ): void;
  AddNullEffect(
    nullItemID: NullItemID,
    addCostume: boolean,
    count?: int, // Default is 1
  ): void;
  AddTrinketEffect(
    trinketType: TrinketType | int,
    addCostume: boolean,
    count?: int, // Default is 1
  ): void;
  ClearEffects(): void;
  GetCollectibleEffect(
    collectibleType: CollectibleType | int,
  ): Readonly<TemporaryEffect>;
  GetCollectibleEffectNum(collectibleType: CollectibleType | int): int;
  GetEffectsList(): Readonly<EffectList>;
  GetNullEffect(nullItemID: NullItemID): Readonly<TemporaryEffect>;
  GetNullEffectNum(nullItemID: NullItemID): int;
  GetTrinketEffect(trinketType: TrinketType | int): Readonly<TemporaryEffect>;
  GetTrinketEffectNum(trinketType: TrinketType | int): int;
  HasCollectibleEffect(collectibleType: CollectibleType | int): boolean;
  HasNullEffect(nullItemID: NullItemID): boolean;
  HasTrinketEffect(trinketType: TrinketType | int): boolean;
  RemoveCollectibleEffect(
    collectibleType: CollectibleType | int,
    count?: int, // Default is 1, use -1 to remove all instances
  ): void;
  RemoveNullEffect(
    nullItemID: NullItemID,
    count?: int, // Default is 1, use -1 to remove all instances
  ): void;
  RemoveTrinketEffect(
    trinketType: TrinketType | int,
    count?: int, // Default is 1, use -1 to remove all instances
  ): void;
}
