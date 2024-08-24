/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @noSelf
 */
declare namespace CollectionMenu {
  /** Returns the sprite used to display the collection menu. */
  function GetCollectionMenuSprite(): Sprite;

  /** Returns the sprite used to display the selectable collectibles. */
  function GetDeathScreenSprite(): Sprite;

  /** Returns the index of the currently active page. */
  function GetSelectedPage(): int;

  /** Returns the index of the currently selected element. */
  function GetSelectedElement(): int;

  /** Sets the currently active page. */
  function SetSelectedPage(page: int): void;

  /** Sets the currently selected element. */
  function SetSelectedElement(element: int): void;
}
