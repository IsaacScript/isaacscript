/**
 * A collection of the four sprites necessary in order to render a charge bar.
 *
 * Used in the `newChargeBarSprites` and related helper functions.
 */
export interface ChargeBarSprites {
  back: Sprite;
  meter: Sprite;
  meterBattery: Sprite;
  lines: Sprite;
  maxCharges: int;
}
