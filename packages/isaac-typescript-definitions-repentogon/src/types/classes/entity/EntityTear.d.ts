/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface EntityTear extends Entity {
  /**
   * Returns the intensity value of the tear as a result of the Dead Eye Collectible. The intensity
   * is between 0 and 1.
   */
  GetDeadEyeIntensity: () => float;

  /**
   * Copies the tear and applies the Multidimensional Baby tear effect to it. Returns the copied
   * tear.
   */
  MakeMultidimensionalCopy: () => EntityTear;

  GetDeadEyeSprite: () => Sprite;
  GetTearEffectSprite: () => Sprite;
  GetTearHaloSprite: () => Sprite;

  /**
   * Repentogon's modified `EntityTear.ResetSpriteScale` method.
   *
   * Behaves the same as `EntityTear.ResetSpriteScale` except you can now choose to have it
   * re-evaluate which scale animation to play.
   *
   * @param force Optional. Default is false.
   *
   * @customName ResetSpriteScale
   */
  ResetSpriteScaleEx: (force: boolean) => void;
}
