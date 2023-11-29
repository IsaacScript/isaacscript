import type {
  CollectibleType,
  TrinketType,
} from "../../enums/collections/subTypes";
import type { CacheFlag } from "../../enums/flags/CacheFlag";
import type { ItemConfigTag } from "../../enums/flags/ItemConfigTag";
import type { ItemConfigChargeType } from "../../enums/ItemConfigChargeType";
import type { ItemType } from "../../enums/ItemType";
import type { NullItemID } from "../../enums/NullItemID";

declare global {
  interface ItemConfigItem extends IsaacAPIClass {
    /**
     * Used to check if a collectible or trinket has an item tag, such as "offensive" or
     * "monstermanual". These tags can be found in the "items_metadata.xml" file.
     *
     * @param tags The composition of one or more `ItemConfigTag`.
     */
    HasTags: (tags: ItemConfigTag) => boolean;

    IsAvailable: () => boolean;
    IsCollectible: () => this is ItemConfigItemCollectible;
    IsNull: () => this is ItemConfigItemNull;
    IsTrinket: () => this is ItemConfigItemTrinket;

    AchievementID: int;
    AddBlackHearts: int;
    AddBombs: int;
    AddCoins: int;
    AddCostumeOnPickup: boolean;
    AddHearts: int;
    AddKeys: int;
    AddMaxHearts: int;
    AddSoulHearts: int;
    CacheFlags: BitFlags<CacheFlag>;
    ChargeType: ItemConfigChargeType;
    ClearEffectsOnRemove: boolean;
    readonly Costume: Readonly<ItemConfigCostume>;

    /**
     * The item's quality for the Bag of Crafting algorithm. Possible values are -1, 0, 1, 2, 3, and
     * 4. A value of -1 indicates that the item is disabled from being craftable.
     *
     * @see https://bindingofisaacrebirth.fandom.com/wiki/Bag_of_Crafting
     */
    CraftingQuality: -1 | 0 | 1 | 2 | 3 | 4;

    Description: string;
    DevilPrice: int;
    Discharged: boolean;

    /**
     * This field is misnamed. It is not the file name, but rather the full path to the PNG file for
     * this collectible/trinket. For example:
     * gfx/items/collectibles/Collectibles_001_TheSadOnion.png
     */
    GfxFileName: string;

    Hidden: boolean;

    /**
     * If it is a collectible, then this is the `CollectibleType`. If it is a trinket, then this is
     * the `TrinketType`. If it is a null item, then it is the `NullItemID`.
     */
    ID: CollectibleType | TrinketType | NullItemID;

    /**
     * The initial amount of charges that an active collectible has. In most cases, when picking up
     * an active collectible for the first time, it will be fully charged, which corresponds to an
     * `InitCharge` value of -1. However, in some cases, this may be different. For example, Eden's
     * Soul starts without any charges, so it has an `InitCharge` value of 0.
     *
     * `InitCharge` is always equal to -1 for non-active collectibles.
     */
    InitCharge: int;

    MaxCharges: int;
    MaxCooldown: int;
    Name: string;
    PassiveCache: boolean;
    PersistentEffect: boolean;

    /**
     * How good the collectible is considered to be by the game. Possible values are 0, 1, 2, 3, and
     * 4.
     *
     * @see https://bindingofisaacrebirth.fandom.com/wiki/Item_Quality
     */
    Quality: Quality;

    ShopPrice: int;
    Special: boolean;
    Tags: BitFlags<ItemConfigTag>;
    Type: ItemType;
  }

  interface ItemConfigItemCollectible extends ItemConfigItem {
    ID: CollectibleType;
  }

  interface ItemConfigItemTrinket extends ItemConfigItem {
    ID: TrinketType;
  }

  interface ItemConfigItemNull extends ItemConfigItem {
    ID: NullItemID;
  }
}
