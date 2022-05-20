import {
  ItemConfigPillEffectClass,
  ItemConfigPillEffectType,
  PillColor,
  PillEffect,
} from "isaac-typescript-definitions";
import { itemConfig } from "../cachedClasses";
import {
  FIRST_HORSE_PILL_COLOR,
  FIRST_MODDED_PILL_EFFECT,
  FIRST_PILL_COLOR,
  FIRST_PILL_EFFECT,
  LAST_HORSE_PILL_COLOR,
  LAST_NORMAL_PILL_COLOR,
  LAST_PILL_EFFECT,
  LAST_VANILLA_PILL_EFFECT,
} from "../constantsMax";
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
import { getEnumValues } from "./enums";
import { hasFlag } from "./flag";
import { irange } from "./utils";

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
 * Helper function to get an array with every non-null pill color. This includes all gold colors and
 * all horse colors.
 */
export function getAllPillColors(): PillColor[] {
  const pillColors = getEnumValues(PillColor);
  pillColors.slice(); // Remove `PillColor.NULL`
  return pillColors;
}

/**
 * Helper function to get an array with every valid pill effect. This includes modded pill effects.
 */
export function getAllPillEffects(): PillEffect[] {
  return irange(FIRST_PILL_EFFECT, LAST_PILL_EFFECT) as PillEffect[];
}

/**
 * Helper function to get the corresponding horse pill color from a normal pill color.
 *
 * For example, passing `PillColor.BLUE_BLUE` would result in 2049, which is the value that
 * corresponds to the horse pill color for blue/blue.
 */
export function getHorsePillColor(pillColor: PillColor): PillColor {
  return pillColor + HORSE_PILL_ADJUSTMENT; // eslint-disable-line isaacscript/strict-enums
}

/** Helper function to get an array with every non-gold horse pill color. */
export function getHorsePillColors(): PillColor[] {
  return irange(FIRST_HORSE_PILL_COLOR, LAST_HORSE_PILL_COLOR) as PillColor[];
}

/**
 * Helper function to get an array with every modded pill effect.
 *
 * Returns an empty array if there are no modded pill effects.
 */
export function getModdedPillEffects(): PillEffect[] {
  if (LAST_VANILLA_PILL_EFFECT === LAST_PILL_EFFECT) {
    return [];
  }

  return irange(FIRST_MODDED_PILL_EFFECT, LAST_PILL_EFFECT) as PillEffect[];
}

/**
 * Helper function to get the corresponding normal pill color from a horse pill color.
 *
 * For example, passing 2049 would result in `PillColor.BLUE_BLUE`.
 *
 * If called with a non-horse pill color, this function will return back the same color.
 */
export function getNormalPillColorFromHorse(pillColor: PillColor): PillColor {
  // eslint-disable-next-line isaacscript/strict-enums
  const normalPillColor = (pillColor - HORSE_PILL_ADJUSTMENT) as PillColor;

  return normalPillColor > PillColor.NULL ? normalPillColor : pillColor;
}

/** Helper function to get an array with every non-gold and non-horse pill color. */
export function getNormalPillColors(): PillColor[] {
  return irange(FIRST_PILL_COLOR, LAST_NORMAL_PILL_COLOR) as PillColor[];
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
  pillEffect: PillEffect,
): ItemConfigPillEffectClass {
  // `ItemConfigPillEffect` does not contain the "class" tag, so we must manually compile a map of
  // pill effect classes. Modded pill effects are not included in the map.
  const pillEffectClass = PILL_EFFECT_CLASSES[pillEffect];
  return pillEffectClass === undefined
    ? DEFAULT_PILL_EFFECT_CLASS
    : pillEffectClass;
}

/**
 * Helper function to get a pill effect name from a PillEffect enum value.
 *
 * For example:
 *
 * ```ts
 * const pillEffect = PillEffect.BAD_GAS;
 * const pillEffectName = getPillEffectName(pillEffect); // trinketName is "Bad Gas"
 * ```
 */
export function getPillEffectName(pillEffect: PillEffect): string {
  // `ItemConfigPillEffect.Name` is bugged with vanilla pill effects on patch v1.7.6, so we use a
  // hard-coded map as a workaround.
  const pillEffectName = PILL_EFFECT_NAMES[pillEffect];
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
  pillEffect: PillEffect,
): ItemConfigPillEffectType {
  // `ItemConfigPillEffect` does not contain the "class" tag, so we must manually compile a map of
  // pill effect classes. Modded pill effects are not included in the map.
  const pillEffectClass = PILL_EFFECT_TYPES[pillEffect];
  return pillEffectClass === undefined
    ? DEFAULT_PILL_EFFECT_TYPE
    : pillEffectClass;
}

/** Helper function to get an array with every vanilla pill effect. */
export function getVanillaPillEffects(): PillEffect[] {
  return irange(FIRST_PILL_EFFECT, LAST_VANILLA_PILL_EFFECT) as PillEffect[];
}

export function isHorsePill(pillColor: PillColor): boolean {
  return hasFlag(pillColor as BitFlag, HORSE_PILL_FLAG);
}
