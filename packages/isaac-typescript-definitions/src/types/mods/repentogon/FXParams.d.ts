import type { ColorModifier } from "./ColorModifier";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
export interface FXParams {
  /**
   * A modifiable copy of the color correction introduced in Repentance. This stores the values used
   * in fxlayers.xml and not the raw values (see GetCurrentColorModifier for this).
   *
   * Changes made here are not automatically applied, use UpdateColorModifier to do this.
   */
  ColorModifier: ColorModifier;

  LightColor: KColor;

  ShadowAlpha: number;

  ShadowColor: KColor;

  UseWaterV2: boolean;

  WaterColor: KColor;

  WaterColorMultiplier: KColor;

  WaterEffectColor: Color;
}
