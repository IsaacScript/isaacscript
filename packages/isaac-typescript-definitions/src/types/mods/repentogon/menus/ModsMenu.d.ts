/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace ModsMenu {
  function GetSprite(): Sprite;

  function GetSelectedElement(): int;

  function SetSelectedElement(element: int): void;

  function WasListEdited(): boolean;
}
