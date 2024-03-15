import type { ColorModifier } from "./ColorModifier";

/**
 * This class is for REPENTOGON, an exe-hack which expands the modding API.
 *
 * @see https://repentogon.com/index.html
 */
declare interface FXParams {
  /**
   * A modifiable copy of the color correction effect. This stores the values from `fxlayers.xml`,
   * not raw values (see `Game.GetCurrentColorModifier`).
   *
   * Changes made here will require a call to `Room.UpdateColorModifier` to take effect.
   */
  ColorModifier: ColorModifier;

  /** The base color. */
  KColor: KColor;

  /** Opacity of the room's shadow overlay. */
  ShadowAlpha: number;

  /** The color of the room's shadow overlay. */
  ShadowColor: KColor;

  /** Enables the reflective water shader. */
  UseWaterV2: boolean;

  /** A multiplier applied to the water color. */
  WaterColorMultiplier: KColor;

  WaterEffectColor: Color;
}
