import type { ItemPoolType } from "../../../enums/ItemPoolType";
import type { LevelStage } from "../../../enums/LevelStage";
import type { RoomType } from "../../../enums/RoomType";
import type { StageType } from "../../../enums/StageType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   */
  interface HistoryItem {
    GetItemID: () => int;
    GetItemPoolType: () => ItemPoolType;
    GetLevelStage: () => LevelStage;
    GetRoomType: () => RoomType;
    GetStageType: () => StageType;
    GetTime: () => int;
    IsTrinket: () => boolean;
  }
}
