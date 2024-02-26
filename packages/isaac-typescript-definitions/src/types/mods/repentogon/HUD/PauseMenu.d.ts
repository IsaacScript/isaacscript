import type { PauseMenuState } from "../../../../enums/mods/repentogon/PauseMenuState";

declare global {
  namespace PauseMenu {
    function GetCompletionMarksSprite(): Sprite;
    function GetMyStuffSprite(): Sprite;
    function GetPauseMenuSprite(): Sprite;
    function GetState(): PauseMenuState;
    function GetSelectedElement(): int;
    function GetStatsSprite(): Sprite;
    function SetSelectedElement(element: int): void;
  }
}
