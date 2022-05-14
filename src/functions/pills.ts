import {
  ItemConfigPillEffectClass,
  ItemConfigPillEffectType,
  PillColor,
  PillEffect,
} from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
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
import { hasFlag } from "./flag";

/**
 * Corresponds to the vanilla `PillColor.COLOR_MASK` value.
 *
 * (1 << 11) - 1
 */
const HORSE_PILL_FLAG = 2047 as BitFlag;

/**
 * Add this to a `PillColor` to get the corresponding giant pill color.
 *
 * Corresponds to the vanilla `PillColor.GIANT_FLAG` value.
 *
 * 1 << 11
 */
const HORSE_PILL_ADJUSTMENT = 2048;

/**
 * Helper function to get the corresponding horse pill color from a normal pill color.
 *
 * For example, passing `PillColor.BLUE_BLUE` would result in 2049, which is the value that
 * corresponds to the horse pill color for blue/blue.
 */
export function getHorsePillColor(pillColor: PillColor): PillColor {
  return pillColor + HORSE_PILL_ADJUSTMENT;
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
): ItemConfigPillEffectClass {
  // `ItemConfigPillEffect` does not contain the "class" tag, so we must manually compile a map of
  // pill effect classes. Modded pill effects are not included in the map.
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
 * const pillEffect = PillEffect.BAD_GAS;
 * const pillEffectName = getPillEffectName(pillEffect); // trinketName is "Bad Gas"
 * ```
 */
export function getPillEffectName(pillEffect: PillEffect | int): string {
  // `ItemConfigPillEffect.Name` is bugged with vanilla pill effects on patch v1.7.6, so we use a
  // hard-coded map as a workaround.
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
 * Helper function to get a pill effect type from a PillEffect enum value. In this context, the type
 * is equal to positive, negative, or neutral. This is derived from the suffix of the the "class"
 * tag in the "pocketitems.xml" file. Use the `getPillEffectClass` helper function to determine the
 * "power" of the pill.
 *
 * Due to limitations in the API, this function will not work properly for modded pill effects, and
 * will always return `DEFAULT_PILL_EFFECT_TYPE` in those cases.
 */
export function getPillEffectType(
  pillEffect: PillEffect | int,
): ItemConfigPillEffectType {
  // `ItemConfigPillEffect` does not contain the "class" tag, so we must manually compile a map of
  // pill effect classes. Modded pill effects are not included in the map.
  const pillEffectClass = PILL_EFFECT_TYPES[pillEffect as PillEffect];
  return pillEffectClass === undefined
    ? DEFAULT_PILL_EFFECT_TYPE
    : pillEffectClass;
}

export function isHorsePill(pillColor: PillColor): boolean {
  return hasFlag(pillColor as BitFlag, HORSE_PILL_FLAG);
}
