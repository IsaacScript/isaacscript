import type { GiantbookType } from "../../enums/GiantbookType";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 * @noSelf
 */
declare namespace ItemOverlay {
  /**
   * Returns how many frames until the item overlay animation plays.
   *
   * The delay is set in the `ItemOverlay.Show` method.
   */
  function GetDelay(): int;

  function GetMegaMushPlayerSprite(): Sprite;

  /** Returns the `GiantbookType` of the last played Giantbook animation. */
  function GetOverlayID(): GiantbookType;

  /**
   * Returns the player that triggered the last played Giantbook animation. Returns undefined if no
   * player triggered the animation.
   */
  function GetPlayer(): EntityPlayer;

  /** Returns the sprite used for the Giantbook animations. */
  function GetSprite(): Sprite;

  /** Displays a Giantbook animation on the screen. */
  function Show(
    giantbookType: GiantbookType,
    delay?: int,
    player?: EntityPlayer,
  ): void;
}
