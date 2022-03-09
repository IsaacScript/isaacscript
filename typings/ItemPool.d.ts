declare interface ItemPool {
  AddBibleUpgrade(add: int, itemPoolType: ItemPoolType): void;
  AddRoomBlacklist(collectibleType: CollectibleType | int): void;
  ForceAddPillEffect(pillEffect: PillEffect | int): PillColor;

  GetCard(
    seed: Seed,
    playing: boolean,
    rune: boolean,
    onlyRunes: boolean,
  ): Card | int;

  /**
   * @param itemPoolType
   * @param decrease Default is false.
   * @param seed Default is `Random()`.
   * @param defaultItem Default is `CollectibleType.COLLECTIBLE_NULL`.
   */
  GetCollectible(
    itemPoolType: ItemPoolType,
    decrease?: boolean,
    seed?: Seed,
    defaultItem?: CollectibleType,
  ): CollectibleType | int;

  GetLastPool(): ItemPoolType;
  GetPill(seed: Seed): PillColor;

  /**
   * @param pillColor
   * @param player Default is undefined.
   */
  GetPillEffect(pillColor: PillColor, player?: EntityPlayer): PillEffect | int;

  GetPoolForRoom(roomType: RoomType, seed: Seed): ItemPoolType;

  /**
   * @param dontAdvanceRNG Default is false.
   */
  GetTrinket(dontAdvanceRNG?: boolean): TrinketType | int;

  IdentifyPill(pillColor: PillColor): void;
  IsPillIdentified(pillColor: PillColor): boolean;
  RemoveCollectible(collectibleType: CollectibleType | int): boolean;
  RemoveTrinket(trinketType: TrinketType | int): boolean;
  ResetRoomBlacklist(): void;
  ResetTrinkets(): void;
}
