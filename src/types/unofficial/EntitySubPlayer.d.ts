import { Card, CollectibleType } from "../../enums/collections/subTypes";

/**
 * This is a "fake" interface used to represent an `EntityPlayer` class returned from the
 * `EntityPlayer.GetSubPlayer` method. The `EntityPlayer.IsSubPlayer` method should always return
 * true for these types of objects.
 */
declare interface EntitySubPlayer extends EntityPlayer {
  /**
   * The RNG returned by the `EntitySubPlayer.GetCardRNG` method will not match the RNG for the real
   * player, so it should never be used. Instead, use the `getSubPlayerParent` helper function to
   * get the "parent" player, and call `GetCardRNG` from that.
   */
  GetCardRNG(card: Card | int): never;

  /**
   * The RNG returned by the `EntitySubPlayer.GetCollectibleRNG` method will not match the RNG for
   * the real player, so it should never be used. Instead, use the `getSubPlayerParent` helper
   * function to get the "parent" player, and call `GetCollectibleRNG` from that.
   */
  GetCollectibleRNG(collectibleType: CollectibleType | int): never;

  /**
   * This will always return undefined if you call it on a sub-player. Instead, use the
   * `getSubPlayerParent` helper function to get the "parent" player.
   */
  GetSubPlayer(): never;
}
