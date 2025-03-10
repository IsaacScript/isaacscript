/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/
 */
declare interface FXParams extends IsaacAPIClass {
  /**
   * A modifiable copy of the color correction effect. This stores the values from `fxlayers.xml`,
   * not raw values (see `Game.GetCurrentColorModifier`).
   *
   * Changes made here will require a call to `Room.UpdateColorModifier` to take effect.
   */
  ColorModifier: ColorModifier;

  /** The base color. */
  LightColor: KColor;

  /** Opacity of the room's shadow overlay. */
  ShadowAlpha: number;

  /** The color of the room's shadow overlay. */
  ShadowColor: KColor;

  /** Enables the reflective water shader. */
  UseWaterV2: boolean;

  /** The water's color. */
  WaterColor: KColor;

  /** A multiplier applied to the water color. */
  WaterColorMultiplier: KColor;

  /** The water effects' color. */
  WaterEffectColor: Color;
}
