import type { RoomShape } from "../../../../enums/RoomShape";
import type { RoomType } from "../../../../enums/RoomType";
import { StbType } from "../../../../enums/mods/repentogon/StbType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * *noSelf
   */
  namespace RoomConfigHolder {
    /**
     * Returns a RoomConfigRoom corresponding to the given params.
     *
     * @param seed
     * @param reduceWeight
     * @param stage
     * @param roomType
     * @param shape Default is undefined.
     * @param minVariant Default is 0.
     * @param maxVariant Default is -1.
     * @param minDifficulty Default is 0.
     * @param maxDifficulty Default is 10.
     * @param requiredDoors Default is 0.
     * @param subType Default is -1.
     * @param mode Default is -1.
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

    function GetRoomByStageTypeAndVariant(
      stage: StbType,
      roomType: RoomType,
      variant: int,
      difficulty: int,
    ): RoomConfig | undefined;
  }
}
