/**
 * A collection of the four sprites necessary in order to render a charge bar.
 *
 * This is used in the `newChargeBarSprites` and related helper functions.
 */
export interface ChargeBarSprites {
  readonly back: Sprite;
  readonly meter: Sprite;
  readonly meterBattery: Sprite;
  readonly lines: Sprite;
  readonly maxCharges: int;
}
