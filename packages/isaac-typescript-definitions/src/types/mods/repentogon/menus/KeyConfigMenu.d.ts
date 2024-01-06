/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace KeyConfigMenu {
  function GetSprite(): Sprite;

  function GetSelectedColumn(): int;

  function GetSelectedElement(): int;

  function SetSelectedColumn(column: int): void;

  function SetSelectedElement(element: int): void;

  function IsEditActive(): boolean;
}
