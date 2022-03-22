import { itemConfig } from "../cachedClasses";
import { PillEffectClass } from "../enums/PillEffectClass";
import { PillEffectType } from "../enums/PillEffectType";
import {
  DEFAULT_PILL_EFFECT_CLASS,
  PILL_EFFECT_CLASSES,
} from "../objects/pillEffectClasses";
import {
  DEFAULT_PILL_EFFECT_NAME,
  PILL_EFFECT_NAMES,
} from "../objects/pillEffectNames";
import {
  DEFAULT_PILL_EFFECT_TYPE,
  PILL_EFFECT_TYPES,
} from "../objects/pillEffectTypes";

/**
 * Helper function to get the final pill effect in the game. This cannot be reliably determined
 * before run-time due to mods adding a variable amount of new pill effects.
 */
export function getMaxPillEffects(): int {
  return itemConfig.GetPillEffects().Size - 1;
}

/**
 * Helper function to get a pill effect class from a PillEffect enum value. In this context, the
 * class is equal to the numerical prefix in the "class" tag in the "pocketitems.xml" file. Use the
 * `getPillEffectType` helper function to determine whether or not the pill effect is positive,
 * negative, or neutral.
 *
 * Due to limitations in the API, this function will not work properly for modded pill effects, and
 * will always return `DEFAULT_PILL_EFFECT_CLASS` in those cases.
 */
export function getPillEffectClass(
  pillEffect: PillEffect | int,
): PillEffectClass {
  // ItemConfigPillEffect does not contain the "class" tag, so we must manually compile a map of
  // pill effect classes
  // Modded pill effects are not included in the map
  const pillEffectClass = PILL_EFFECT_CLASSES[pillEffect as PillEffect];
  return pillEffectClass === undefined
    ? DEFAULT_PILL_EFFECT_CLASS
    : pillEffectClass;
}

/**
 * Helper function to get a pill effect name from a PillEffect enum value.
 *
 * Example:
 * ```ts
 * const pillEffect = PillEffect.PILLEFFECT_BAD_GAS;
 * const pillEffectName = getPillEffectName(pillEffect); // trinketName is "Bad Gas"
 * ```
 */
export function getPillEffectName(pillEffect: PillEffect | int): string {
  // "ItemConfigPillEffect.Name" is bugged with vanilla pill effects on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const pillEffectName = PILL_EFFECT_NAMES[pillEffect as PillEffect];
  if (
    pillEffectName !== undefined &&
    pillEffectName !== DEFAULT_PILL_EFFECT_NAME
  ) {
    return pillEffectName;
  }

  const itemConfigPillEffect = itemConfig.GetPillEffect(pillEffect);
  if (itemConfigPillEffect !== undefined) {
    return itemConfigPillEffect.Name;
  }

  return DEFAULT_PILL_EFFECT_NAME;
}

/**
 * Helper function to get a pill effect type from a PillEffect enum value. In this context, the
 * type is equal to positive, negative, or neutral. This is derived from the suffix of the the
 * "class" tag in the "pocketitems.xml" file. Use the `getPillEffectClass` helper function to
 * determine the "power" of the pill.
 *
 * Due to limitations in the API, this function will not work properly for modded pill effects, and
 * will always return `DEFAULT_PILL_EFFECT_TYPE` in those cases.
 */
export function getPillEffectType(
  pillEffect: PillEffect | int,
): PillEffectType {
  // ItemConfigPillEffect does not contain the "class" tag, so we must manually compile a map of
  // pill effect classes
  // Modded pill effects are not included in the map
  const pillEffectClass = PILL_EFFECT_TYPES[pillEffect as PillEffect];
  return pillEffectClass === undefined
    ? DEFAULT_PILL_EFFECT_TYPE
    : pillEffectClass;
}
