import type { PauseMenuState } from "../../../enums/PauseMenuState";

declare global {
  /**
   * This class is for REPENTOGON, an exe-hack which expands the modding API.
   *
   * @noSelf
   * @see https://repentogon.com/
   */
  namespace PauseMenu {
    /** Returns the sprite used to display the completion marks. */
    function GetCompletionMarksSprite(): Sprite;

    /** Returns the sprite used for the "My Stuff" section. */
    function GetMyStuffSprite(): Sprite;

    /** Returns the index of the currently selected element. */
    function GetSelectedElement(): int;

    /** Returns the sprite used for the pause menu. */
    function GetSprite(): Sprite;

    /** Returns the sprite used to display the stats. */
    function GetStatsSprite(): Sprite;

    /** Returns the current state of the pause menu. */
    function GetState(): PauseMenuState;

    /** Sets the current element to the provided index. */
    function SetSelectedElement(element: int): void;

    /** Sets the current state of the pause menu to the provided `PauseMenuState`. */
    function SetState(state: PauseMenuState): void;
  }
}
