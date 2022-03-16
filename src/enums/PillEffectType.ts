/**
 * Equal to the suffix of the "class" tag in the "pocketitems.xml" file. "+" is equal to `POSITIVE`,
 * "-" is equal to `NEGATIVE`, and no suffix is equal to `NEUTRAL`.
 */
export enum PillEffectType {
  /** No valid pill will have this type. */
  NULL,

  POSITIVE,
  NEGATIVE,
  NEUTRAL,

  /**
   * This is not a real `PillEffectType`. Due to limitations in the API, getting the real type of
   * modded pill effects is not possible, so this value is returned instead.
   */
  MODDED,
}
