import type {
  BatterySubType,
  BombSubType,
  CardType,
  CoinSubType,
  CollectibleType,
  HeartSubType,
  KeySubType,
  PickupNullSubType,
  PillColor,
  PoopPickupSubType,
  SackSubType,
  TrinketType,
} from "../../enums/collections/subTypes";
import type { PickupVariant } from "../../enums/collections/variants";
import type { EntityType } from "../../enums/EntityType";

declare global {
  interface EntityPickup extends Entity {
    AppearFast: () => void;
    CanReroll: () => boolean;
    GetCoinValue: () => int;
    IsShopItem: () => boolean;

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
    Morph: (
      entityType: EntityType,
      variant: int,
      subType: int,
      keepPrice?: boolean,
      keepSeed?: boolean,
      ignoreModifiers?: boolean,
    ) => void;

    PlayDropSound: () => void;
    PlayPickupSound: () => void;

    /** @param player Default is undefined. */
    TryOpenChest: (player?: EntityPlayer) => boolean;

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
     * The price can be from 0 to 99 or a special negative value. Special kinds of prices (like
     * Devil Deal prices) are represented by the `PickupPrice` enum (which contain negative values).
     */
    Price: int;

    /**
     * If in a shop, this value describes which slot the item is for sale in. For example, if the
     * shop has 6 things for sale, the pickups in the room will have shop item IDs of 0, 1, 2, 3, 4,
     * and 5.
     *
     * When spawning a new collectible item, `ShopItemId` will be 0 by default. This has a side
     * effect of making the D6 roll the collectible into a red heart. By setting shop item id to -1,
     * it will fix this behavior such that the collectible will properly roll into another
     * collectible. However, non-collectible pickups may reroll into collectibles through a D20 or
     * similar.
     *
     * By setting shop item id to -2, automatic prices will be devil deal prices. Otherwise this is
     * identical to -1.
     *
     * Other negative values act identically to -1.
     */
    ShopItemId: int;

    State: int;
    Timeout: int;
    Touched: boolean;
    Variant: PickupVariant;

    /**
     * Used with collectibles to enforce a period of time where the player will not automatically
     * pick up the collectible. New collectibles spawn with a `Wait` value of 20 (which corresponds
     * to 20 game frames). The value will automatically decrement as game frames pass.
     *
     * It is unknown whether this value is used for pickups other than collectibles.
     */
    Wait: int;
  }

  /** For `PickupVariant.NULL` (0). */
  interface EntityPickupNull extends EntityPickup {
    SubType: PickupNullSubType;
    Variant: PickupVariant.NULL;
  }

  /** For `PickupVariant.HEART` (10). */
  interface EntityPickupHeart extends EntityPickup {
    SubType: HeartSubType;
    Variant: PickupVariant.HEART;
  }

  /** For `PickupVariant.COIN` (20). */
  interface EntityPickupCoin extends EntityPickup {
    SubType: CoinSubType;
    Variant: PickupVariant.COIN;
  }

  /** For `PickupVariant.KEY` (30). */
  interface EntityPickupKey extends EntityPickup {
    SubType: KeySubType;
    Variant: PickupVariant.KEY;
  }

  /** For `PickupVariant.BOMB` (40). */
  interface EntityPickupBomb extends EntityPickup {
    SubType: BombSubType;
    Variant: PickupVariant.BOMB;
  }

  /** For `PickupVariant.POOP` (42). */
  interface EntityPickupPoop extends EntityPickup {
    SubType: PoopPickupSubType;
    Variant: PickupVariant.POOP;
  }

  /** For `PickupVariant.SACK` (69). */
  interface EntityPickupSack extends EntityPickup {
    SubType: SackSubType;
    Variant: PickupVariant.SACK;
  }

  /** For `PickupVariant.PILL` (70). */
  interface EntityPickupPill extends EntityPickup {
    SubType: PillColor;
    Variant: PickupVariant.PILL;
  }

  /** For `PickupVariant.LIL_BATTERY` (90). */
  interface EntityPickupBattery extends EntityPickup {
    SubType: BatterySubType;
    Variant: PickupVariant.LIL_BATTERY;
  }

  /** For `PickupVariant.COLLECTIBLE` (100). */
  interface EntityPickupCollectible extends EntityPickup {
    SubType: CollectibleType;
    Variant: PickupVariant.COLLECTIBLE;
  }

  /** For `PickupVariant.CARD` (300). */
  interface EntityPickupCard extends EntityPickup {
    SubType: CardType;
    Variant: PickupVariant.CARD;
  }

  /** For `PickupVariant.TRINKET` (350). */
  interface EntityPickupTrinket extends EntityPickup {
    SubType: TrinketType;
    Variant: PickupVariant.TRINKET;
  }
}
