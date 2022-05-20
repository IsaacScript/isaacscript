import {
  BatterySubType,
  BombSubType,
  Card,
  CoinSubType,
  CollectibleType,
  HeartSubType,
  KeySubType,
  PillColor,
  PoopPickupSubType,
  SackSubType,
  TrinketType,
} from "../enums/collections/subTypes";
import { PickupVariant } from "../enums/collections/variants";
import { EntityType } from "../enums/EntityType";
import { PickupPrice } from "../enums/PickupPrice";

declare global {
  interface EntityPickup extends Entity {
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
     *                 it. Default is false.
     * @param ignoreModifiers If set to true, ignores item effects that might turn this pickup into
     *                        something other than the specified variant and subtype. Default is
     *                        false.
     */
    Morph(
      entityType: EntityType,
      variant: int,
      subType: int,
      keepPrice?: boolean,
      keepSeed?: boolean,
      ignoreModifiers?: boolean,
    ): void;

    PlayDropSound(): void;
    PlayPickupSound(): void;

    /**
     * @param player Default is undefined.
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

    /**
     * The price can be from 0 to 99. Special kinds of prices (like Devil Deal prices) are
     * represented by the `PickupPrice` enum.
     */
    Price: int | PickupPrice;

    ShopItemId: int;
    State: int;
    Timeout: int;
    Touched: boolean;
    Variant: PickupVariant;
    Wait: int;
  }

  /** For PickupVariant.HEART (10) */
  interface EntityPickupHeart extends EntityPickup {
    SubType: HeartSubType;
    Variant: PickupVariant.HEART;
  }

  /** For PickupVariant.COIN (20) */
  interface EntityPickupCoin extends EntityPickup {
    SubType: CoinSubType;
    Variant: PickupVariant.COIN;
  }

  /** For PickupVariant.KEY (30) */
  interface EntityPickupKey extends EntityPickup {
    SubType: KeySubType;
    Variant: PickupVariant.KEY;
  }

  /** For PickupVariant.BOMB (40) */
  interface EntityPickupBomb extends EntityPickup {
    SubType: BombSubType;
    Variant: PickupVariant.BOMB;
  }

  /** For PickupVariant.POOP (42) */
  interface EntityPickupPoop extends EntityPickup {
    SubType: PoopPickupSubType;
    Variant: PickupVariant.POOP;
  }

  /** For PickupVariant.SACK (69) */
  interface EntityPickupSack extends EntityPickup {
    SubType: SackSubType;
    Variant: PickupVariant.SACK;
  }

  /** For PickupVariant.PILL (70) */
  interface EntityPickupPill extends EntityPickup {
    SubType: PillColor;
    Variant: PickupVariant.PILL;
  }

  /** For PickupVariant.LIL_BATTERY (90) */
  interface EntityPickupBattery extends EntityPickup {
    SubType: BatterySubType;
    Variant: PickupVariant.LIL_BATTERY;
  }

  /** For PickupVariant.COLLECTIBLE (100) */
  interface EntityPickupCollectible extends EntityPickup {
    SubType: CollectibleType;
    Variant: PickupVariant.COLLECTIBLE;
  }

  /** For PickupVariant.TAROT_CARD (300) */
  interface EntityPickupCard extends EntityPickup {
    SubType: Card;
    Variant: PickupVariant.TAROT_CARD;
  }

  /** For PickupVariant.TRINKET (350) */
  interface EntityPickupTrinket extends EntityPickup {
    SubType: TrinketType;
    Variant: PickupVariant.TRINKET;
  }
}
