/**
 * This corresponds to the suffix of the "class" tag in the "pocketitems.xml" file. "+" is equal to
 * `POSITIVE`, "-" is equal to `NEGATIVE`, and no suffix is equal to `NEUTRAL`.
 */
export enum ItemConfigPillEffectType {
  POSITIVE = 0,
  NEGATIVE = 1,
  NEUTRAL = 2,

  /**
   * This is not a real `ItemConfigPillEffectType`. Due to limitations in the API, getting the real
   * type of modded pill effects is not possible, so this value is returned instead by the
   * `getPillEffectType` helper function.
   */
  MODDED = 3,
}
