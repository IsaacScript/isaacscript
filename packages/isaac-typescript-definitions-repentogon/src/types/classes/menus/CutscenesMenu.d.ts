/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @noSelf
 * @see https://repentogon.com/
 */
declare namespace CutscenesMenu {
  /** Returns the index of the currently active element. */
  function GetSelectedElement(): int;

  /** Returns the sprite used for the cutscenes menu. */
  function GetSprite(): Sprite;

  /** Sets the currently active element to the specified index. */
  function SetSelectedElement(element: int): void;
}
