/**
 * This corresponds to the number in the "class" tag in the "pocketitems.xml" file. The "+" or "-"
 * part of the tag is contained within the `ItemConfigPillEffectType` enum.
 */
export enum ItemConfigPillEffectClass {
  /** No valid pill will have this type. */
  NULL = -1,

  JOKE,
  MINOR,
  MEDIUM,
  MAJOR,

  /**
   * This is not a real `ItemConfigPillEffectClass`. Due to limitations in the API, getting the real
   * class of modded pill effects is not possible, so this value is returned instead.
   */
  MODDED,
}
