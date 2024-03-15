/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace ModsMenu {
  /** Returns the sprite used for the mods menu. */
  function GetSprite(): Sprite;

  /** Returns the index of the currently selected element. */
  function GetSelectedElement(): int;

  /** Sets the currently selected element to the provided index. */
  function SetSelectedElement(element: int): void;

  /**
   * Returns whether the mods list was edited or not.
   *
   * Exiting out of the mods menu if the mods list was edited will restart the game.
   */
  function WasListEdited(): boolean;
}
