/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace ControllerSelectMenu {
  /** Returns the sprite used to display the controller select menu. */
  function GetSprite(): Sprite;

  /** Returns the currently active element. */
  function GetSelectedElement(): int;

  /** Sets the currently active element to the specified index. */
  function SetSelectedElement(element: int): void;
}
