declare class EntityPickup extends Entity {
  AppearFast(): void;
  CanReroll(): boolean;
  GetCoinValue(): int;
  IsShopItem(): boolean;
  /**
   * @param entityType
   * @param variant
   * @param subType
   * @param keepPrice Default is false.
   * @param keepSeed If set to true, keeps the initial RNG seed of the pickup instead of rerolling
   * it. Default is false.
   * @param ignoreModifiers If set to true, ignores item effects that might turn this pickup into
   * something other than the specified variant and subtype. Default is false.
   */
  Morph(
    entityType: EntityType | int,
    variant: EntityVariantForAC,
    subType: int,
    keepPrice?: boolean,
    keepSeed?: boolean,
    ignoreModifiers?: boolean,
  ): void;
  PlayDropSound(): void;
  PlayPickupSound(): void;
  /**
   * @param player Default is nil.
   */
  TryOpenChest(player?: EntityPlayer): boolean;

  AutoUpdatePrice: boolean;
  Charge: int;
  /**
   * Any non-zero value causes the item to form an option group with any other item with the same
   * OptionsPickupIndex value.
   *
   * When an item belonging to an option group is picked up, all other items belonging to the same
   * group disappear.
   *
   * 0 is the default value and means the item doesn't belong to any group.
   */
  OptionsPickupIndex: int;
  Price: int;
  ShopItemId: int;
  State: int;
  Timeout: int;
  Touched: boolean;
  Wait: int;
}
