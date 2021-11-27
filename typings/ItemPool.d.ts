declare interface ItemPool {
  AddBibleUpgrade(add: int, itemPoolType: ItemPoolType): void;
  AddRoomBlacklist(collectibleType: CollectibleType | int): void;
  ForceAddPillEffect(pillEffect: PillEffect | int): PillColor | int;

  GetCard(
    seed: int,
    playing: boolean,
    rune: boolean,
    onlyRunes: boolean,
  ): Card | int;

  /**
   * @param itemPoolType
   * @param decrease Default is false.
   * @param seed Default is Random().
   * @param defaultItem Default is CollectibleType.COLLECTIBLE_NULL.
   */
  GetCollectible(
    itemPoolType: ItemPoolType,
    decrease?: boolean,
    seed?: int,
    defaultItem?: CollectibleType,
  ): CollectibleType | int;

  GetLastPool(): ItemPoolType;
  GetPill(seed: int): PillColor | int;

  /**
   * @param pillColor
   * @param player Default is undefined.
   */
  GetPillEffect(
    pillColor: PillColor | int,
    player?: EntityPlayer,
  ): PillEffect | int;

  GetPoolForRoom(roomType: RoomType, seed: int): ItemPoolType;

  /**
   * @param dontAdvanceRNG Default is false.
   */
  GetTrinket(dontAdvanceRNG?: boolean): TrinketType | int;

  IdentifyPill(pillColor: PillColor | int): void;
  IsPillIdentified(pillColor: PillColor | int): boolean;
  RemoveCollectible(collectibleType: CollectibleType | int): boolean;
  RemoveTrinket(trinketType: TrinketType | int): boolean;
  ResetRoomBlacklist(): void;
  ResetTrinkets(): void;
}
