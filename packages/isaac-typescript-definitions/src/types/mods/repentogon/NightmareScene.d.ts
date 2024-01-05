/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace NightmareScene {
  /**
   * Returns the current display size of the minimap. When not expanded this is always
   * `Vector(47,47)`.
   */
  function GetBackgroundSprite(): Sprite;

  function GetBubbleSprite(): Sprite;

  function GetProgressBarMap(): int[];

  function GetProgressBarSprite(): Sprite[];

  function IsDogmaNightmare(): boolean;
}
