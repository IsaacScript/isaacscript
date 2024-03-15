/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace SaveMenu {
  /** Returns the sprite used for the save select menu. */
  function GetSaveSelectMenuSprite(): Sprite;

  /** Returns the sprite used by the save delete button. */
  function GetDeleteButtonSprite(): Sprite;

  /** Returns the sprite used by the delete confirmation popup. */
  function GetDeletePopupSprite(): Sprite;

  /** Returns the sprite used by the save file #1 drawing. */
  function GetSave1DrawingSprite(): Sprite;

  /** Returns the sprite used by the save file #2 drawing. */
  function GetSave2DrawingSprite(): Sprite;

  /** Returns the sprite used by the save file #3 drawing. */
  function GetSave3DrawingSprite(): Sprite;

  /** Returns the index of the currently selected element. */
  function GetSelectedElement(): int;

  /** Returns whether the delete save file mode is active. */
  function IsDeleteActive(): boolean;

  /** Sets the currently selected element to the specified index. */
  function SetSelectedElement(element: int): void;
}
