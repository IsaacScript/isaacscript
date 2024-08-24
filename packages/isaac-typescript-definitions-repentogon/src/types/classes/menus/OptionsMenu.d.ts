/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 * @noSelf
 */
declare namespace OptionsMenu {
  /** Returns the sprite used for the gamma widget in the options menu. */
  function GetGammaWidgetSprite(): Sprite;

  /** Returns the sprite used for the options menu. */
  function GetOptionsMenuSprite(): Sprite;

  /** Returns the index of the currently selected element. */
  function GetSelectedElement(): int;

  /** Sets the currently selected element to the specified index. */
  function SetSelectedElement(element: int): void;
}
