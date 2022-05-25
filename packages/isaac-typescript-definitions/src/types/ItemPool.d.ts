import {
  Card,
  CollectibleType,
  PillColor,
  TrinketType,
} from "../enums/collections/subTypes";
import { ItemPoolType } from "../enums/ItemPoolType";
import { PillEffect } from "../enums/PillEffect";
import { RoomType } from "../enums/RoomType";

declare interface ItemPool {
  AddBibleUpgrade(add: int, itemPoolType: ItemPoolType): void;
  AddRoomBlacklist(collectibleType: CollectibleType): void;
  ForceAddPillEffect(pillEffect: PillEffect): PillColor;

  GetCard(
    seed: Seed,
    playing: boolean,
    rune: boolean,
    onlyRunes: boolean,
  ): Card;

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

  GetPoolForRoom(roomType: RoomType, seed: Seed): ItemPoolType;

  /**
   * @param dontAdvanceRNG Default is false.
   */
  GetTrinket(dontAdvanceRNG?: boolean): TrinketType;

  IdentifyPill(pillColor: PillColor): void;
  IsPillIdentified(pillColor: PillColor): boolean;
  RemoveCollectible(collectibleType: CollectibleType): boolean;
  RemoveTrinket(trinketType: TrinketType): boolean;
  ResetRoomBlacklist(): void;
  ResetTrinkets(): void;
}
