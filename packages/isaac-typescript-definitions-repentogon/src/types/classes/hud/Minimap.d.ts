import type { MinimapState } from "../../../enums/MinimapState";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @noSelf
 * @see https://repentogon.com/
 */
declare namespace Minimap {
  /** Returns the current display dimensions of the minimap. */
  function GetDisplayedSize(): Vector;

  /**
   * Returns the duration (in frames) that the minimap has been in its expanded state, usually due
   * to the player holding the Tab key.
   */
  function GetHoldTime(): int;

  /** Returns the `Sprite` of the minimap's icons. */
  function GetIconsSprite(): Sprite;

  /** Returns the `Sprite` of the minimap's item icons. */
  function GetItemIconsSprite(): Sprite;

  /** Returns the duration (in frames) of the minimap's screen shake effect. */
  function GetShakeDuration(): int;

  /** Returns the current offset of the minimap's screen shake effect. */
  function GetShakeOffset(): Vector;

  /** Returns the current state of the minimap. */
  function GetState(): MinimapState;

  /** Sets how many frames the minimap has been in its expanded state. */
  function SetHoldTime(holdTime: int): void;

  /** Sets the duration (in frames) of the minimap's screen shake effect. */
  function SetShakeDuration(duration: int): void;

  /** Sets the screen shake offset of the minimap. */
  function SetShakeOffset(offset: Vector): void;

  /** Sets the state of the minimap. */
  function SetState(state: MinimapState): void;
}
