import type { GiantbookType } from "../../enums/GiantbookType";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @noSelf
 * @see https://repentogon.com/
 */
declare namespace ItemOverlay {
  /**
   * Returns how many frames until the item overlay animation plays.
   *
   * The delay is set in the `ItemOverlay.Show` method.
   */
  function GetDelay(): int;

  /** Returns the sprite used to play the the Mega Mush transformation animation. */
  function GetMegaMushPlayerSprite(): Sprite;

  /** Returns the `GiantbookType` of the last played giantbook animation. */
  function GetOverlayID(): GiantbookType;

  /**
   * Returns the player that triggered the last played giantbook animation. Returns undefined if no
   * player triggered the animation.
   */
  function GetPlayer(): EntityPlayer;

  /** Returns the sprite used for the giantbook animations. */
  function GetSprite(): Sprite;

  /** Displays a giantbook animation on the screen. */
  function Show(
    giantbookType: GiantbookType,
    delay?: int,
    player?: EntityPlayer,
  ): void;
}
