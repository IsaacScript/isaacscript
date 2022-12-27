import { CollectibleType, TrinketType } from "../../enums/collections/subTypes";
import { CacheFlag } from "../../enums/flags/CacheFlag";
import { ItemConfigTag } from "../../enums/flags/ItemConfigTag";
import { ItemConfigChargeType } from "../../enums/ItemConfigChargeType";
import { ItemType } from "../../enums/ItemType";
import { NullItemID } from "../../enums/NullItemID";

declare global {
  interface ItemConfigItem extends IsaacAPIClass {
    /**
     * Used to check if a collectible or trinket has an item tag, such as "offensive" or
     * "monstermanual". These tags can be found in the "items_metadata.xml" file.
     *
     * @param tags The composition of one or more `ItemConfigTag`.
     */
    HasTags(tags: ItemConfigTag): boolean;

    IsAvailable(): boolean;
    IsCollectible(): this is ItemConfigItemCollectible;
    IsNull(): this is ItemConfigItemNull;
    IsTrinket(): this is ItemConfigItemTrinket;

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
     */
    CraftingQuality: int;

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

    InitCharge: int;
    MaxCharges: int;
    MaxCooldown: int;
    Name: string;
    PassiveCache: boolean;
    PersistentEffect: boolean;
    Quality: int;
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
