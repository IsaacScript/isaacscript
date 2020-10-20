declare class EntityPickup extends Entity {
  Morph(entityType: EntityType, variant: EntityVariantForAC, subType: int, keepPrice: boolean): void;
  IsShopItem(): boolean;
  GetCoinValue(): int;
  PlayDropSound(): void;
  PlayPickupSound(): void;
  CanReroll(): boolean;
  AppearFast(): void;
  TryOpenChest(): boolean;

  Charge: int;
  Price: int;
  Timeout: int;
  Touched: boolean;
  ShopItemId: int;
  TheresOptionsPickup: boolean;
  Wait: int;
  AutoUpdatePrice: boolean;
  State: int;
}
