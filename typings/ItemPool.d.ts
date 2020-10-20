declare class ItemPool {
  GetCollectible(itemPoolType: ItemPoolType, decrease: boolean, seed: int): CollectibleType;
  RemoveCollectible(collectibleType: CollectibleType): boolean;
  RemoveTrinket(trinketType: TrinketType): boolean;
  ResetTrinkets(): void;
  GetTrinket(): TrinketType;
  GetCard(seed: int, playing: boolean, rune: boolean, onlyRunes: boolean): Card;
  GetPill(seed: int): PillColor;
  GetPillEffect(pillColor: PillColor): PillEffect;
  IdentifyPill(pillColor: PillColor): void;
  IsPillIdentified(pillColor: PillColor): boolean;
  ForceAddPillEffect(pillEffect: PillEffect): PillColor;
  GetLastPool(): ItemPoolType;
  GetPoolForRoom(roomType: RoomType, seed: int): ItemPoolType;
  ResetRoomBlacklist(): void;
  AddRoomBlacklist(collectibleType: CollectibleType): void;
  AddBibleUpgrade(add: int, itemPoolType: ItemPoolType): void;
}
