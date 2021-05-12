declare class EntityPickup extends Entity {
  AppearFast(): void;
  CanReroll(): boolean;
  GetCoinValue(): int;
  IsShopItem(): boolean;
  /**
   * @param entityType
   * @param variant
   * @param subType
   * @param keepPrice
   * @param keepSeed If set to true, keeps the initial RNG seed of the pickup instead of rerolling
   * it.
   * @param ignoreModifiers If set to true, ignores item effects that might turn this pickup into
   * something other than the specified variant and subtype.
   */
  Morph(
    entityType: EntityType | int,
    variant: EntityVariantForAC,
    subType: int,
    keepPrice?: boolean, // Default is false
    keepSeed?: boolean, // Default is false
    ignoreModifiers?: boolean, // Default is false
  ): void;
  PlayDropSound(): void;
  PlayPickupSound(): void;
  TryOpenChest(
    player?: EntityPlayer, // Default is nil
  ): boolean;

  AutoUpdatePrice: boolean;
  Charge: int;
  Price: int;
  ShopItemId: int;
  State: int;
  TheresOptionsPickup: boolean;
  Timeout: int;
  Touched: boolean;
  Wait: int;
}
