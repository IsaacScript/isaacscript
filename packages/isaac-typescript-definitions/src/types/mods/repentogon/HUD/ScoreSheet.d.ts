import type { Ending } from "../../../../enums/Ending";
import type { LevelStage } from "../../../../enums/LevelStage";
import type { StageType } from "../../../../enums/StageType";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @see https://repentogon.com/index.html
   * @noSelf
   */
  namespace ScoreSheet {
    function Calculate(): void;
    function GetBlueBabyBonus(): int;
    function GetDamagePenalty(): int;
    function GetExplorationBonus(): int;
    function GetItemPenalty(): int;
    function GetLambBonus(): int;
    function GetMegaSatanBonus(): int;
    function GetRunEnding(): Ending;
    function GetRunTime(): int;
    function GetRunTimeLevel(): LevelStage;
    function GetRunTimeLevelType(): StageType;
    function GetRushBonus(): int;
    function GetSchwagBonus(): int;
    function GetStageBonus(): int;
    function GetTimePenalty(): int;
    function GetTotalScore(): int;
    function SetRunEnding(ending: Ending): void;
  }
}
