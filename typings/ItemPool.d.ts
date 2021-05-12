declare class ItemPool {
  AddBibleUpgrade(add: int, itemPoolType: ItemPoolType): void;
  AddRoomBlacklist(collectibleType: CollectibleType | int): void;
  ForceAddPillEffect(pillEffect: PillEffect | int): PillColor | int;
  GetCard(
    seed: int,
    playing: boolean,
    rune: boolean,
    onlyRunes: boolean,
  ): Card | int;
  GetCollectible(
    itemPoolType: ItemPoolType,
    decrease?: boolean, // Default is false
    seed?: int, // Default is Random()
    defaultItem?: CollectibleType, // Default is CollectibleType.COLLECTIBLE_NULL
  ): CollectibleType | int;
  GetLastPool(): ItemPoolType;
  GetPill(seed: int): PillColor | int;
  GetPillEffect(
    pillColor: PillColor | int,
    player?: EntityPlayer, // Default is nil
  ): PillEffect | int;
  GetPoolForRoom(roomType: RoomType, seed: int): ItemPoolType;
  GetTrinket(dontAdvanceRNG?: boolean): TrinketType | int; // Default is false
  IdentifyPill(pillColor: PillColor | int): void;
  IsPillIdentified(pillColor: PillColor | int): boolean;
  RemoveCollectible(collectibleType: CollectibleType | int): boolean;
  RemoveTrinket(trinketType: TrinketType | int): boolean;
  ResetRoomBlacklist(): void;
  ResetTrinkets(): void;
}
