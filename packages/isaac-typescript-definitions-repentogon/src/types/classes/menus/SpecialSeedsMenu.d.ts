/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace SpecialSeedsMenu {
  /** Returns the sprite used by the special seeds menu. */
  function GetSprite(): Sprite;

  /** Returns the index of the currently selected element. */
  function GetSelectedElement(): int;

  /** Sets the currently selected element to the specified index. */
  function SetSelectedElement(element: int): void;
}
