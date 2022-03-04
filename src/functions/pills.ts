import { PILL_EFFECT_CLASS_MAP } from "../maps/pillEffectClassMap";
import { PILL_EFFECT_NAME_MAP } from "../maps/pillEffectNameMap";
import { PILL_EFFECT_TYPE_MAP } from "../maps/pillEffectTypeMap";
import {
  DEFAULT_PILL_EFFECT_CLASS,
  PillEffectClass,
} from "../types/PillEffectClass";
import {
  DEFAULT_PILL_EFFECT_TYPE,
  PillEffectType,
} from "../types/PillEffectType";

export function getMaxPillEffects(): int {
  const itemConfig = Isaac.GetItemConfig();
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
  const pillEffectClass = PILL_EFFECT_CLASS_MAP.get(pillEffect);
  return pillEffectClass === undefined
    ? DEFAULT_PILL_EFFECT_CLASS
    : pillEffectClass;
}

/**
 * Helper function to get a pill effect name from a PillEffect enum value.
 *
 * Example:
 * ```
 * const pillEffect = PillEffect.PILLEFFECT_BAD_GAS;
 * const pillEffectName = getPillEffectName(pillEffect); // trinketName is "Bad Gas"
 * ```
 */
export function getPillEffectName(pillEffect: PillEffect | int): string {
  const itemConfig = Isaac.GetItemConfig();
  const defaultName = "Unknown";

  if (type(pillEffect) !== "number") {
    return defaultName;
  }

  // "ItemConfigPillEffect.Name" is bugged with vanilla pill effects on patch v1.7.6,
  // so we use a hard-coded map as a workaround
  const pillEffectName = PILL_EFFECT_NAME_MAP.get(pillEffect);
  if (pillEffectName !== undefined) {
    return pillEffectName;
  }

  const itemConfigPillEffect = itemConfig.GetPillEffect(pillEffect);
  if (itemConfigPillEffect === undefined) {
    return defaultName;
  }

  return itemConfigPillEffect.Name;
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
  const pillEffectClass = PILL_EFFECT_TYPE_MAP.get(pillEffect);
  return pillEffectClass === undefined
    ? DEFAULT_PILL_EFFECT_TYPE
    : pillEffectClass;
}
