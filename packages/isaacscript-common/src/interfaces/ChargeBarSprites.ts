/**
 * A collection of the four sprites necessary in order to render a charge bar.
 *
 * This is used in the `newChargeBarSprites` and related helper functions.
 */
// eslint-disable-next-line complete/type-declaration-immutability
export interface ChargeBarSprites {
  readonly back: Readonly<Sprite>;
  readonly meter: Readonly<Sprite>;
  readonly meterBattery: Readonly<Sprite>;
  readonly lines: Readonly<Sprite>;
  readonly maxCharges: int;
}
