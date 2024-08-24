import type {
  RoomShape,
  RoomType,
  StageID,
} from "isaac-typescript-definitions";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/
   * @noSelf
   */
  namespace RoomConfigHolder {
    /**
     * Returns a random `RoomConfig` from the specified parameters.
     *
     * @param seed
     * @param reduceWeight
     * @param stageID
     * @param roomType
     * @param shape Optional. Default is any `RoomShape`.
     * @param minVariant Optional. Default is 0.
     * @param maxVariant Optional. Default is -1.
     * @param minDifficulty Optional. Default is 0.
     * @param maxDifficulty Optional. Default is 10.
     * @param requiredDoors Optional. Default is 0.
     * @param subType Optional. Default is -1.
     * @param mode Optional. Default is -1.
     */
    function GetRandomRoom(
      seed: Seed,
      reduceWeight: boolean,
      stageID: StageID,
      roomType: RoomType,
      shape?: RoomShape,
      minVariant?: int,
      maxVariant?: int,
      minDifficulty?: int,
      maxDifficulty?: int,
      requiredDoors?: int,
      subType?: int,
      mode?: int,
    ): RoomConfig | undefined;

    /**
     * Returns a random `RoomConfig` from the specified parameters.
     *
     * @param stageID
     * @param roomType
     * @param variant
     * @param difficulty Optional. Default is -1, allowing any difficulty to be chosen.
     */
    function GetRoomByStageTypeAndVariant(
      stageID: StageID,
      roomType: RoomType,
      variant: int,
      difficulty?: int,
    ): RoomConfig | undefined;
  }
}
