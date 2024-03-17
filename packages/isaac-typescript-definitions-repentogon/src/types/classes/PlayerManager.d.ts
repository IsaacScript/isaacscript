import type {
  CollectibleType,
  PlayerType,
  TrinketType,
} from "isaac-typescript-definitions";

declare global {
  /**
   * Many of these methods are already provided in `isaacscript-common`. However, if you are using
   * Repentogon it may be a better idea to use these methods whenever possible as they interact with
   * the engine directly and are more reliable.
   *
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace PlayerManager {
    /** Returns whether any player currently has the provided `CollectibleType`. */
    function AnyoneHasCollectible(collectible: CollectibleType): boolean;

    /** Returns whether any player currently has the provided `TrinketType`. */
    function AnyoneHasTrinket(trinket: TrinketType): boolean;

    /** Returns whether any player's type matches the provided `PlayerType`. */
    function AnyoneIsPlayerType(playerType: PlayerType): boolean;

    /**
     * Returns whether any player whose type is the provided `PlayerType` currently has the
     * Birthright collectible.
     */
    function AnyPlayerTypeHasBirthright(playerType: PlayerType): boolean;

    /**
     * Returns the first player who picked up the provided `CollectibleType` for the first time in
     * the current run. Returns undefined if the collectible has not been picked up yet.
     *
     * @param collectible
     * @param lazarusSharedGlobalTag Optional. Default is true.
     */
    function FirstCollectibleOwner(
      collectible: CollectibleType,
      lazarusSharedGlobalTag?: boolean,
    ): EntityPlayer | undefined;

    /**
     * Returns the first player who spawned in with a type matching the specified `PlayerType`.
     * Returns undefined if no players spawned in with the specified `PlayerType`.
     */
    function FirstPlayerByType(
      playerType: PlayerType,
    ): EntityPlayer | undefined;

    /**
     * Returns the first player who picked up the provided `TrinketType` for the first time in the
     * current run. Returns undefined if the trinket has not been picked up yet.
     *
     * @param trinket
     * @param rng Optional.
     * @param lazarusSharedGlobalTag Optional. Default is true.
     */
    function FirstTrinketOwner(
      trinket: TrinketType,
      rng?: RNG,
      lazarusSharedGlobalTag?: boolean,
    ): EntityPlayer | undefined;

    function GetEsauJrState(index?: int): EntityPlayer;

    /**
     * Returns the total number of collectibles of the provided `CollectibleType` held by all
     * players.
     */
    function GetNumCollectibles(collectible: CollectibleType): int;

    /**
     * Returns an array of all of the players.
     *
     * This function always excludes players with a non-undefined parent, since they are not real
     * players (e.g. the Strawman Keeper).
     */
    function GetPlayers(): EntityPlayer[];

    /** Returns the total multiplier granted by the provided `TrinketType` across all players. */
    function GetTotalTrinketMultiplier(trinket: TrinketType): int;

    /** Returns whether co-op mode is active. */
    function IsCoopPlay(): boolean;

    /** Spawns a second player of the provided `PlayerType`. */
    function SpawnCoPlayer2(playerType: PlayerType): EntityPlayer;

    /** Triggers the room clear event. */
    function TriggerRoomClear(): void;
  }
}
