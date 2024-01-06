/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace SaveMenu {
  function GetSaveSelectMenuSprite(): Sprite;

  function GetDeleteButtonSprite(): Sprite;

  function GetDeletePopupSprite(): Sprite;

  function GetSave1DrawingSprite(): Sprite;

  function GetSave2DrawingSprite(): Sprite;

  function GetSave3DrawingSprite(): Sprite;

  function GetSelectedElement(): int;

  function IsDeleteActive(): boolean;

  function SetSelectedElement(element: int): void;
}
