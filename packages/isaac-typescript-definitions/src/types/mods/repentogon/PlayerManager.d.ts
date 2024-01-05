import type {
  CollectibleType,
  PlayerType,
  TrinketType,
} from "../../../enums/collections/subTypes";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @noSelf
   * @see https://repentogon.com/index.html
   */
  namespace PlayerManager {
    function AnyoneHasCollectible(collectible: CollectibleType): boolean;

    function AnyoneHasTrinket(trinket: TrinketType): boolean;

    function AnyoneIsPlayerType(playerType: PlayerType): boolean;

    function AnyPlayerTypeHasBirthright(playerType: PlayerType): boolean;

    function FirstBirthrightOwner(
      playerType: PlayerType,
    ): EntityPlayer | undefined;

    function FirstCollectibleOwner(
      collectible: CollectibleType,
      lazSharedGlobalTag: boolean,
    ): EntityPlayer | undefined;

    function FirstPlayerByType(
      playerType: PlayerType,
    ): EntityPlayer | undefined;

    /** @param index Default is 0. */
    function GetEsauJrState(index?: int): EntityPlayer | undefined;

    function GetNumCollectibles(collectibleType: CollectibleType): int;

    function GetPlayers(): EntityPlayer[];

    function GetTotalTrinketMultiplier(trinketType: TrinketType): int;

    function IsCoopPlay(): boolean;

    function SpawnCoPlayer2(playerType: PlayerType): EntityPlayer;

    function TriggerRoomClear(): void;
  }
}
