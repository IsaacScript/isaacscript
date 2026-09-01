/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @noSelf
 * @see https://repentogon.com/
 */
declare namespace SpecialSeedsMenu {
  /** Returns the index of the currently selected element. */
  function GetSelectedElement(): int;

  /** Returns the sprite used by the special seeds menu. */
  function GetSprite(): Sprite;

  /** Sets the currently selected element to the specified index. */
  function SetSelectedElement(element: int): void;
}
