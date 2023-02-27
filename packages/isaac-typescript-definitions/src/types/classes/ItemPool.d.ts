import {
  CardType,
  CollectibleType,
  PillColor,
  TrinketType,
} from "../../enums/collections/subTypes";
import { ItemPoolType } from "../../enums/ItemPoolType";
import { PillEffect } from "../../enums/PillEffect";
import { RoomType } from "../../enums/RoomType";

declare global {
  interface ItemPool extends IsaacAPIClass {
    AddBibleUpgrade(add: int, itemPoolType: ItemPoolType): void;
    AddRoomBlacklist(collectibleType: CollectibleType): void;
    ForceAddPillEffect(pillEffect: PillEffect): PillColor;

    GetCard(
      seed: Seed,
      playing: boolean,
      rune: boolean,
      onlyRunes: boolean,
    ): CardType;

    /**
     * @param itemPoolType
     * @param decrease Default is false.
     * @param seed Default is `Random()`.
     * @param defaultItem Default is `CollectibleType.NULL`.
     */
    GetCollectible(
      itemPoolType: ItemPoolType,
      decrease?: boolean,
      seed?: Seed,
      defaultItem?: CollectibleType,
    ): CollectibleType;

    GetLastPool(): ItemPoolType;
    GetPill(seed: Seed): PillColor;

    /**
     * @param pillColor
     * @param player Default is undefined.
     */
    GetPillEffect(pillColor: PillColor, player?: EntityPlayer): PillEffect;

    /**
     * Note that this function will return `ItemPoolType.NULL` for `RoomType.DEFAULT`, which may be
     * unexpected.
     *
     * @param roomType
     * @param seed
     */
    GetPoolForRoom(roomType: RoomType, seed: Seed): ItemPoolType;

    /** @param dontAdvanceRNG Default is false. */
    GetTrinket(dontAdvanceRNG?: boolean): TrinketType;

    IdentifyPill(pillColor: PillColor): void;

    /**
     * Once the player takes PHD, Virgo, or False PHD, this method will always return true, even if
     * the player has not already seen or used the pill on the run thus far. (This is because this
     * method dictates when the "???" text should be shown as the pill description, and these
     * collectibles will always show the "revealed" text.)
     */
    IsPillIdentified(pillColor: PillColor): boolean;

    RemoveCollectible(collectibleType: CollectibleType): boolean;

    /**
     * Note that if the trinket pool becomes empty, the game will refill it with all trinkets. Thus,
     * even if you remove a trinket from the trinket pool, it is possible for players to get that
     * trinket if they break the game and cycle through every other trinket.
     *
     * For this reason, if you want to permanently prevent a trinket from appearing, then you must
     * monitor for it appearing using a callback.
     */
    RemoveTrinket(trinketType: TrinketType): boolean;

    ResetRoomBlacklist(): void;
    ResetTrinkets(): void;
  }
}
