/**
 * Matches the ItemConfig.CHARGE_* members of the ItemConfig class.
 * In IsaacScript, we reimplement this as an enum, since it is cleaner.
 */
declare const enum ItemConfigChargeType {
  NORMAL = 0,
  TIMED = 1,
  SPECIAL = 2,
}
