/**
 * For `EntityType.EFFECT` (1000), `EffectVariant.LADDER` (8).
 *
 * Note that vanilla ladders only use a sub-type of 0. The `isaacscript-common` library uses ladders
 * to represent custom objects, since they are non-interacting and will not automatically despawn
 * after time passes, unlike most other effects.
 *
 * This enum tracks the kinds of custom objects that are represented by vanilla ladders. We start
 * assigning sub-types after 100 as to not interfere with any possible modded ladder variants.
 */
export enum LadderSubTypeCustom {
  LADDER = 0,

  CUSTOM_BACKDROP = 101,
  CUSTOM_SHADOW = 102,
  CUSTOM_PICKUP = 103,
  CUSTOM_DOOR = 104,
}
