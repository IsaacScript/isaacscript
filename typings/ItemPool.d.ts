declare class ItemPool {
  GetCollectible(itemPoolType: ItemPoolType, decrease: boolean, seed: int): int;
  RemoveCollectible(collectibleType: int): boolean;
  RemoveTrinket(trinketType: int): boolean;
  ResetTrinkets(): void;
  GetTrinket(): int;
  GetCard(seed: int, playing: boolean, rune: boolean, onlyRunes: boolean): int;
  GetPill(seed: int): int;
  GetPillEffect(pillColor: int): int;
  IdentifyPill(pillColor: int): void;
  IsPillIdentified(pillColor: int): boolean;
  ForceAddPillEffect(pillEffect: int): int;
  GetLastPool(): ItemPoolType;
  GetPoolForRoom(roomType: RoomType, seed: int): ItemPoolType;
  ResetRoomBlacklist(): void;
  AddRoomBlacklist(collectibleType: int): void;
  AddBibleUpgrade(add: int, itemPoolType: ItemPoolType): void;
}
