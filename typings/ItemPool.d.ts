declare class ItemPool {
  GetCollectible(itemPoolType: ItemPoolType, decrease: boolean, seed: int): CollectibleType | int;
  RemoveCollectible(collectibleType: CollectibleType | int): boolean;
  RemoveTrinket(trinketType: TrinketType | int): boolean;
  ResetTrinkets(): void;
  GetTrinket(): TrinketType | int;
  GetCard(seed: int, playing: boolean, rune: boolean, onlyRunes: boolean): Card | int;
  GetPill(seed: int): PillColor | int;
  GetPillEffect(pillColor: PillColor | int): PillEffect | int;
  IdentifyPill(pillColor: PillColor | int): void;
  IsPillIdentified(pillColor: PillColor | int): boolean;
  ForceAddPillEffect(pillEffect: PillEffect | int): PillColor | int;
  GetLastPool(): ItemPoolType;
  GetPoolForRoom(roomType: RoomType, seed: int): ItemPoolType;
  ResetRoomBlacklist(): void;
  AddRoomBlacklist(collectibleType: CollectibleType | int): void;
  AddBibleUpgrade(add: int, itemPoolType: ItemPoolType): void;
}
