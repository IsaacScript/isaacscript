/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @noSelf
 */
declare namespace KeyConfigMenu {
  /** Returns the sprite used for the key config menu. */
  function GetSprite(): Sprite;

  /** Returns the index of the currently selected column. */
  function GetSelectedColumn(): int;

  /** Returns the index of the currently selected element. */
  function GetSelectedElement(): int;

  /** Sets the currently selected column from the specified index. */
  function SetSelectedColumn(column: int): void;

  /** Sets the currently selected element from the specified index. */
  function SetSelectedElement(element: int): void;

  /** Returns whether the key bind editor is active or not. */
  function IsEditActive(): boolean;
}
