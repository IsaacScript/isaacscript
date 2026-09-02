import type {
  CardType,
  CollectibleType,
  PillColor,
  TrinketType,
} from "../../enums/collections/subTypes";
import type { ItemPoolType } from "../../enums/ItemPoolType";
import type { PillEffect } from "../../enums/PillEffect";
import type { RoomType } from "../../enums/RoomType";

declare global {
  interface ItemPool extends IsaacAPIClass {
    readonly AddBibleUpgrade: (add: int, itemPoolType: ItemPoolType) => void;
    readonly AddRoomBlacklist: (collectibleType: CollectibleType) => void;
    readonly ForceAddPillEffect: (pillEffect: PillEffect) => PillColor;

    readonly GetCard: (
      seed: Seed,
      playing: boolean,
      rune: boolean,
      onlyRunes: boolean,
    ) => CardType;

    /**
     * @param itemPoolType
     * @param decrease Default is false.
     * @param seed Default is `Random()`.
     * @param defaultItem Default is `CollectibleType.NULL`.
     * @param backupItemPoolType Default is `ItemPoolType.POOL_NULL`. This parameter was added in
     *                           Repentance+.
     */
    readonly GetCollectible: (
      itemPoolType: ItemPoolType,
      decrease?: boolean,
      seed?: Seed,
      defaultItem?: CollectibleType,
      backupItemPoolType?: ItemPoolType,
    ) => CollectibleType;

    readonly GetLastPool: () => ItemPoolType;
    readonly GetPill: (seed: Seed) => PillColor;

    /**
     * Will return the pill effect that corresponds to the passed pill color. This will work
     * properly even if the player has not yet identified the pill color (by using one or more pills
     * of that color). It is recommended to always pass the corresponding player because if a player
     * has Lucky Foot, PHD, Virgo, or False PHD, the resolved pill effect will change from what was
     * assigned by default at the beginning of the run.
     *
     * Returns -1 if passed `PillColor.NULL` (0) or a value of 2048. Returns `PillEffect.BAD_GAS`
     * (0) if passed an invalid pill color (e.g. 15 through 2047 or 2063+).
     *
     * @param pillColor
     * @param player Default is undefined.
     */
    readonly GetPillEffect: (
      pillColor: PillColor,
      player?: EntityPlayer,
    ) => PillEffect | -1;

    /**
     * Note that this function will return `ItemPoolType.NULL` (-1) for `RoomType.DEFAULT` (1),
     * which may be unexpected.
     *
     * @param roomType
     * @param seed
     */
    readonly GetPoolForRoom: (roomType: RoomType, seed: Seed) => ItemPoolType | -1;

    /** @param dontAdvanceRNG Default is false. */
    readonly GetTrinket: (dontAdvanceRNG?: boolean) => TrinketType;

    readonly IdentifyPill: (pillColor: PillColor) => void;

    /**
     * Once the player takes PHD, Virgo, or False PHD, this method will always return true, even if
     * the player has not already seen or used the pill on the run thus far. (This is because this
     * method dictates when the "???" text should be shown as the pill description, and these
     * collectibles will always show the "revealed" text.)
     */
    readonly IsPillIdentified: (pillColor: PillColor) => boolean;

    readonly RemoveCollectible: (collectibleType: CollectibleType) => boolean;

    /**
     * Note that if the trinket pool becomes empty, the game will refill it with all trinkets. Thus,
     * even if you remove a trinket from the trinket pool, it is possible for players to get that
     * trinket if they break the game and cycle through every other trinket.
     *
     * For this reason, if you want to permanently prevent a trinket from appearing, then you must
     * monitor for it appearing using a callback.
     */
    readonly RemoveTrinket: (trinketType: TrinketType) => boolean;

    readonly ResetRoomBlacklist: () => void;
    readonly ResetTrinkets: () => void;
  }
}
