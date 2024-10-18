/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface EntityTear extends Entity {
  /**
   * Returns the intensity value of the tear as a result of the Dead Eye collectible. The intensity
   * is between 0 and 1.
   */
  GetDeadEyeIntensity: () => float;

  /**
   * Copies the tear and applies the Multidimensional Baby tear effect to it. Returns the copied
   * tear.
   */
  MakeMultidimensionalCopy: () => EntityTear;

  /** Returns the red aura sprite used by Dead Eye. */
  GetDeadEyeSprite: () => Sprite;

  /**
   * Returns the effect sprite used by numerous tear variants such as Fire Mind and Mysterious
   * Liquid.
   */
  GetTearEffectSprite: () => Sprite;

  /** Returns the aura sprite used by Godhead tears. */
  GetTearHaloSprite: () => Sprite;

  /** Returns whether the tear was created through the Multidimensional Baby effect. */
  IsMultidimensionalTouched: () => boolean;

  /** Returns whether the tear was created through the Angelic Prism effect. */
  IsPrismTouched: () => boolean;

  /**
   * Repentogon's modified `EntityTear.ResetSpriteScale` method.
   *
   * Behaves the same as `EntityTear.ResetSpriteScale` except you can now choose to have it
   * re-evaluate which scale animation to play.
   *
   * @param force Optional. Default is false.
   */
  ResetSpriteScale: (force?: boolean) => void;

  /** Sets whether the tear was created through the Multidimensional Baby effect. */
  SetMultidimensionalTouched: (touched: boolean) => void;

  /** Sets whether the tear was created through the Angelic Prism effect. */
  SetPrismTouched: (touched: boolean) => void;
}
