/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace CollectionMenu {
  function GetCollectionMenuSprite(): Sprite;

  function GetDeathScreenSprite(): Sprite;

  function GetSelectedPage(): int;

  function GetSelectedElement(): int;

  function SetSelectedPage(page: int): void;

  function SetSelectedElement(element: int): void;
}
