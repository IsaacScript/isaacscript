/**
 * It is not safe calling the methods of this class until the game fully loads. It's best to only
 * call them inside of callbacks.
 *
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare namespace NightmareScene {
  /** Returns the sprite used by the background. */
  function GetBackgroundSprite(): Sprite;

  /** Returns the sprite used by the thought bubble above the player portrait. */
  function GetBubbleSprite(): Sprite;

  function GetProgressBarMap(): int[];

  /** Returns the sprite used by the progress bar. */
  function GetProgressBarSprite(): Sprite;

  /** Returns whether the currently playing nightmare is the Dogma cutscene. */
  function IsDogmaNightmare(): boolean;
}
