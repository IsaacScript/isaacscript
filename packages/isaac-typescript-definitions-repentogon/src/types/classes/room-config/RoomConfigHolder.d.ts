import type { RoomShape, RoomType } from "isaac-typescript-definitions";
import type { StbType } from "../../../enums/StbType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace RoomConfigHolder {
    /**
     * Returns a random `RoomConfig` from the specified parameters.
     *
     * @param seed
     * @param reduceWeight
     * @param stage
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
      stage: StbType,
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

    /** Returns a random `RoomConfig` from the specified parameters. */
    function GetRoomByStageTypeAndVariant(
      stage: StbType,
      roomType: RoomType,
      variant: int,
      difficulty: int,
    ): RoomConfig | undefined;
  }
}
